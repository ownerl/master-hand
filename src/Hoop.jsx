import { useContext, useEffect, useRef, useState } from "react";
import "./Hoop.css";
import { motion } from "framer-motion";

export default function Hoop() {
    const [hoopCoordinates, setHoopCoordinates] = useState({
        x: "600px",
        y: "800px",
    });

    return (
        <motion.div
            className="hoop"
            style={{
                left: hoopCoordinates.x,
                top: hoopCoordinates.y,
            }}
        >
            Hoop
        </motion.div>
    );
}
