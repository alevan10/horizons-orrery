export enum Planets {
    Mercury = "199",
    Venus = "299",
    Earth = "399",
    Mars = "499",
    Jupiter = "599",
    Saturn = "699",
    Uranus = "799",
    Neptune = "899"
}

export enum Observers {
    Sun = '@10',
    Earth = `@${Planets.Earth}`
}

export enum Moons {
    Luna = "301"
}

export enum StepSize {
    Day = 'day',
    Minute = 'minute',
    Hour = 'hour'
}

export enum AngleFormat {
    HMS = 'HMS',
    Deg = 'DEG'
}
