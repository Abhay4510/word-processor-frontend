import { createContext, useEffect, useState, type ReactNode } from "react"
import type { AuthContextType, AuthState, User } from "../types/auth"
import { jwtDecode } from "jwt-decode";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,
  error: null,
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () => {},
  logout: () => {},
})

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, setState] = useState<AuthState>(initialState)

  useEffect(() => {
    const localToken = localStorage.getItem("token")
    if (localToken) {
      try {
        const decoded = jwtDecode<User & { exp: number }>(localToken)
        const currentTime = Date.now() / 1000

        if (decoded.exp < currentTime) {
          // Token expired
          localStorage.removeItem("token")
          setState({ ...initialState, loading: false })
        } else {
          setState({
            isAuthenticated: true,
            user: { _id: decoded._id, role: decoded.role },
            token: localToken,
            loading: false,
            error: null,
          })
        }
      } catch {
        localStorage.removeItem("token")
        setState({ ...initialState, loading: false })
      }
    } else {
      setState({ ...initialState, loading: false })
    }

    const urlParams = new URLSearchParams(window.location.search)
    const tokenParam = urlParams.get("token")
    if (tokenParam) {
      login(tokenParam)
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  const login = (token: string) => {
    localStorage.setItem("token", token)
    try {
      const decoded = jwtDecode<User & { exp: number }>(token)
      setState({
        isAuthenticated: true,
        user: { _id: decoded._id, role: decoded.role },
        token,
        loading: false,
        error: null,
      })
    } catch {
      setState((prev) => ({ ...prev, error: "Invalid token" }))
    }
  }

  const logout = () => {
    localStorage.removeItem("token")

    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    setState({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null,
    })
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}