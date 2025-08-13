'use client'
import { createContext, useState, useEffect, useContext } from 'react'
import { axiosClient, API_PATHS } from '@/config'
import { toast } from 'sonner'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Fetch user data using the stored ID, so we always get the latest user info
  const fetchUserData = async userId => {
    try {
      const response = await axiosClient.get(`${API_PATHS.USERS}/${userId}`)
      setUser(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error)

      // If status is 4xx, user is not authorized or doesn't exist
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        removeAuthData()
        toast.error('Session expired. Please login again.')
      }
    }
  }

  // Load user data on app start
  useEffect(() => {
    const getCookie = name => {
      const cookies = document.cookie.split(';')
      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=')
        if (cookieName === name) {
          return cookieValue
        }
      }
      return null
    }

    const userId = getCookie('id')
    fetchUserData(userId)
  }, [])

  // Set ID in cookies
  const setAuthData = userId => {
    document.cookie = `id=${userId}; path=/`
  }

  // Remove ID from cookies
  const removeAuthData = () => {
    document.cookie = 'id=; path=/; max-age=0'
    setUser(null)
  }

  const signup = userData => {
    // Store only user ID in cookies
    setAuthData(userData.id)
    setUser(userData)
  }

  const login = userData => {
    // Store only user ID in cookies
    setAuthData(userData.id)
    setUser(userData)
  }

  const logout = () => {
    removeAuthData()
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
