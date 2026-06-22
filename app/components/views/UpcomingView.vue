<!-- components/views/UpcomingView.vue -->
<template>
  <div class="view-section">
    <div class="view-header">
      <h2>Upcoming Reminders</h2>
      <span class="view-count">{{ reminders.length }} reminders</span>
    </div>
    
    <div class="reminders-grid">
      <div 
        v-for="reminder in reminders" 
        :key="reminder._id"
        class="reminder-card"
        :class="{
          'priority-high': reminder.priority === 'high',
          'priority-medium': reminder.priority === 'medium',
          'completed': reminder.completed
        }"
      >
        <div class="card-left">
          <label class="checkbox-container">
            <input 
              type="checkbox" 
              :checked="reminder.completed"
              @change="$emit('toggle', reminder._id)"
            />
            <span class="checkmark"></span>
          </label>
          
          <div class="card-content">
            <div class="card-title">{{ reminder.title }}</div>
            
            <div class="card-meta">
              <!-- Date -->
              <span class="meta-date">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 16H8M11 16H13M16 16H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.7157 20.2843 5.40974 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.7157 5.40974 3.40974 5.7157 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40974 20.2843 3.7157 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                {{ formatDate(reminder.datetime) }}
              </span>
              
              <!-- Time -->
              <span class="meta-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                {{ formatTime(reminder.datetime) }}
              </span>
              
              <!-- Priority Badge -->
              <span class="meta-badge priority" :class="reminder.priority">
                {{ reminder.priority }}
              </span>
              
              <!-- Notification Mode Badge -->
              <span class="meta-badge" :class="reminder.notificationMode">
                {{ getNotificationIcon(reminder.notificationMode) }} {{ getNotificationLabel(reminder.notificationMode) }}
              </span>
              
              <!-- SMS Status Badge -->
              <span 
                v-if="hasSmsCapability(reminder)" 
                class="meta-badge sms-status"
                :class="{ 'sent': reminder.notified }"
              >
                {{ reminder.notified ? '📱 Sent' : '📱 Pending' }}
              </span>
            </div>
            
            <!-- Contact Info -->
            <div class="card-contact" v-if="reminder.email || reminder.phone">
              <span v-if="reminder.email" class="contact-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 6L12 13L2 6M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                {{ reminder.email }}
              </span>
              <span v-if="reminder.phone" class="contact-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V19C22.001 19.7906 21.786 20.5663 21.381 21.2395C20.976 21.9127 20.398 22.4532 19.716 22.795C19.034 23.1368 18.2765 23.2662 17.53 23.1694C16.7836 23.0726 16.0828 22.7537 15.51 22.25C13.2192 20.2733 11.203 17.9983 9.53 15.5C9.02078 14.7257 8.6592 13.8593 8.465 12.947C8.2708 12.0347 8.24807 11.0936 8.398 10.172C8.54793 9.25041 8.86684 8.36288 9.333 7.55999C9.79916 6.7571 10.4028 6.05473 11.11 5.49" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                {{ reminder.phone }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="card-actions">
          <!-- Send SMS Button -->
          <button 
            v-if="hasSmsCapability(reminder) && !reminder.notified"
            @click="$emit('send-sms', reminder._id)" 
            class="action-btn sms-btn" 
            title="Send SMS Notification"
            :disabled="sendingSms"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <!-- Edit Button -->
          <button @click="$emit('edit', reminder)" class="action-btn edit-btn" title="Edit Reminder">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <!-- Delete Button -->
          <button @click="$emit('delete', reminder._id)" class="action-btn delete-btn" title="Delete Reminder">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H20M10 11V16M14 11V16M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="reminders.length === 0" class="empty-state">
        <div class="empty-icon">✨</div>
        <h3>All caught up!</h3>
        <p>No upcoming reminders scheduled</p>
        <button @click="$emit('refresh')" class="refresh-btn">Refresh</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  reminders: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  sendingSms: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['refresh', 'edit', 'delete', 'toggle', 'send-sms'])

/**
 * Format time to 12-hour format
 */
const formatTime = (datetime) => {
  return new Date(datetime).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
}

/**
 * Format date to relative or short format
 */
const formatDate = (datetime) => {
  const date = new Date(datetime)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

/**
 * Get notification icon based on mode
 */
const getNotificationIcon = (mode) => {
  const icons = { 
    email: '📧', 
    sms: '📱', 
    both: '💌', 
    browser: '🔔' 
  }
  return icons[mode] || '🔔'
}

/**
 * Get notification label based on mode
 */
const getNotificationLabel = (mode) => {
  const labels = { 
    email: 'Email', 
    sms: 'SMS', 
    both: 'Both', 
    browser: 'Browser' 
  }
  return labels[mode] || 'Browser'
}

/**
 * Check if reminder has SMS capability
 */
const hasSmsCapability = (reminder) => {
  return reminder && 
         reminder.phone && 
         (reminder.notificationMode === 'sms' || reminder.notificationMode === 'both')
}
</script>

<style scoped>
.view-section {
  margin-top: 8px;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 12px;
}

.view-header h2 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: #1E293B;
}

.view-count {
  font-size: 13px;
  color: #64748B;
  background: white;
  padding: 4px 14px;
  border-radius: 20px;
  border: 1px solid #E2E8F0;
}

.reminders-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Reminder Card */
.reminder-card {
  background: white;
  border-radius: 14px;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  border: 1px solid #E2E8F0;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.reminder-card:hover {
  border-color: #CBD5E1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.reminder-card.priority-high {
  border-left: 4px solid #EF4444;
}

.reminder-card.priority-medium {
  border-left: 4px solid #F59E0B;
}

.reminder-card.completed {
  opacity: 0.6;
}

.reminder-card.completed .card-title {
  text-decoration: line-through;
}

/* Card Left Section */
.card-left {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex: 1;
  min-width: 0;
}

/* Custom Checkbox */
.checkbox-container {
  position: relative;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #CBD5E1;
  border-radius: 6px;
  display: inline-block;
  transition: all 0.2s;
}

.checkbox-container input:checked + .checkmark {
  background: #3B82F6;
  border-color: #3B82F6;
}

.checkbox-container input:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Card Content */
.card-content {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 15px;
  font-weight: 500;
  color: #1E293B;
  margin-bottom: 4px;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #64748B;
}

.meta-time,
.meta-date {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #94A3B8;
}

.meta-time svg,
.meta-date svg {
  color: #94A3B8;
}

/* Badges */
.meta-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
}

/* Notification Mode Badges */
.meta-badge.browser {
  background: #F1F5F9;
  color: #475569;
}

.meta-badge.email {
  background: #EFF6FF;
  color: #2563EB;
}

.meta-badge.sms {
  background: #FEF2F2;
  color: #DC2626;
}

.meta-badge.both {
  background: #F3E8FF;
  color: #9333EA;
}

/* Priority Badges */
.meta-badge.priority {
  text-transform: capitalize;
}

.meta-badge.priority.high {
  background: #FEF2F2;
  color: #EF4444;
}

.meta-badge.priority.medium {
  background: #FFFBEB;
  color: #F59E0B;
}

.meta-badge.priority.low {
  background: #F0FDF4;
  color: #10B981;
}

/* SMS Status Badge */
.sms-status {
  background: #EFF6FF;
  color: #3B82F6;
}

.sms-status.sent {
  background: #D1FAE5;
  color: #059669;
}

/* Contact Info */
.card-contact {
  display: flex;
  gap: 12px;
  margin-top: 4px;
  font-size: 11px;
  color: #94A3B8;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Card Actions */
.card-actions {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.action-btn {
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
  transition: all 0.2s;
}

.action-btn:hover:not(:disabled) {
  background: #F1F5F9;
}

.edit-btn:hover:not(:disabled) {
  color: #3B82F6;
}

.delete-btn:hover:not(:disabled) {
  background: #FEF2F2;
  color: #EF4444;
}

/* SMS Button */
.sms-btn {
  color: #3B82F6;
}

.sms-btn:hover:not(:disabled) {
  background: #EFF6FF;
  color: #2563EB;
}

.sms-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 20px;
  border: 1px solid #E2E8F0;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state h3 {
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 8px;
  color: #1E293B;
}

.empty-state p {
  color: #64748B;
  margin: 0 0 16px;
}

.refresh-btn {
  padding: 8px 20px;
  background: #3B82F6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.refresh-btn:hover {
  background: #2563EB;
}

/* Responsive */
@media (max-width: 768px) {
  .reminder-card {
    flex-wrap: wrap;
    padding: 12px 14px;
  }
  
  .card-actions {
    margin-left: auto;
    margin-top: 4px;
  }
  
  .card-meta {
    gap: 6px;
  }
  
  .meta-badge {
    font-size: 10px;
    padding: 1px 8px;
  }
}

@media (max-width: 480px) {
  .view-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .reminder-card {
    padding: 10px 12px;
  }
  
  .card-title {
    font-size: 14px;
  }
  
  .card-meta {
    font-size: 11px;
  }
}
</style>