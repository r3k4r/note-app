/**
 * Application configuration
 */

// API base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

// API endpoints
export const ENDPOINTS = {
  USERS: `${API_BASE_URL}/users`,
  NOTES: (userId) => `${API_BASE_URL}/users/${userId}/notes`,
  NOTE: (userId, noteId) => `${API_BASE_URL}/users/${userId}/notes/${noteId}`,
};

// Other configuration settings can be added here
export const APP_CONFIG = {
  AUTH_TIMEOUT: 1500, // Milliseconds to wait before redirecting after auth actions
};
