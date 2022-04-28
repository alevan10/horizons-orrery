import React from "react";
import "./planet-display.less"
import {Layer} from "react-konva";
import {Planets} from "horizons-service/models/enums";
import {Planet} from "app/models/planet";

type PlanetDisplayType = {
    debug?: boolean,
    width: number,
    height?: number,
    planets: string[]
}

export function getCenterXY(width: number): number[] {
    const centerX = width / 2
    const centerY = width / 2
    return [centerX, centerY]
}

export function PlanetDisplay({width, planets = [Planets.Earth]}: PlanetDisplayType) {

    const [centerX, centerY] = getCenterXY(width)
    return (
        <React.Fragment className="planet-display">
                {planets.map(planet => {
                    return (
                        <Layer key={planet}>
                            <Planet id={planet} radius={width / 4} centerX={centerX} centerY={centerY}/>
                        </Layer>
                    )
                    })
                }
        </React.Fragment>
    )
}