import { useContext, useEffect, useRef, useState } from "react";
import "./Ball.css";
import { motion } from "framer-motion";
import { PositionContext } from "./TensorFlow";
import Hoop from "./Hoop";
export default function Ball(props) {
    const positionContext = useContext(PositionContext);
    const ballCoordinates = positionContext.ballCoordinates;
    const hoopCoordinates = {x: 600, y: 700, width: 140, height: 90}
    const grabRef = useRef(false);
    //console.log(positionContext)

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
            props.fingerPosition.x + 20 > positionContext.ballCoordinates.x &&
            props.fingerPosition.x < positionContext.ballCoordinates.x + 50 &&
            props.fingerPosition.y + 20 > positionContext.ballCoordinates.y &&
            props.fingerPosition.y < positionContext.ballCoordinates.y + 50
        ) {
            grabRef.current = true;
            positionContext.setBallCoordinates({
                x: props.fingerPosition.x - 15,
                y: props.fingerPosition.y - 15,
            });
        } else {
            grabRef.current = false;
        }

        if (
            positionContext.ballCoordinates.x > hoopCoordinates.x &&
            positionContext.ballCoordinates.x <  hoopCoordinates.x + 80 &&
            positionContext.ballCoordinates.y - 60 > hoopCoordinates.y &&
            positionContext.ballCoordinates.y < hoopCoordinates.y + 170
        ) {
            console.log('SCORE!')
            positionContext.setBallCoordinates({
                x: 400,
                y: 200
            })
            alert('YOU SCORED!')
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
