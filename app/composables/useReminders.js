// app/composables/useReminders.js
import { ref } from 'vue'
import apiClient from '~/api/client'

export const useReminders = () => {
  const reminders = ref([])
  const loading = ref(false)
  const sendingSms = ref(false)
  const error = ref(null)

  const fetchReminders = async (filter = null) => {
    loading.value = true
    error.value = null
    
    try {
      const url = filter ? `/reminders?filter=${filter}` : '/reminders'
      const response = await apiClient.get(url)
      reminders.value = response.data.data
      return { success: true, data: reminders.value }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch reminders'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const createReminder = async (reminderData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await apiClient.post('/reminders', reminderData)
      reminders.value.push(response.data.data)
      
      // Check if SMS was sent
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

  // @desc    Send SMS notification for a reminder
  // @route   POST /api/reminders/:id/send-sms
  const sendSmsNotification = async (id) => {
    sendingSms.value = true
    error.value = null
    
    try {
      const response = await apiClient.post(`/reminders/${id}/send-sms`)
      
      // Update the reminder's notified status
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

  // @desc    Check if a reminder has SMS capability
  const hasSmsCapability = (reminder) => {
    return reminder && 
           reminder.phone && 
           (reminder.notificationMode === 'sms' || reminder.notificationMode === 'both')
  }

  // @desc    Check if SMS was sent for a reminder
  const isSmsSent = (reminder) => {
    return reminder && reminder.notified === true
  }

  return {
    reminders,
    loading,
    sendingSms,
    error,
    fetchReminders,
    createReminder,
    updateReminder,
    deleteReminder,
    toggleComplete,
    sendSmsNotification,
    hasSmsCapability,
    isSmsSent,
  }
}