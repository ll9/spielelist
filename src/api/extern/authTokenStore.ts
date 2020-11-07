import axios from "axios"

let authToken: string | null = null

export const getAuthToken = async () => {
  if (authToken !== null) {
    return Promise.resolve(authToken)
  }

  const tokenRes = await axios.get(`${process.env.VUE_APP_SERVER_URL}/token/refresh`)
  authToken = tokenRes.data
  return authToken!
}
