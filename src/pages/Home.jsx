import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Island from "../models/Island";
import Sky from "../models/Sky";
export default function Home(props) {
    const [isRotating, setIsRotating] = useState(false)
    const [handRefState, setHandRefState] = useState(props.fp)
    // const handyRef = useRef(props.fingerPosition.current)

    const adjustIslandForScreenSize =  () => {
        let screenScale = null;
        let screenPosition = [0, -15, -45];
        let rotation = [0, 4.7, 0];
        if (window.innerWidth < 768) {
            screenScale = [0.2, 0.2, 0.2];
            screenPosition = [0, -10, -20]
        } else {
            screenScale = [0.4,0.4,0.4];
        }
        return [screenScale, screenPosition, rotation]
    }

    useEffect(() => {
        setHandRefState(props.fp)
    }, [props.fp])

    const [islandScale, islandPosition, rotation] = adjustIslandForScreenSize();

    return (
        <section className='w-full h-screen relative'>
            {/* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center text-gray-200'>
                POPO JOJO
            </div> */}
            <Canvas 
                className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
                camera={{ near: 0.1, far: 1000 }}
            >
                <Suspense fallback={<Loader />}>
                    <directionalLight position={[1,10,1]} intensity={2} />
                    <ambientLight intensity={0.5} />
                    {/* <pointLight />
                    <spotLight /> */}
                    <hemisphereLight skyColor="#b1e1ff" groundColor="#000000"/>
                    <Sky />
                    <Island 
                        position={islandPosition}
                        scale={islandScale}
                        rotation={rotation}
                        isRotating={isRotating}
                        setIsRotating={setIsRotating}
                        fingerPosition={handRefState}
                        grab={props.grab.current}
                    />
                </Suspense>
            </Canvas>
        </section>
    )
}
