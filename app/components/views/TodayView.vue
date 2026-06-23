<!-- app/components/views/TodayView.vue -->
<template>
  <div class="view-section">
    <div class="view-header">
      <h2>Today's Schedule</h2>
      <div class="progress-container">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: dayProgress + '%' }"></div>
        </div>
        <span class="progress-text">{{ dayProgress }}%</span>
      </div>
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
              <span class="meta-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                {{ formatTime(reminder.datetime) }}
              </span>
              <span class="meta-badge" :class="reminder.notificationMode">
                {{ getNotificationIcon(reminder.notificationMode) }} {{ getNotificationLabel(reminder.notificationMode) }}
              </span>
              <span 
                v-if="hasSmsCapability(reminder)" 
                class="meta-badge sms-status"
                :class="{ 'sent': reminder.notified }"
              >
                {{ reminder.notified ? '📱 Sent' : '📱 Pending' }}
              </span>
            </div>
            <div class="card-contact" v-if="reminder.email || reminder.phone">
              <span v-if="reminder.phone" class="contact-item">
                📱 {{ reminder.phone }}
              </span>
              <span v-if="reminder.email" class="contact-item">
                📧 {{ reminder.email }}
              </span>
            </div>
          </div>
        </div>
        <div class="card-actions">
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
          <button @click="$emit('edit', reminder)" class="action-btn edit-btn" title="Edit">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button @click="$emit('delete', reminder._id)" class="action-btn delete-btn" title="Delete">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H20M10 11V16M14 11V16M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div v-if="reminders.length === 0" class="empty-state">
        <div class="empty-icon">🎯</div>
        <h3>No reminders for today</h3>
        <p>Add a new reminder to stay on track</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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

const dayProgress = computed(() => {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  const progress = ((now - start) / (end - start)) * 100
  return Math.min(Math.floor(progress), 100)
})

const formatTime = (datetime) => {
  return new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const getNotificationIcon = (mode) => {
  const icons = { email: '📧', sms: '📱', both: '💌', browser: '🔔' }
  return icons[mode] || '🔔'
}

const getNotificationLabel = (mode) => {
  const labels = { email: 'Email', sms: 'SMS', both: 'Both', browser: 'Browser' }
  return labels[mode] || 'Browser'
}

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
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  width: 140px;
  height: 6px;
  background: #E2E8F0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3B82F6, #6366F1);
  border-radius: 3px;
  transition: width 0.6s ease;
}

.progress-text {
  font-size: 13px;
  font-weight: 600;
  color: #3B82F6;
}

.reminders-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

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
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
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

.card-left {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  flex: 1;
  min-width: 0;
}

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
  gap: 12px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #64748B;
}

.meta-time {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #94A3B8;
}

.meta-time svg {
  color: #94A3B8;
}

.meta-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
}

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

.sms-status {
  background: #EFF6FF;
  color: #3B82F6;
}

.sms-status.sent {
  background: #D1FAE5;
  color: #059669;
}

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
}

.empty-state p {
  color: #64748B;
  margin: 0;
}
</style>