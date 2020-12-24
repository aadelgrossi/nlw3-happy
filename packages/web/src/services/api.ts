import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
})

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({
      statusCode: error.response.status,
      data: error.response.data
    })
  }
)

export default api
