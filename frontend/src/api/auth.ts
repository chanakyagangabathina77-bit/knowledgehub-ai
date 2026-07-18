import { apiClient } from './client'
import type { AuthResponse, UserCredentials, UserRegistration } from '../types/auth'

export const register = async (data: UserRegistration) => {
  const response = await apiClient.post('/auth/register', data)
  return response.data.data as AuthResponse
}

export const login = async (data: UserCredentials) => {
  const response = await apiClient.post('/auth/login', data)
  return response.data.data as AuthResponse
}

export const fetchProfile = async () => {
  const response = await apiClient.get('/auth/profile')
  return response.data.data
}
