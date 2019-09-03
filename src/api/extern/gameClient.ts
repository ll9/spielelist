import client from './baseClient';
import { AxiosResponse } from 'axios';

const resource = 'games';

export default {
  async search(val: string): Promise<AxiosResponse<any>> {
    return await client.post(`/${resource}`,
      `fields name, popularity, cover.url, url, first_release_date;
      search "${val}";`,
      { headers: { 'content-type': 'text/plain' } });
  },
};
