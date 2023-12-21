import "./App.css";
import TFApp from "./TensorFlow";
import { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages";

function App() {
    const handRef = useRef(null);
    const grabRef = useRef(false);
    const [fp, setfp] = useState(handRef.current)
    return (
        <main>
            <TFApp setfp={setfp} fingerPosition={handRef} grabRef={grabRef} />
            <Home fp={fp} grab={grabRef} />
        </main>
    );
}

export default App;
