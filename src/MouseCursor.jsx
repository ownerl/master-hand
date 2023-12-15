import { useEffect, useState } from "react";
import './MouseCursor.css';

export default function MouseCursor(fingerPosition) {
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    });

    useEffect(() => {
        console.log(fingerPosition)
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
        <div className="cursor" style={{ left: `${fingerPosition.x-15}px`, top: `${fingerPosition.y-15}px` }}></div>
    );
}