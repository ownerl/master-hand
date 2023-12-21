import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
import * as THREE from "three";
import { CameraControls } from "@react-three/drei";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { GridHelper } from "three";
import { useThree } from "@react-three/fiber/dist/react-three-fiber.cjs";
export default function Home(props) {
    const [isRotating, setIsRotating] = useState(false);
    const [handRefState, setHandRefState] = useState(props.fp);
    // const handyRef = useRef(props.fingerPosition.current)
    const initializedRef = useRef(false);
    const controlsRef = useRef();
    useEffect(() => {
        if (!initializedRef.current) {
            // const labelRenderer = new CSS2DRenderer();
            // if (!document.getElementById("label-renderer")) {
            //     labelRenderer.setSize(
            //         window.innerWidth / 8,
            //         window.innerHeight / 2
            //     );
            //     labelRenderer.domElement.style.position = "absolute";
            //     labelRenderer.domElement.style.top = "0px";
            //     labelRenderer.domElement.style.pointerEvents = "none";
            //     labelRenderer.domElement.id = "label-renderer";
            //     document.body.appendChild(labelRenderer.domElement);
            // }
            initializedRef.current = true;
        }
    }, [initializedRef.current]);

    const adjustIslandForScreenSize = () => {
        let screenScale = null;
        let screenPosition = [0, -10, 0];
        let rotation = [0, 4.7, 0];
        if (window.innerWidth < 768) {
            screenScale = [0.2, 0.2, 0.2];
            screenPosition = [0, 0, 0];
        } else {
            screenScale = [0.4, 0.4, 0.4];
        }
        return [screenScale, screenPosition, rotation];
    };


    useEffect(() => {
        setHandRefState(props.fp);
    }, [props.fp]);

    const [islandScale, islandPosition, rotation] = adjustIslandForScreenSize();

    return (
        <section className="w-full h-screen relative">
            <Canvas
                className={`w-full h-screen bg-transparent ${
                    isRotating ? "cursor-grabbing" : "cursor-grab"
                }`}
                camera={{ near: 0.1, far: 800, fov: 60 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1, 10, 1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    {/* <pointLight />
                    <spotLight /> */}
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" />

                    <Island
                        position={islandPosition}
                        scale={islandScale}
                        rotation={rotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        fingerPosition={handRefState}
                        grab={props.grab.current}
                        controlsRef={controlsRef}
                    />
                    <CameraControls
                        ref={controlsRef}
                        distance={50}
                        minDistance={44}
                        maxDistance={150}
                        enablePan={false}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI / 2}
                        smoothTime={0.125}
                    />
                </Suspense>
            </Canvas>
        </section>
    );
}
