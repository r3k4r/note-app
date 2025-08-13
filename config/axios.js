import axios from 'axios'
import Cookies from 'js-cookie'

// Create a simple axios instance
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a response interceptor to handle auth errors
axiosClient.interceptors.response.use(
  response => response, // Return successful responses as-is
  error => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear auth cookie
      Cookies.remove('id', { path: '/' })
      
      // Show notification
      toast.error('Your session has expired. Please log in again.')
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)
    }
    
    // Reject the promise for all errors so they can still be handled locally if needed
    return Promise.reject(error)
  }
)

export default axiosClient
