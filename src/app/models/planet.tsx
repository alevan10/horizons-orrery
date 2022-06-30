import React, {CSSProperties} from "react";
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
    return id ? "blue" : "green";
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
    console.log(planetStyle)
    return (
        <Orbit id={id} centerX={centerX} centerY={centerY} color={color} majorAxis={radius} minorAxis={radius} angle={angle}>
            <div className="planet" style={planetStyle}/>
        </Orbit>
    )
}