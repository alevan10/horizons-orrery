import axios from 'axios';
import { HorizonsRequest, HorizonsResponse } from 'horizons-service/models/models';

const baseUrl = 'http://levan.home/api/v1/ephemerides';

// TODO: Turn this into a class

export class HorizonsService {
  async get(request: HorizonsRequest): Promise<HorizonsResponse> {
    try {
      const { data } = await axios.post(baseUrl, [request]);
      return data;
    } catch (e) {
      console.log(e)
      throw e;
    }
  }
}
