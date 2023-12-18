import logo from "./logo.svg";
import "./App.css";
import TFApp from "./TensorFlow";
import MyThree from "./ThreeApp";
import { useRef } from "react";

function App() {
    const handRef = useRef(null);
    const grabRef = useRef(false);

    return (
        <div className="App">
            <header className="App-header">
            <MyThree />
                <TFApp fingerPosition={handRef} grabRef={grabRef} />
                Learn React
            </header>
            <canvas id="three-bg">hello</canvas>
        </div>
    );
}

export default App;
