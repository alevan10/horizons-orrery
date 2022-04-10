import "axios"
import {HorizonsRequest, HorizonsResponse} from "src/models/models";
import axios, {AxiosResponse} from "axios";

const baseUrl = "http://levan.home/api/v1/ephemerides"

class HorizonsService {
    async get(request: HorizonsRequest): Promise<HorizonsResponse> {
        const response: AxiosResponse = await axios.post(baseUrl, request)
        return response.data
    }
}