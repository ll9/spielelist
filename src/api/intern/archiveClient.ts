import client from './baseClient';
import { AxiosResponse } from 'axios';

const resource = 'archive';

export default {
  async add(id: number): Promise<AxiosResponse<any>> {
    return await client.post(`/${resource}`, id, {headers: {
        'Content-Type': 'application/json; charset=utf-8'}});
  },
  async list(): Promise<AxiosResponse<any>> {
    return await client.get(`/${resource}`);
  },
  async remove(id: number): Promise<AxiosResponse<any>> {
    return await client.delete(`/${resource}/${id}`);
  },
};
