import axios from 'axios'

const api = axios.create({
  baseURL: `${process.env.API_URL}:${process.env.API_PORT}`
})

export default api
