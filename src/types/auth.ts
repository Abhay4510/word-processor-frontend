export interface User {
  _id: string
  name?: string
  email?: string
  role: "user" | "admin"
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
  loading: boolean
  error: string | null
}

export interface AuthContextType extends AuthState {
  login: (token: string) => void
  logout: () => void
}