import React, {CSSProperties} from "react";
import {Planets} from "horizons-service/models/enums";
import {Orbit} from "app/models/orbit";
import "./planet.less"

type PlanetProps = {
    id: string,
    angle: number,
    radius: number,
    centerX: number,
    centerY: number,
    planetSize: number
}

export const getColor = (id: string): string => {
    switch(id) {
        case Planets.Mercury.valueOf():
            return "ghostWhite";
        case Planets.Venus.valueOf():
            return "goldenRod";
        case Planets.Earth.valueOf():
            return "blue";
        case Planets.Mars.valueOf():
            return "darkRed";
        case Planets.Jupiter.valueOf():
            return "crimson";
        case Planets.Saturn.valueOf():
            return "aquamarine";
        case Planets.Uranus.valueOf():
            return "deepSkyBlue";
        case Planets.Neptune.valueOf():
            return "darkBlue";
        default:
            return "green"
    }
}


export function Planet({id, radius, centerX, centerY, angle, planetSize = 30}: PlanetProps) {
    const color = getColor(id);
    const planetStyle = {
        height: planetSize,
        width: planetSize,
        background: color,
        position: "absolute",
        top: radius - (planetSize / 2),
        left: radius / 2
    } as CSSProperties;
    return (
        <Orbit id={id} centerX={centerX} centerY={centerY} color={color} majorAxis={radius} minorAxis={radius} angle={angle}>
            <div className="planet" style={planetStyle}/>
        </Orbit>
    )
}