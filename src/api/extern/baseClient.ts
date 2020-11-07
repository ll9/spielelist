import axios from "axios"
import { getAuthToken } from "./authTokenStore"

const instance = axios.create({ baseURL: process.env.VUE_APP_PROXY_URL })

instance.interceptors.request.use(async conf => {
  let token = await getAuthToken()
  conf.headers["Client-ID"] = process.env.VUE_APP_CLIENT_ID
  conf.headers["Authorization"] = `Bearer ${token}`
  return conf
})

export default instance
