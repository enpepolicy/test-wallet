import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_CONVERSION_RATE_API,
  headers: { Accept: 'application/json' }
})

export { axiosInstance }
