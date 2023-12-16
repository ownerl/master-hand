import { useContext, useEffect, useRef, useState } from "react";
import "./Ball.css";
import { motion } from "framer-motion";
import { BallContext } from "./TensorFlow";
import Hoop from "./Hoop";
export default function Ball(props) {
    const ballContext = useContext(BallContext);
    const ballCoordinates = ballContext.ballCoordinates;
    const hoopCoordinates = {x: 600, y: 700, width: 140, height: 90}
    const grabRef = useRef(false);
    //console.log(ballContext)

    const variants = {
        default: {
            x: ballCoordinates.x,
            y: ballCoordinates.y,
        },
        grab: {
            x: props.fingerPosition.x - 15,
            y: props.fingerPosition.y - 15,
        },
    };
    useEffect(() => {
        if (
            props.grabbing &&
            props.fingerPosition.x + 20 > ballContext.ballCoordinates.x &&
            props.fingerPosition.x < ballContext.ballCoordinates.x + 50 &&
            props.fingerPosition.y + 20 > ballContext.ballCoordinates.y &&
            props.fingerPosition.y < ballContext.ballCoordinates.y + 50
        ) {
            grabRef.current = true;
            ballContext.setBallCoordinates({
                x: props.fingerPosition.x - 15,
                y: props.fingerPosition.y - 15,
            });
        } else {
            grabRef.current = false;
        }

        if (
            ballContext.ballCoordinates.x > hoopCoordinates.x &&
            ballContext.ballCoordinates.x <  hoopCoordinates.x + 80 &&
            ballContext.ballCoordinates.y - 60 > hoopCoordinates.y &&
            ballContext.ballCoordinates.y < hoopCoordinates.y + 170
        ) {
            console.log('SCORE!')
            alert('YOU SCORED!')
            ballContext.setBallCoordinates({
                x: 400,
                y: 200
            })
        }
    }, [props.fingerPosition, props.grabbing]);

    //console.log(props.grabbing)
    return (
        <>
            <Hoop />
            <motion.div
                className="ball"
                variants={variants}
                animate={grabRef.current ? "grab" : "default"}
                transition={{
                    ease: "easeOut",
                    duration: 0.1,
                }}
            />
        </>
    );
}
