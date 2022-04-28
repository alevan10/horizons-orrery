import React, {useEffect, useState} from "react";
import {PlanetDisplay} from "app/planet-display";
import "./orrery.less"
import {Stage} from "react-konva";

export function Orrery() {
    const [windowLength, setWindowLength] = useState(window.innerWidth)
    const [windowHeight, setWindowHeight] = useState(window.innerHeight)

    useEffect(() => {
        function onResize() {
            setWindowLength(window.innerWidth)
            setWindowHeight(window.innerHeight)
        }
        window.addEventListener("resize", onResize)
    })

    return (
        <Stage width={windowLength} height={windowHeight}>
            <PlanetDisplay debug={true} height={windowHeight} width={windowLength}/>
        </Stage>
    )
}