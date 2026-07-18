import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
const STORAGE_KEY = 'knowledgehub_auth'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEY)
  if (token) {
    try {
      const parsed = JSON.parse(token) as { token: string }
      const headers = config.headers as Record<string, string> | undefined
      config.headers = {
        ...headers,
        Authorization: `Bearer ${parsed.token}`,
      } as any
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEY)
      const isAuthPage = ['/login', '/register'].includes(window.location.pathname)
      if (!isAuthPage) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
