import { Observers, Planets, Moons } from 'horizons-service/models/enums';

export interface HorizonsRequestOptions {
    angleFormat: string
    stepSize: string
}

export interface HorizonsRequest {
    target: Planets | Moons
    observer: Observers
    startTime: string
    endTime: string
    returnOptions: HorizonsRequestOptions
}

export interface HorizonsEphemResponse {
    date: Date
    raIcrf?: number | null
    decIcrf?: number | null
    devAApp?: number | null
    dRa?: number | null
    aPmag?: number | null
    sBrt?: number | null
    delta?: number | null
    delDot?: number | null
}

export interface HorizonsResponse {
    [key: string]: Array<HorizonsEphemResponse>
}
