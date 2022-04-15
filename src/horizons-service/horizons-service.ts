import axios from 'axios';
import { HorizonsRequest, HorizonsResponse } from 'models/models';

const baseUrl = 'http://levan.home/api/v1/ephemerides';

// TODO: Turn this into a class

export class HorizonsService {
  async get(request: HorizonsRequest): Promise<HorizonsResponse> {
    try {
      const { data } = await axios.post(baseUrl, [request]);
      // data.date = new Date(Date.parse(data.date));
      return data;
    } catch (e) {
      console.log(e)
      throw e;
    }
  }
}
