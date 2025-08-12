"use client"
import { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

   const signup = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    document.cookie = `user=${JSON.stringify(userData)}; path=/` 
  }

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
    document.cookie = `user=${JSON.stringify(userData)}; path=/` 
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    document.cookie = "user=; path=/; max-age=0"
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
