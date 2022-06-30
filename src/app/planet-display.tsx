import React, {useEffect, useState} from "react";
import "./planet-display.less"
import {AngleFormat, Observers, Planets, StepSize} from "horizons-service/models/enums";
import {Planet} from "app/models/planet";
import {HorizonsService} from "horizons-service/horizons-service";
import {HorizonsRequest, HorizonsResponse} from "horizons-service/models/models";

type PlanetDisplayType = {
    debug?: boolean,
    width: number,
    height: number,
    planets?: string[]
}

export function getCenterXY(width: number, height: number): number[] {
    const centerX = width / 2
    const centerY = height / 2
    return [centerX, centerY]
}

export function addHours(numOfHours, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);

  return date;
}

export function PlanetDisplay({width, height, planets = [Planets.Earth]}: PlanetDisplayType) {
    const [angles, setAngles] = useState({});
    const [centerX, centerY] = getCenterXY(width, height);

    const horizonsService = new HorizonsService();
    const now = new Date()
    const nowIso = now.toISOString()
    const retrieveAngles = () => {
        const retrievedAngles = {};
        const horizonsRequests: HorizonsRequest[] = planets?.map((planet: string) => {
           return {
               target: planet,
               observer: Observers.Sun,
               startTime: nowIso,
               endTime: addHours(1, now).toISOString(),
               returnOptions: {
                   angleFormat: AngleFormat.Deg,
                   stepSize: StepSize.Hour
               }
           } as HorizonsRequest
        });
        horizonsRequests.forEach(async (request: HorizonsRequest) => {
            const response: HorizonsResponse = await horizonsService.get(request);
            retrievedAngles[request.target] = response[request.target][0].dRa
        })
        setAngles(retrievedAngles)
    }

    useEffect(() => {
        retrieveAngles();
    }, [])

    console.log(`Height=${height}`)
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
                            angle={angles[planet]}
                        />
                    )
                    })
                }
        </React.Fragment>
    )
}