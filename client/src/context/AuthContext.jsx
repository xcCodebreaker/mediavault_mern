import { createContext, useContext, useState } from "react"
import { apiRequest } from "../api/client.js"

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("mediavault_user")
      if (storedUser) {
        return JSON.parse(storedUser)
      }
    } catch {
      // Ignore parsing errors
    }
    return null
  })

  async function login(email, password) {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    localStorage.setItem("mediavault_token", response.token)
    localStorage.setItem("mediavault_user", JSON.stringify(response.user))
    setUser(response.user)
  }

  async function signup(name, email, password) {
    const response = await apiRequest("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    })
    localStorage.setItem("mediavault_token", response.token)
    localStorage.setItem("mediavault_user", JSON.stringify(response.user))
    setUser(response.user)
  }

  function logout() {
    localStorage.removeItem("mediavault_token")
    localStorage.removeItem("mediavault_user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}