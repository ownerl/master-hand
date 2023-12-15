import * as tf from "@tensorflow/tfjs-core";
import * as handPostDetection from "@tensorflow-models/hand-pose-detection";
import "@tensorflow/tfjs-backend-webgl";
// import * as scatter from "scatter-gl";
import Webcam from "react-webcam";
import { useRef, useState, useEffect } from "react";

export default function TFApp() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const model = handPostDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
        runtime: "tfjs",
        maxHands: 1,
        modelType: "lite",
    };

    const detector = async() => {
        const handDetector = await handPostDetection.createDetector(
            model,
            detectorConfig
        );
        setInterval(async () => {
            await detect(handDetector)
            //console.log('camref: ', webcamRef.current.video.readyState)
        }, 16.7);
    }
    // const detector = async() => {
    //     const handDetector = await handPostDetection.createDetector(
    //         model,
    //         detectorConfig
    //     );
    //     console.log(handDetector, 'hande detect')
    //     setInterval(async () => {
    //         await detect(handDetector)
    //         //console.log('camref: ', webcamRef.current.video.readyState)
    //     }, 16.7);
    // }


    const detect = async (handDetector) => {
        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            // video properties
            const ctx = canvasRef.current.getContext("2d");
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            // set canvas dimensions
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;

            const image = tf.browser.fromPixels(video);

            const hands = await handDetector.estimateHands(image)

            // fuckin works baby!
            try {
                    // console.log('confidence score', hands[0].score)
                    
                    // draw mesh
                    const hand_coors = hands[0].keypoints[8]
                    ctx.fillRect(hand_coors.x, hand_coors.y, 20, 20)
                    console.log('hands object: ', hands)
                }
            catch {
                console.log('no hands')
            }
            tf.dispose(image)
        }
    };
    
    useEffect(() => {
        detector();
    }, [])

    return (
        <div className="App">
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

                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        zindex: 8,
                        width: 640,
                        height: 480,
                    }}
                />
            </header>
        </div>
    );
}

