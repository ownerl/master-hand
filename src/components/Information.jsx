import React from "react";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import { useThree } from "@react-three/fiber";

export const Information = ({ fingerPosition }) => {
    const groupRef = useRef(true);
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const scene = useThree(({ scene }) => {
        return scene;
    });
    const cam = useThree(({ camera }) => {
        return camera;
    });
    // Information Points
    function createPointMesh(name, x, y, z) {
        const geometry = new THREE.SphereGeometry(0.5, 16, 8);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, z);
        mesh.name = name;
        return mesh;
    }
    const pRef = useRef(document.createElement("p"));
    const pConRef = useRef(document.createElement("div"));
    const pLabelRef = useRef(new CSS2DObject(pConRef.current));
    // useEffect(() => {

    const group = new THREE.Group();
    const wellMesh = createPointMesh("well", 12.7, -6, -18.5);

        group.add(wellMesh);
    
    // const p = document.createElement("p");
    pRef.current.className = "tooltip";
    // const pContainer = document.createElement("div");
    pConRef.current.appendChild(pRef.current);
    // const pLabel = new CSS2DObject(pConRef.current);
    console.log("ADDED!");
    scene.add(pLabelRef.current);
    scene.add(group);
    groupRef.current = false;

    useEffect(() => {
        if (!groupRef.current) {
            mouse.x = (fingerPosition?.x / window.innerWidth) * 2 - 1;
            mouse.y = (fingerPosition?.y / window.innerHeight) * 2 - 1;

            raycaster.setFromCamera(mouse, cam);
            const intersects = raycaster.intersectObject(group);
            if (intersects.length > 0) {
                console.log("biger", intersects);
            }
        }
    }, [fingerPosition]);

    console.log("the children", scene.children);
    // scene.children.forEach((item)=> {
    //     console.log('each item ', item.name)
    // })

    // }, [scene])
    return <></>;
};
