import client from "./baseClient"
import { AxiosResponse } from "axios"

const resource = "games"

export default {
  async search(val: string): Promise<AxiosResponse<any>> {
    return await client.post(
      `/${resource}`,
      `fields name, cover.url, url, first_release_date;
      search "${val}";`,
      { headers: { "content-type": "text/plain" } }
    )
  },
  async recentReleases(): Promise<AxiosResponse<any>> {
    const date = new Date(new Date().setMonth(new Date().getMonth() + 0))
    const timeStamp = Math.floor(date.getTime() / 1000)

    return await client.post(
      `/${resource}`,
      `
      fields name, cover.url, url, first_release_date;
      where platforms = 130 & first_release_date > 1538129354 & first_release_date < ${timeStamp} & cover.url != null;
      sort first_release_date desc;
      limit 25;
      `,
      { headers: { "content-type": "text/plain" } }
    )
  },
  async listByIds(ids: number[]): Promise<object[]> {
    if (ids.length === 0) {
      return []
    }

    let res = await client.post(
      `/${resource}`,
      `fields name, cover.url, url, first_release_date;
      where id = (${ids.join(",")});
      limit 50;`,
      { headers: { "content-type": "text/plain" } }
    )

    return res.data
  }
}
