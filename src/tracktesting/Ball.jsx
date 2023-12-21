import { useContext, useEffect, useRef, useState } from "react";
import "./Ball.css";
import { motion } from "framer-motion";
import Hoop from "./Hoop";

export default function Ball(props) {
    const ballRef = useRef({ x: 400, y: 200 });
    const hoopCoordinates = { x: 600, y: 700, width: 140, height: 90 };
    const grabbing = useRef(false);
    //console.log(positionContext)
    const variants = {
        default: {
            x: ballRef.current.x,
            y: ballRef.current.y,
        },
        grab: {
            x: props.fingerPosition?.x - 15,
            y: props.fingerPosition?.y - 15,
        },
    };
    if (
        props.grabRef.current === true &&
        props.fingerPosition?.x + 20 > ballRef.current.x &&
        props.fingerPosition?.x < ballRef.current.x + 50 &&
        props.fingerPosition?.y + 20 > ballRef.current.y &&
        props.fingerPosition?.y < ballRef.current.y + 50
    ) {
        grabbing.current = true
    }
    if (props.grabRef.current === false) {
        grabbing.current = false;
    }

    useEffect(() => {
        if (grabbing.current) {
            console.log("GRABBIN PILLZ HERE");
            ballRef.current = {
                x: props.fingerPosition.x - 15,
                y: props.fingerPosition.y - 15,
            };
        }
        

        if (
            ballRef.current.x > hoopCoordinates.x &&
            ballRef.current.x < hoopCoordinates.x + 80 &&
            ballRef.current.y - 60 > hoopCoordinates.y &&
            ballRef.current.y < hoopCoordinates.y + 170
        ) {
            console.log("SCORE!");
            ballRef.current = {
                x: 400,
                y: 200,
            };
            alert("YOU SCORED!");
        }
    }, [props.fingerPosition, props.grabRef.current]);

    //console.log(props.grabbing.current)
    return (
        <>
            <Hoop />
            <motion.div
                className="ball"
                variants={variants}
                animate={grabbing.current ? "grab" : "default"}
                transition={{
                    ease: "easeOut",
                    duration: 0.1,
                }}
            />
        </>
    );
}
