import axios from "axios"

const instance = axios.create({ baseURL: process.env.VUE_APP_PROXY_URL })

instance.interceptors.request.use(conf => {
  conf.headers["Client-ID"] = process.env.VUE_APP_CLIENT_ID
  conf.headers["Authorization"] = `Bearer ${process.env.VUE_APP_ACCESS_TOKEN}`
  return conf
})

export default instance
