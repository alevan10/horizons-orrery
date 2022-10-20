import React, {useEffect, useRef, useState} from "react";
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
    offset?: number
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

export function addTime(numTime: number, amount: StepSize, date = new Date()) {
    let offset = 1000;
    switch (amount) {
        case StepSize.Day:
            offset = offset * 60 * 60 * 24;
            break;
        case StepSize.Hour:
            offset = offset * 60 * 60;
            break;
        case StepSize.Minute:
            offset = offset * 60;
            break;
        default:
            break;
    }
    date.setTime(date.getTime() + numTime * offset);
    return date;
}

export function setPlanetSize(diameter: number, basePlanetWidth: number = 30) {
    return (basePlanetWidth / 1440) * diameter;
}

export function PlanetDisplay({width, height, planets = [Planets.Earth], offset = 90}: PlanetDisplayType) {
    const start = new Date();
    const [angles, setAngles] = useState<PlantAngles>({});
    const [currentTime, setCurrentTime] = useState<Date>(start);
    const [endTime, setEndTime] = useState<Date>(addTime(1, StepSize.Hour, start))
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [centerX, centerY] = getCenterXY(width, height);
    const stopClock = useRef(false);

    const horizonsService = new HorizonsService();
    const screenSize = (width < height ? width : height) - 25
    const diameter = screenSize / planets?.length;
    const planetSize = setPlanetSize(screenSize);

    const retrieveAngles = async (startTime: Date = currentTime) => {
        const startIso = startTime.toISOString();
        const endIso = addTime(1, StepSize.Hour, startTime).toISOString();
        const retrievedAngles: PlantAngles = {};
        const horizonsRequests: HorizonsRequest[] = planets?.map((planet: string) => {
           return {
               target: planet,
               observer: Observers.Sun,
               startTime: startIso,
               endTime: endIso,
               returnOptions: {
                   angleFormat: AngleFormat.Deg,
                   stepSize: StepSize.Hour
               }
           } as HorizonsRequest
        });
        const response: HorizonsResponse = await horizonsService.get(horizonsRequests);
        horizonsRequests.forEach((request: HorizonsRequest) => {
            retrievedAngles[request.target] = (response[request.target][0].raIcrf || 90 * -1) - offset;
        });
        setAngles(retrievedAngles);
        setIsLoading(false);
    }

    const startClock = async () => {
        while(!stopClock) {
            const now = await new Promise(function(resolve) {
                setTimeout(() => resolve(new Date()), 1000)
            }) as Date;
            setCurrentTime(now);
        }
    }

    useEffect(() => {
        retrieveAngles();
        startClock();
    }, [])

    useEffect(() => {
        if (currentTime >= endTime) {
            console.log("Getting next set of locations");
            setEndTime(addTime(1, StepSize.Hour, currentTime));
            retrieveAngles(currentTime);
        }
    }, [currentTime])

    return (
        !isLoading ? <div>
            <div className="info"> Updated at {currentTime.toString()}</div>
                {planets?.map((planet, index) => {

                    return (
                        // @ts-ignore
                        <Planet
                            key={planet}
                            id={planet}
                            diameter={(diameter * (index + 1)) - 35}
                            centerX={centerX}
                            centerY={centerY}
                            angle={angles[planet]}
                            planetSize={planetSize}
                        />
                    )
                    })
                }
        </div> : <div>Loading orrery...</div>
    )
}