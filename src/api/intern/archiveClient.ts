import { ArchiveUpdateDto } from "./../../models/ArchiveUpdateDto"
import client from "./baseClient"
import { AxiosResponse } from "axios"

const resource = "archive"

export default {
  async add(id: number): Promise<AxiosResponse<any>> {
    return await client.post(`/${resource}`, id, {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
  },
  async list(page = 1, pageSize = 20): Promise<any> {
    const res = await client.get(`/${resource}?page=${page}&pageSize=${pageSize}`)
    const totalCount = res.headers["x-total-count"] || 1

    return { data: res.data, totalCount }
  },

  async listByYear(year: number): Promise<any> {
    const res = await client.get(`/${resource}/year/${year}`)
    return { data: res.data }
  },

  async remove(id: number): Promise<AxiosResponse<any>> {
    return await client.delete(`/${resource}/${id}`)
  },

  update(id: number, dto: ArchiveUpdateDto): Promise<AxiosResponse<any>> {
    return client.put(`${resource}/${id}`, dto)
  }
}
