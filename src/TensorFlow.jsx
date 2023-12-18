import * as tf from "@tensorflow/tfjs-core";
import * as handPostDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-backend-webgl";

import "./TensorFlow.css";
import React from "react";
import Webcam from "react-webcam";
import { useRef, useState, useEffect } from "react";
import MouseCursor from "./MouseCursor";
import Ball from "./Ball";

// import * as scatter from "scatter-gl";

export default function TFApp(props) {
    const webcamRef = useRef(null);
    const [fingerPosition, setFingerPosition] = useState()
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
            // console.log('grab ref', props.grabRef)
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
            if (hands[0]?.keypoints && typeof(props.grabRef?.current) != "undefined") {
                console.log('inside of if')
                const keypoint = hands[0].keypoints;
                try {
                    const handCoords = keypoint[9]; // keypoint 9 is the base of the ring finger
                    // console.log("finger coors: ", fingerPosition);
                    updateFingerPosition(handCoords);
                } catch (error) {
                    console.error("Error drawing hand:", error);
                }
                checkGrab(keypoint)
                
            }

            tf.dispose(image);
        }
    };

    const checkGrab = (keypoint) => {
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
            props.grabRef.current = true;
            // create grab/click function
        } else {
            props.grabRef.current = false;
        }
    }

    const updateFingerPosition = (handCoords) => {
        // console.log("Updating finger position to: ", handCoords);
        const mirroredX = webcamRef.current.video.videoWidth - handCoords.x;

        const newWidth =
            (window.innerWidth / webcamRef.current.video.clientWidth) *
            mirroredX;
        const newHeight =
            (window.innerHeight / webcamRef.current.video.clientHeight) *
            handCoords.y;
        // console.log('finger position prop',props.fingerPosition.current)
        props.fingerPosition.current = { x: newWidth, y: newHeight };
        setFingerPosition({ x: newWidth, y: newHeight })
    };

    useEffect(() => {
        detector();
    }, []);

    return (
        <div className="App">
            <MouseCursor fingerPosition={fingerPosition} grabRef={props.grabRef} />
            <Ball fingerPosition={fingerPosition} grabRef={props.grabRef} />
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
                
        </div>
    );
}
