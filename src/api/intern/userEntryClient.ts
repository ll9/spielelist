import client from './baseClient';
import { AxiosResponse } from 'axios';

const resource = 'users';
const subResource = 'userentries';

export default {
    async add(userId: number, igdbId: number): Promise<AxiosResponse<any>> {
        return await client.post(`/${resource}/${userId}/${subResource}`, { igdbId });
    },
    async remove(userId: number, igdbId: number): Promise<AxiosResponse<any>> {
        return await client.post(`/${resource}/${userId}/${subResource}/${igdbId}`);
    },
};
