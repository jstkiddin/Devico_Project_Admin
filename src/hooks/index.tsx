import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

interface AuthResponse {
  accessToken: string
  id: string
  email?: string
}

const host = 'http://localhost:8000/api'

const api = axios.create({
  withCredentials: true,
  baseURL: host,
})

api.interceptors.request.use(config => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

const refreshAuthLogic = failedRequest =>
  api.post<AuthResponse>('/auth/refresh', { withCredentials: true }).then(tokenRefreshResponse => {
    localStorage.setItem('token', tokenRefreshResponse.data.accessToken)
    failedRequest.response.config.headers['Authorization'] =
      'Bearer ' + tokenRefreshResponse.data.accessToken
    return Promise.resolve()
  })

createAuthRefreshInterceptor(axios, refreshAuthLogic)

export default api
