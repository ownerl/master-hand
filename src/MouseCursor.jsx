import { useEffect, useState, useRef } from "react";
import "./MouseCursor.css";
import { motion } from "framer-motion";

export default function MouseCursor(props) {
    // console.log("finge pos:", props.fingerPosition.x);
    const [cursor, setCursor] = useState("/hand.svg");
    const variants = {
        default: {
            x: props.fingerPosition?.x,
            y: props.fingerPosition?.y,
        },
    };
    useEffect(() => {
        if (props.grabRef.current === true) {
            setCursor("/grab.svg");
        } else {
            setCursor("/hand.svg");
        }
    }, [props.grabRef.current]);

    return (
        <>
            <motion.div
                className="cursor"
                variants={variants}
                animate="default"
                transition={{
                    ease: "easeOut",
                    duration: 0.1,
                }}
                style={{
                    //     left: `${props.fingerPosition.x}px`,
                    //     top: `${props.fingerPosition.y}px`,
                    // backgroundColor: `${cursorColor}`,
                    backgroundImage: `url(${cursor})`,
                    backgroundSize: 'cover',
                    height: '30px',
                    width: '30px',

                }}
            />
        </>
    );
}

// const [mousePosition, setMousePosition] = useState({
//     x: 0,
//     y: 0
// });
// console.log('mousepos: ', mousePosition)
// useEffect(() => {
//     const mouseMove = (evt) => {
//         setMousePosition({
//             x: evt.clientX,
//             y: evt.clientY
//         });
//     };

//     window.addEventListener("mousemove", mouseMove);

//     return () => {
//         window.removeEventListener("mousemove", mouseMove);
//     };
// }, []);
