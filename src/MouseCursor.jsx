import { useEffect, useState } from "react";
import "./MouseCursor.css";
import { motion } from "framer-motion";

export default function MouseCursor(props) {
    // console.log("finge pos:", props.fingerPosition.x);
    const variants = {
        default: {
            x: props.fingerPosition.x,
            y: props.fingerPosition.y,
        },
    };

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
                    backgroundColor: `${props.cursorColor}`,
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