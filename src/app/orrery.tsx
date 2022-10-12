import React, {useEffect, useState} from "react";
import {PlanetDisplay} from "app/planet-display";
import "./orrery.less"
import {Planets} from "horizons-service/models/enums";

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
    const planets: string[] = [Planets.Mercury, Planets.Venus, Planets.Earth, Planets.Mars, Planets.Jupiter, Planets.Saturn, Planets.Uranus, Planets.Neptune];
    return (
        // @ts-ignore
        <PlanetDisplay debug={true} height={windowHeight} width={windowLength} planets={planets}/>
    )
}