export type UserRegistration = {
  name: string
  email: string
  password: string
}

export type UserCredentials = {
  email: string
  password: string
}

export type AuthResponse = {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export type AuthContextValue = {
  user: AuthResponse['user'] | null
  token: string | null
  isAuthenticated: boolean
  login: (credentials: UserCredentials) => Promise<void>
  register: (data: UserRegistration) => Promise<void>
  logout: () => void
}
