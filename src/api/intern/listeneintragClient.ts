import client from './baseClient';
import { AxiosResponse } from 'axios';

const resource = 'listeneintraege';

export default {
  async list(): Promise<AxiosResponse<any>> {
    return await client.get(`/${resource}`);
  },
};
