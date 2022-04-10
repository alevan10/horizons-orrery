export interface HorizonsRequestOptions {
    angleFormat: string
    stepSize: string
}

export interface HorizonsRequest {
    target: number
    observer: number
    startTime: Date
    endTime: Date
    returnOptions: HorizonsRequestOptions
}

export interface HorizonsResponse {
    date: Date
    raIcrf: number | null
    decIcrf: number | null
    devAApp: number | null
    dRa: number | null
    aPmag: number | null
    sBrt: number | null
    delta: number | null
    delDot: number | null
}