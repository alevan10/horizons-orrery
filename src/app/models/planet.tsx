import React from "react";
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

export const getOrbitalPosition= (
    {angle, number, radiusX, radiusY, offset = 0}: {angle: number, radiusX: number, radiusY: number, offset?: number}
): number[] => {
    // offset is the amount to shift based on the size of the planet, otherwise the location will be the top left corner
    // of the resulting div
    let x = radiusX + radiusX * -Math.sin((angle * Math.PI) / 180);
    let y = radiusY + -radiusY * -Math.cos((angle * Math.PI) / 180);
    return [x, y]
}


export function Planet({id, radius, centerX, centerY, angle, planetSize = 20}: PlanetProps) {
    const color = getColor(id);
    const [planetX, planetY] = getOrbitalPosition({angle, radiusX: radius, radiusY: radius})
    const planetStyle = {
        height: planetSize,
        width: planetSize,
        background: color,
        position: "absolute",
        top: planetY,
        left: planetX
    }
    console.log(planetStyle)
    return (
        <Orbit id={id} centerX={centerX} centerY={centerY} color={color} majorAxis={radius} minorAxis={radius}>
            <div className="planet" style={planetStyle}/>
        </Orbit>
    )
}