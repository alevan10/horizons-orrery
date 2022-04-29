import React from "react";
import {Orbit} from "app/models/orbit";

type PlanetProps = {
    id: string,
    angle?: number,
    radius: number,
    centerX: number,
    centerY: number,
}



export function Planet({id, radius, centerX, centerY}: PlanetProps) {

    return (
        <Orbit id={id} radius={radius} centerX={centerX} centerY={centerY}/>
    )
}