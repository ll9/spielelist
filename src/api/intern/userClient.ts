import client from './baseClient';
import { AxiosResponse } from 'axios';

const resource = 'users';

export default {
  async add(name: string): Promise<AxiosResponse<any>> {
    return await client.post(`/${resource}`, {name});
  },
  async list(): Promise<AxiosResponse<any>> {
    return await client.get(`/${resource}`);
  },
  async remove(id: number): Promise<AxiosResponse<any>> {
    return await client.delete(`/${resource}/${id}`);
  },
};
