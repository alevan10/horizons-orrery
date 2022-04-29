import React from "react";
import {Circle, Ellipse} from "react-konva";

type OrbitProps = {
    id: string,
    majorAxis?: number,
    minorAxis?: number,
    radius?: number,
    centerX: number,
    centerY: number,
    useCircle?: boolean
}

const getColor = (id: string): string => {
    return id ? "blue" : "green"
}

export function Orbit({id, majorAxis, minorAxis, centerX, centerY, radius, useCircle = true}: OrbitProps): JSX.Element {
    const orbitColor = getColor(id)

    return useCircle ?
        // @ts-ignore
        <Circle x={centerX} y={centerY} radius={radius} stroke={orbitColor}/> :
        // @ts-ignore
        <Ellipse x={centerX} y={centerY} radiusX={majorAxis} radiusY={minorAxis} stroke={orbitColor}/>;
}