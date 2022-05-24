import React, {useEffect, useState} from "react";
import {PlanetDisplay} from "app/planet-display";
import "./orrery.less"

export function Orrery(): JSX.Element {
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
        // @ts-ignore
        <PlanetDisplay debug={true} height={windowHeight} width={windowLength}/>
    )
}