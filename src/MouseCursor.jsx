import { useEffect, useState } from "react";
import './MouseCursor.css';

export default function MouseCursor(props) {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });
    console.log('mousepos: ', mousePosition)
    console.log('finge pos:', props.fingerPosition.x)
    useEffect(() => {
        const mouseMove = (evt) => {
            setMousePosition({
                x: evt.clientX,
                y: evt.clientY
            });
        };

        window.addEventListener("mousemove", mouseMove);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    return (
        <div className="cursor" style={{ left: `${props.fingerPosition.x-15}px`, top: `${props.fingerPosition.y-15}px` }}></div>
    );
}