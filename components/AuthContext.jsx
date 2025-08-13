'use client'
import { createContext, useState, useEffect, useContext } from 'react'
import { axiosClient, API_PATHS } from '@/config'
import Cookies from 'js-cookie'

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
    }
  }

  // Load user data on app start
  useEffect(() => {
    const userId = Cookies.get('id')
    if (userId) {
      fetchUserData(userId)
    }
  }, [])

  // Set ID in cookies
  const setAuthData = userId => {
    Cookies.set('id', userId, { path: '/' })
  }

  // Remove ID from cookies
  const removeAuthData = () => {
    Cookies.remove('id', { path: '/' })
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
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)


