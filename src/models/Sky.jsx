import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber/dist/react-three-fiber.cjs";
import React, { useRef } from "react";

const Sky = ({ isRotating, delta, smoothDeltaHand, grab }) => {
    const sky = useGLTF("/3d/sky.glb");
    const skyRef = useRef();
    const defDelta = delta
    useFrame((_, delta) => {
        if (isRotating) {
            if (grab) {
                skyRef.current.rotation.y += 0.1 * smoothDeltaHand
            } else {
                skyRef.current.rotation.y += 0.1 * defDelta;
            }
        }
    })
    return (
        <mesh ref={skyRef}>
            <primitive object={sky.scene} />
        </mesh>
    );
};

export default Sky;
