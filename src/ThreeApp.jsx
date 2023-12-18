import * as THREE from "three";

import { useContext, useEffect, useRef, useState } from "react";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function MyThree(props) {
    const refContainer = useRef(null);
    const positiveRotation = useRef(true);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    useEffect(() => {
        refContainer.current &&
            refContainer.current.appendChild(renderer.domElement);
        var geometry = new THREE.TorusGeometry(2, 1, 20);
        var material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(0, 0, 0);

        const ambientLight = new THREE.AmbientLight(0xffffff);
        const lightHelper = new THREE.PointLightHelper(pointLight);
        scene.add(lightHelper, ambientLight);

        const gridHelper = new THREE.GridHelper(200, 50);

        scene.add(pointLight, gridHelper);

        const controls = new OrbitControls(camera, renderer.domElement);

        camera.position.z = 5;
        var animate = function () {
            requestAnimationFrame(animate);
            moveShape(cube);
            if (positiveRotation.current) {
                // cube.rotation.x += 0.01;
            } else {
                // cube.rotation.x -= 0.01;
            }
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
        // === THREE.JS CODE START ===
    }, []);

    function moveShape(cube) {
        if (props.grabRef.current) {
            if (props.fingerPosition.current?.x > (200 + window.innerWidth / 2)) {
                cube.rotation.y += 0.01;
            }
            if (props.fingerPosition.current?.x <= (window.innerWidth / 2) - 200) {        
                cube.rotation.y -= 0.01;
            }
            // if (props.fingerPosition.current?.y > (window.innerHeight / 2)) {
            //     cube.rotation.x += 0.01;
            // }
            // if (props.fingerPosition.current?.y <= (window.innerHeight / 2)) {
            //     cube.rotation.x -= 0.01;
            // }
        }
        // if (positionContext.fingerPosition.x) {
        //     try {
        //         console.log(positionContext.fingerPosition.x);
        //         if (positionContext.fingerPosition.x < 500) {
        //             positiveRotation.current = true
        //         } else {
        //             positiveRotation.current = false
        //         }
        //     } catch {}
    }
    // rotationSpeedRef.current = isNaN(positionContext.fingerPosition.x) ? 0.01 : positionContext.fingerPosition.x/10000 ;
    // cube.rotation.y += rotationSpeedRef.current
    // console.log('the rotation speed: ' , rotationSpeedRef.current)
    return <div ref={refContainer}></div>;
}