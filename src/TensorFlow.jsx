import * as tf from "@tensorflow/tfjs-core";
import * as handPostDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import MouseCursor from "./MouseCursor";
import Ball from "./Ball";
import Hoop from "./Hoop";
import "./TensorFlow.css";
import React from "react";
import Webcam from "react-webcam";
import { useRef, useState, useEffect } from "react";

export const BallContext = React.createContext(null);

// import * as scatter from "scatter-gl";

export default function TFApp() {
    const webcamRef = useRef(null);
    const [ballCoordinates, setBallCoordinates] = useState({ x: 100, y: 100 });
    const [fingerPosition, setFingerPosition] = useState({});
    const [cursorColor, setCursorColor] = useState("white");
    const [grabbing, setGrabbing] = useState(false);
    const model = handPostDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
        runtime: "tfjs",
        maxHands: 1,
        modelType: "lite",
    };

    const detector = async () => {
        const handDetector = await handPostDetection.createDetector(
            model,
            detectorConfig
        );
        const render = async () => {
            await detect(handDetector);
            requestAnimationFrame(render);
        };
        render();
    };

    const detect = async (handDetector) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // video properties
            const video = webcamRef.current.video;
            // const videoWidth = webcamRef.current.video.videoWidth;
            // const videoHeight = webcamRef.current.video.videoHeight;
            const image = tf.browser.fromPixels(video);
            const hands = await handDetector.estimateHands(image);
            if (typeof hands[0] !== "undefined") {
                const keypoint = hands[0].keypoints;
                try {
                    const hand_coords = keypoint[9]; // keypoint 9 is the base of the ring finger
                    // console.log("finger coors: ", fingerPosition);
                    updateFingerPosition(hand_coords);
                } catch (error) {
                    console.error("Error drawing hand:", error);
                }
                const clench_fingers = {
                    x: (keypoint[8].x + keypoint[12].x + keypoint[16].x) / 3,
                    y: (keypoint[8].y + keypoint[12].y + keypoint[16].y) / 3,
                };
                const palm_center = {
                    x: (keypoint[9].x + keypoint[0].x) / 2,
                    y: (keypoint[9].y + keypoint[0].y) / 2,
                };
                if (
                    clench_fingers.x < palm_center.x + 40 &&
                    clench_fingers.x > palm_center.x - 40 &&
                    clench_fingers.y < palm_center.y + 40 &&
                    clench_fingers.y > palm_center.y - 40
                ) {
                    //console.log("GET GRABBED LOL");
                    setCursorColor("blue");
                    setGrabbing(true);
                    // create grab/click function
                } else {
                    setCursorColor("white");
                    setGrabbing(false);
                }
            }

            tf.dispose(image);
        }
    };

    const updateFingerPosition = (hand_coords) => {
        // console.log("Updating finger position to: ", hand_coords);
        const mirroredX = webcamRef.current.video.videoWidth - hand_coords.x;

        const newWidth =
            (window.innerWidth / webcamRef.current.video.clientWidth) *
            mirroredX;
        const newHeight =
            (window.innerHeight / webcamRef.current.video.clientHeight) *
            hand_coords.y;
        setFingerPosition({ x: newWidth, y: newHeight });
    };

    useEffect(() => {
        detector();
    }, []);

    return (
        <div className="App">
            <BallContext.Provider
                value={{
                    ballCoordinates: ballCoordinates,
                    setBallCoordinates: setBallCoordinates,
                }}
            >
                <header className="App-header">
                    <Webcam
                        ref={webcamRef}
                        muted={true}
                        style={{
                            opacity: 0,
                            position: "absolute",
                            marginLeft: "auto",
                            marginRight: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            zindex: 9,
                            width: 680,
                            height: 480,
                        }}
                        mirrored={true}
                    />
                </header>
                <Hoop />
                <Ball
                    fingerPosition={fingerPosition}
                    grabbing={grabbing}
                />
                <MouseCursor
                    fingerPosition={fingerPosition}
                    cursorColor={cursorColor}
                />
            </BallContext.Provider>
        </div>
    );
}
