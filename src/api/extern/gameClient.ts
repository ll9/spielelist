import client from './baseClient';
import { AxiosResponse } from 'axios';

const resource = 'games';

export default {
  async search(val: string): Promise<AxiosResponse<any>> {
    return await client.post(`/${resource}`,
      `fields name, popularity, cover.url;
      search "${val}";`,
      { headers: { 'content-type': 'text/plain' } });
  },
};
