import "./App.css";
import TFApp from "./TensorFlow";
import MyThree from "./ThreeApp";
import { useRef } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { About, Projects, Home } from "./pages"

function App() {
    const handRef = useRef(null);
    const grabRef = useRef(false);

    return (
        <main>
            <Navbar />
            <Routes>
            <Route path="/" element={
                <>
                <Home />
                {/* <MyThree fingerPosition={handRef} grabRef={grabRef} /> */}
                <TFApp fingerPosition={handRef} grabRef={grabRef} />
                </>
            } />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            </Routes>
        </main>
    );
}

export default App;
