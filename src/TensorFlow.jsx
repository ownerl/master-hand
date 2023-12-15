import * as tf from "@tensorflow/tfjs-core";
import * as handPostDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-backend-webgl";
import MouseCursor from "./MouseCursor";

// import * as scatter from "scatter-gl";
import Webcam from "react-webcam";
import { useRef, useState, useEffect } from "react";

export default function TFApp() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [fingerPosition, setFingerPosition] = useState({ x: 0, y: 0 });

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
                try {
                    const hand_coords = hands[0].keypoints[8];
                    console.log("finger coors: ", fingerPosition);
                    updateFingerPosition(hand_coords);
                } catch (error) {
                    console.error("Error drawing hand:", error);
                }
            }
            // if (typeof hands[0] === "undefined") {
            //     tf.dispose(image);
            //     return;
            // }

            // set canvas dimensions
            // canvasRef.current.width = videoWidth;
            // canvasRef.current.height = videoHeight;

            // fuckin works baby!
            // if (typeof hands[0] !== "undefined") {
            //     try {
            //         requestAnimationFrame(() => {
            //             const hand_coords = hands[0].keypoints[8];
            //         });
            //     } catch (error) {
            //         console.error("Error drawing hand:", error);
            //     }
            // }
            tf.dispose(image);
        }
    };

    const updateFingerPosition = (hand_coords) => {
        setFingerPosition(prevState => {
            // Check if the state actually updates
            console.log("Updating finger position to: ", hand_coords);
            return { ...prevState, x: hand_coords.x, y: hand_coords.y };
        });
    };

    useEffect(() => {
        detector();
    }, []);

    return (
        <div className="App">
            <MouseCursor fingerPosition={fingerPosition} />
            <header className="App-header">
                <Webcam
                    ref={webcamRef}
                    muted={true}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 9,
                        width: 640,
                        height: 480,
                    }}
                />
            </header>
        </div>
    );
}
