import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { login as loginApi, register as registerApi } from '../api/auth'
import type { AuthContextValue, UserCredentials, UserRegistration } from '../types/auth'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'knowledgehub_auth'

type StoredAuth = {
  token: string
  user: { id: string; name: string; email: string }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<StoredAuth | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setAuth(JSON.parse(stored))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const setStoredAuth = (value: StoredAuth | null) => {
    setAuth(value)
    if (value) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const login = async (credentials: UserCredentials) => {
    const response = await loginApi(credentials)
    setStoredAuth(response)
    toast.success('Logged in successfully')
    navigate('/dashboard')
  }

  const register = async (data: UserRegistration) => {
    const response = await registerApi(data)
    setStoredAuth(response)
    toast.success('Account created successfully')
    navigate('/dashboard')
  }

  const logout = () => {
    setStoredAuth(null)
    toast('You are logged out')
    navigate('/login')
  }

  const value = useMemo<AuthContextValue>(() => ({
    user: auth?.user ?? null,
    token: auth?.token ?? null,
    isAuthenticated: Boolean(auth?.token),
    login,
    register,
    logout,
  }), [auth])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
