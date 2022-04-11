import axios from "axios";
import { HorizonsService } from "../../src/horizons-service/horizons-service";
import { HorizonsRequest, HorizonsRequestOptions, HorizonsEphemResponse } from "../../src/models/models";
import {AngleFormat, Observers, Planets, StepSize} from "../../src/models/enums";

describe("Horizons Service", function () {
    it("should return data", async function () {
        const horizons = new HorizonsService()
        const now: string = "2022-04-11T02:47:04.479Z"
        const nowInAnHour: string = "2022-04-11T03:47:04.479Z"
        const testReturnOptions: HorizonsRequestOptions = {
                angleFormat: AngleFormat.Deg,
                stepSize: StepSize.Hour
            }
        const testRequest: HorizonsRequest = {
            endTime: nowInAnHour,
            returnOptions: testReturnOptions,
            startTime: now,
            target: Planets.Mars,
            observer: Observers.Sun
        }
        const data = await horizons.get(testRequest)
        expect(data).toBeDefined()
        expect(data[Planets.Mars].length).toEqual(2)
        data[Planets.Mars].forEach( (ephem: HorizonsEphemResponse) => {
            expect(ephem.dRa).toBeDefined()
        })
    })
})