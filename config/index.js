/**
 * Application configuration
 */

export { default as axiosClient } from './axios'

// API base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// API endpoints for axios
export const API_PATHS = {
  USERS: '/users',
  USER_BY_EMAIL: email => `/users?email=${encodeURIComponent(email)}`,
  NOTES: userId => `/users/${userId}/notes`,
  NOTE: (userId, noteId) => `/users/${userId}/notes/${noteId}`,
}

// For backward compatibility
export const ENDPOINTS = {
  USERS: `${API_BASE_URL}/users`,
  NOTES: userId => `${API_BASE_URL}/users/${userId}/notes`,
  NOTE: (userId, noteId) => `${API_BASE_URL}/users/${userId}/notes/${noteId}`,
}

// Other configuration settings can be added here
export const APP_CONFIG = {
  AUTH_TIMEOUT: 1500,
}
