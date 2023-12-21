import "./App.css";
import TFApp from "./TensorFlow";
import MyThree from "./ThreeApp";
import { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { About, Projects, Home } from "./pages";

function App() {
    const handRef = useRef(null);
    const grabRef = useRef(false);
    const [fp, setfp] = useState(handRef.current)
    return (
        <main>
            {/* <Navbar /> */}
            <TFApp setfp={setfp} fingerPosition={handRef} grabRef={grabRef} />
            <Home fp={fp} grab={grabRef} />
            <Routes>
                {/* <Route path="/" /> */}
                <Route path="/" element={<About />} />
                <Route path="projects" element={<Projects />} />
            </Routes>
        </main>
    );
}

export default App;
/* <MyThree fingerPosition={handRef} grabRef={grabRef} /> */
