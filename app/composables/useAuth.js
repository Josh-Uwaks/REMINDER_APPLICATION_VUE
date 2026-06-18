// app/composables/useAuth.js
import { ref } from 'vue'
import apiClient from '~/api/client'

export const useAuth = () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const login = async (email, password) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiClient.post('/auth/login', { email, password })
      const { token, ...userInfo } = response.data.data
      
      if (process.client) {
        localStorage.setItem('auth_token', token)
        localStorage.setItem('user', JSON.stringify(userInfo))
      }
      user.value = userInfo
      
      return { success: true, data: userInfo }
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    
    try {
      await apiClient.post('/auth/logout')
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      if (process.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user')
      }
      user.value = null
      loading.value = false
      navigateTo('/login')  // Changed from '/dashboard' to '/login'
    }
  }

  const checkAuth = () => {
    if (process.client) {
      const token = localStorage.getItem('auth_token')
      const storedUser = localStorage.getItem('user')
      
      if (token && storedUser) {
        user.value = JSON.parse(storedUser)
        return true
      }
    }
    return false
  }

  const getUser = () => {
    if (process.client) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        return JSON.parse(storedUser)
      }
    }
    return null
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
    getUser,
  }
}