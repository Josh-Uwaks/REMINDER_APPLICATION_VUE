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
  const sendingEmail = ref(false)
  const error = ref(null)

  const fetchReminders = async (filter = null) => {
    const cacheKey = filter || 'all'
    
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

  const refreshReminders = async (filter = null) => {
    const cacheKey = filter || 'all'
    delete cache.reminders[cacheKey]
    delete cache.timestamp[cacheKey]
    return await fetchReminders(filter)
  }

  const createReminder = async (reminderData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiClient.post('/reminders', reminderData)
      
      cache.reminders = {}
      cache.timestamp = {}
      
      reminders.value.push(response.data.data)
      
      const smsSent = response.data.smsScheduled || false
      const emailSent = response.data.emailScheduled || false
      
      return { 
        success: true, 
        data: response.data.data,
        smsSent: smsSent,
        emailSent: emailSent,
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

  // Send SMS notification
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

  // ⭐ NEW: Send Email notification
  const sendEmailNotification = async (id) => {
    sendingEmail.value = true
    error.value = null
    
    try {
      const response = await apiClient.post(`/reminders/${id}/send-email`)
      
      const index = reminders.value.findIndex(r => r._id === id)
      if (index !== -1) {
        reminders.value[index] = {
          ...reminders.value[index],
          emailSent: true
        }
      }
      
      return { 
        success: true, 
        message: 'Email sent successfully',
        data: response.data.data
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to send email notification'
      return { 
        success: false, 
        error: error.value,
        code: err.response?.data?.code
      }
    } finally {
      sendingEmail.value = false
    }
  }

  // Check if reminder has SMS capability
  const hasSmsCapability = (reminder) => {
    return reminder && 
           reminder.phone && 
           (reminder.notificationMode === 'sms' || reminder.notificationMode === 'both')
  }

  // ⭐ NEW: Check if reminder has Email capability
  const hasEmailCapability = (reminder) => {
    return reminder && 
           reminder.email && 
           (reminder.notificationMode === 'email' || reminder.notificationMode === 'both')
  }

  // Check if SMS was sent
  const isSmsSent = (reminder) => {
    return reminder && reminder.notified === true
  }

  // ⭐ NEW: Check if Email was sent
  const isEmailSent = (reminder) => {
    return reminder && reminder.emailSent === true
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
    sendingEmail,
    error,
    fetchReminders,
    refreshReminders,
    createReminder,
    updateReminder,
    deleteReminder,
    toggleComplete,
    sendSmsNotification,
    sendEmailNotification,
    hasSmsCapability,
    hasEmailCapability,
    isSmsSent,
    isEmailSent,
    clearCache,
  }
}