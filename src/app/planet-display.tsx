import React, {useEffect, useState} from "react";
import "./planet-display.less"
import {AngleFormat, Moons, Observers, Planets, StepSize} from "horizons-service/models/enums";
import {Planet} from "app/models/planet";
import {HorizonsService} from "horizons-service/horizons-service";
import {HorizonsRequest, HorizonsResponse} from "horizons-service/models/models";

type PlanetDisplayType = {
    debug?: boolean,
    width: number,
    height: number,
    planets?: Planets[] | Moons[]
}

type PlantAngles = {[key in Planets | Moons]?: number | null}

export function getCenterXY(width: number, height: number): number[] {
    const centerX = width / 2
    const centerY = height / 2
    return [centerX, centerY]
}

export function addHours(numOfHours: number, date = new Date()) {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  return date;
}

export function PlanetDisplay({width, height, planets = [Planets.Earth]}: PlanetDisplayType) {
    const [angles, setAngles] = useState<PlantAngles>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [centerX, centerY] = getCenterXY(width, height);

    const horizonsService = new HorizonsService();
    const now = new Date();
    const nowIso = now.toISOString();
    const endTime = addHours(1, now).toISOString();
    const radius = (width < height ? width : height) / planets?.length;

    const retrieveAngles = async () => {
        const retrievedAngles: PlantAngles = {};
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
        horizonsRequests.forEach((request: HorizonsRequest) => {
            retrievedAngles[request.target] = response[request.target][0].raIcrf
        });
        setAngles(retrievedAngles);
        setIsLoading(false);
    }

    useEffect(() => {
        retrieveAngles();
    }, [])

    return (
        !isLoading ? <div>
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
        </div> : <div>Loading orrery...</div>
    )
}