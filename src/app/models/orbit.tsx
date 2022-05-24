import React from "react";
import "./orbit.less"
import {Ellipse} from "app/models/ellipse";

type OrbitProps = {
    id: string,
    color: string,
    majorAxis: number,
    minorAxis: number,
    centerX: number,
    centerY: number,
    useCircle?: boolean,
    lineThickness?: number,
    children: JSX.Element[]
}

export function Orbit(
    {
        id,
        color,
        centerX,
        centerY,
        majorAxis,
        minorAxis,
        children,
        lineThickness = 2
    }: OrbitProps
): JSX.Element {
    const ellipse = new Ellipse({semiMajorAxis: majorAxis, semiMinorAxis: minorAxis})
    const orbitStyle = {
        ...ellipse.style(2 * lineThickness, centerX, centerY),
        border: `${lineThickness}px solid ${color}`,
        position: "absolute",
    }

    return (<div id={id} style={orbitStyle} className="orbit">{children}</div>)
}