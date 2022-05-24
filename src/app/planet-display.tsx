import React from "react";
import "./planet-display.less"
import {Planets} from "horizons-service/models/enums";
import {Planet} from "app/models/planet";

type PlanetDisplayType = {
    debug?: boolean,
    width: number,
    height?: number,
    planets?: string[]
}

export function getCenterXY(width: number): number[] {
    const centerX = width / 2
    const centerY = width / 2
    return [centerX, centerY]
}

export function PlanetDisplay({width, planets = [Planets.Earth]}: PlanetDisplayType) {

    const [centerX, centerY] = getCenterXY(width)

    console.log(`Width=${width}`)
    return (
        <React.Fragment>
                {planets?.map((planet, index) => {
                    return (
                        // @ts-ignore
                        <Planet
                            key={planet}
                            id={planet}
                            radius={(width / (planets?.length - index)) - 50}
                            centerX={centerX}
                            centerY={centerY}
                            angle={90}
                        />
                    )
                    })
                }
        </React.Fragment>
    )
}