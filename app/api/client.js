// app/api/client.js
import axios from 'axios'

// Get the API base URL based on environment
const getBaseURL = () => {
  // Check if we're in development or production
  if (process.env.NODE_ENV === 'production') {
    return process.env.API_BASE_URL
  }
  // Development fallbacks
  return process.env.API_BASE_URL_LOCAL
}

const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000,
  withCredentials: true, // Important for cookies/sessions
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log('📤 Request:', config.method.toUpperCase(), config.url)
    console.log('📦 Request data:', config.data)
    
    // Only access localStorage on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
        console.log('🔑 Token attached')
      }
    }
    return config
  },
  (error) => {
    console.error('❌ Request error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.data)
    return response
  },
  (error) => {
    console.error('❌ Response error:', error.response?.status, error.response?.data)
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
    // If the response is HTML instead of JSON, it's likely a server error
    if (error.response?.data && typeof error.response.data === 'string' && error.response.data.includes('<!DOCTYPE')) {
      console.error('Received HTML instead of JSON - server may be misconfigured')
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            message: 'Server error - please check the API configuration',
            status: error.response.status
          }
        }
      })
    }
    
    return Promise.reject(error)
  }
)

export default apiClient