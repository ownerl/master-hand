import { useContext, useEffect, useRef, useState } from "react";
import "./Ball.css";
import { motion } from "framer-motion";
import { BallContext } from "./TensorFlow";

export default function Ball(props) {
    const ballContext = useContext(BallContext)
    const ballCoordinates = ballContext.ballCoordinates
    const grabRef = useRef(false)
    //console.log(ballContext)

    const variants = {
        default: {
            x: ballCoordinates.x,
            y: ballCoordinates.y,
        },
        grab: {
            x: props.fingerPosition.x - 15,
            y: props.fingerPosition.y - 15,
        }
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
                y: props.fingerPosition.y - 15
            });
        } else {
            grabRef.current = false;
        }
    }, [props.fingerPosition, props.grabbing]);

    //console.log(props.grabbing)
    return (
        <>
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
    )
}