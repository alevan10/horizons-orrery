type EllipseConstructorType = {
    semiMajorAxis: number
    semiMinorAxis: number
}

type EllipseStyleType = {
    height: number
    width: number
    top: number
    left: number
}


export class Ellipse {
    public readonly major: number = 0;

    public readonly minor: number = 0;

    constructor({semiMajorAxis, semiMinorAxis}: EllipseConstructorType) {
        this.major = semiMajorAxis
        this.minor = semiMinorAxis
    }

    private e: number = Math.sqrt(1 - (this.minor**2 / this.major**2))

    private c: number = this.major * this.e

    coordinates = (angle: number, radius: number): number[] => {
        const x = this.c + (radius * Math.cos(angle))
        const y = radius * Math.sin(angle)
        return [x, y]
    }

    public style = (offset: number, centerX: number, centerY: number): EllipseStyleType => {
        return {
            height: this.major - offset,
            width: this.minor - offset,
            top: centerY - (((this.major) - offset) / 2),
            left: centerX - (((this.minor) - offset) / 2)
        }
    }
}