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
    const endTime = addHours(1, now).toISOString()
    const radius = width / planets?.length
    const retrieveAngles = async () => {
        const retrievedAngles = {};
        const horizonsRequests: HorizonsRequest[] = planets?.map((planet: string) => {
           return {
               target: planet,
               observer: Observers.Sun,
               startTime: nowIso,
               endTime: endTime,
               returnOptions: {
                   angleFormat: AngleFormat.Deg,
                   stepSize: StepSize.Hour
               }
           } as HorizonsRequest
        });
        const response: HorizonsResponse = await horizonsService.get(horizonsRequests);
        horizonsRequests.forEach(async (request: HorizonsRequest) => {
            retrievedAngles[request.target] = response[request.target][0].raIcrf
        });
        setAngles(retrievedAngles);
    }

    useEffect(() => {
        retrieveAngles();
    }, [])

    return (
        <React.Fragment>
                {planets?.map((planet, index) => {

                    return (
                        // @ts-ignore
                        <Planet
                            key={planet}
                            id={planet}
                            radius={(radius * (index + 1)) - 35}
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