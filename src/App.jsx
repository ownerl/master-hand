import "./App.css";
import TFApp from "./TensorFlow";
import { useRef, useState } from "react";
import { Home } from "./pages";

function App() {
    const handRef = useRef(null);
    const grabRef = useRef(false);
    const zoomRef = useRef(1)
    const zoomDistanceRef = useRef(null)

    const [fp, setfp] = useState(handRef.current)
    return (
        <main>
            <TFApp setfp={setfp} fingerPosition={handRef} grabRef={grabRef} zoomRef={zoomRef} zoomDistanceRef={zoomDistanceRef} />
            <Home fp={fp} grab={grabRef} zoom={zoomRef} zoomDistanceRef={zoomDistanceRef}/>
        </main>
    );
}

export default App;
