import client from './baseClient';
import { AxiosResponse } from 'axios';

const resource = 'users';
const subResource = 'listentries';

export default {
    async add(userId: number, igdbId: number): Promise<AxiosResponse<any>> {
        return await client.post(`/${resource}/${userId}/${subResource}`, { igdbId });
    },
    async remove(userId: number, igdbId: number): Promise<AxiosResponse<any>> {
        return await client.delete(`/${resource}/${userId}/${subResource}/${igdbId}`);
    },
    async updateIndex(userId: number, igdbId: number, index: number): Promise<AxiosResponse<any>> {
        return await client.put(`/${resource}/${userId}/${subResource}/${igdbId}/index`, index, {headers: {
            'Content-Type': 'application/json; charset=utf-8'}});
    },
};
