// app/composables/useReminders.js
import { ref } from 'vue'
import apiClient from '~/api/client'

// Cache for different views
const cache = {
  reminders: {},
  timestamp: {}
}

const CACHE_TTL = 60000 // 60 seconds cache TTL

export const useReminders = () => {
  const reminders = ref([])
  const loading = ref(false)
  const sendingSms = ref(false)
  const error = ref(null)

  const fetchReminders = async (filter = null) => {
    // Create cache key
    const cacheKey = filter || 'all'
    
    // Check if we have cached data that's still fresh
    const now = Date.now()
    if (cache.reminders[cacheKey] && cache.timestamp[cacheKey] && 
        (now - cache.timestamp[cacheKey]) < CACHE_TTL) {
      console.log(`🔄 Using cached data for filter: ${cacheKey}`)
      reminders.value = cache.reminders[cacheKey]
      return { success: true, data: reminders.value, cached: true }
    }
    
    loading.value = true
    error.value = null
    
    try {
      const url = filter ? `/reminders?filter=${filter}` : '/reminders'
      const response = await apiClient.get(url)
      
      // Store in cache
      cache.reminders[cacheKey] = response.data.data
      cache.timestamp[cacheKey] = Date.now()
      
      reminders.value = response.data.data
      return { success: true, data: reminders.value, cached: false }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch reminders'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  // Force refresh (bypass cache)
  const refreshReminders = async (filter = null) => {
    const cacheKey = filter || 'all'
    // Invalidate cache
    delete cache.reminders[cacheKey]
    delete cache.timestamp[cacheKey]
    
    return await fetchReminders(filter)
  }

  const createReminder = async (reminderData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiClient.post('/reminders', reminderData)
      
      // Invalidate all caches since data changed
      cache.reminders = {}
      cache.timestamp = {}
      
      reminders.value.push(response.data.data)
      
      const smsSent = response.data.smsSent || false
      
      return { 
        success: true, 
        data: response.data.data,
        smsSent: smsSent,
        message: response.data.message
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create reminder'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateReminder = async (id, reminderData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiClient.put(`/reminders/${id}`, reminderData)
      
      // Invalidate all caches since data changed
      cache.reminders = {}
      cache.timestamp = {}
      
      const index = reminders.value.findIndex(r => r._id === id)
      if (index !== -1) {
        reminders.value[index] = response.data.data
      }
      return { success: true, data: response.data.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update reminder'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const deleteReminder = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      await apiClient.delete(`/reminders/${id}`)
      
      // Invalidate all caches since data changed
      cache.reminders = {}
      cache.timestamp = {}
      
      reminders.value = reminders.value.filter(r => r._id !== id)
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete reminder'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const toggleComplete = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiClient.patch(`/reminders/${id}/toggle`)
      
      // Invalidate all caches since data changed
      cache.reminders = {}
      cache.timestamp = {}
      
      const index = reminders.value.findIndex(r => r._id === id)
      if (index !== -1) {
        reminders.value[index] = response.data.data
      }
      return { success: true, data: response.data.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to toggle reminder'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const sendSmsNotification = async (id) => {
    sendingSms.value = true
    error.value = null
    
    try {
      const response = await apiClient.post(`/reminders/${id}/send-sms`)
      
      const index = reminders.value.findIndex(r => r._id === id)
      if (index !== -1) {
        reminders.value[index] = {
          ...reminders.value[index],
          notified: true
        }
      }
      
      return { 
        success: true, 
        message: 'SMS sent successfully',
        data: response.data.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to send SMS notification'
      return { 
        success: false, 
        error: error.value,
        code: err.response?.data?.code
      }
    } finally {
      sendingSms.value = false
    }
  }

  const hasSmsCapability = (reminder) => {
    return reminder && 
           reminder.phone && 
           (reminder.notificationMode === 'sms' || reminder.notificationMode === 'both')
  }

  const isSmsSent = (reminder) => {
    return reminder && reminder.notified === true
  }

  // Clear all cache
  const clearCache = () => {
    cache.reminders = {}
    cache.timestamp = {}
  }

  return {
    reminders,
    loading,
    sendingSms,
    error,
    fetchReminders,
    refreshReminders,
    createReminder,
    updateReminder,
    deleteReminder,
    toggleComplete,
    sendSmsNotification,
    hasSmsCapability,
    isSmsSent,
    clearCache,
  }
}