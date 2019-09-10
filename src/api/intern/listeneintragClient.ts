import client from './baseClient';
import { AxiosResponse } from 'axios';

const resource = 'listeneintraege';

export default {
  async add(id: number): Promise<AxiosResponse<any>> {
    return await client.post(`/${resource}`, {spielId: id});
  },
  async list(): Promise<AxiosResponse<any>> {
    return await client.get(`/${resource}`);
  },
  async remove(id: number): Promise<AxiosResponse<any>> {
    return await client.delete(`/${resource}/${id}`);
  },
};
