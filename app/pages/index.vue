<!-- app/pages/dashboard.vue -->
<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-inner">
        <div class="logo">
          <div class="logo-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <h2>Remind<span>Me</span></h2>
        </div>
        
        <div class="user-profile">
          <div class="avatar-wrapper">
            <div class="avatar">
              {{ userInitials }}
            </div>
            <div class="status-dot online"></div>
          </div>
          <div class="user-details">
            <p class="user-name">{{ userName }}</p>
            <p class="user-email">{{ userEmail }}</p>
          </div>
        </div>
        
        <nav class="nav">
          <button 
            v-for="item in navItems" 
            :key="item.view"
            @click="changeView(item.view)" 
            class="nav-btn" 
            :class="{ active: currentView === item.view }"
          >
            <span class="nav-icon" v-html="item.icon"></span>
            <span class="nav-label">{{ item.label }}</span>
            <span v-if="item.badge !== undefined" class="nav-badge">{{ item.badge }}</span>
          </button>
        </nav>
        
        <button @click="handleLogout" class="logout-btn">
          <span class="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
    
    <!-- Main Content -->
    <main class="main">
      <!-- Header -->
      <div class="header">
        <div class="header-left">
          <h1>{{ viewTitle }}</h1>
          <p>{{ viewSubtitle }}</p>
        </div>
        <div class="header-right">
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-value">{{ activeRemindersCount }}</span>
              <span class="stat-label">Active</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{{ completedRemindersCount }}</span>
              <span class="stat-label">Done</span>
            </div>
          </div>
          <button class="header-action" @click="toggleTheme" title="Toggle Theme">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Quick Add -->
      <div class="add-card">
        <div class="add-card-header">
          <div class="add-icon-wrapper">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <h3>Create New Reminder</h3>
        </div>
        
        <div class="add-form">
          <div class="form-row">
            <div class="form-group full-width">
              <input 
                v-model="newTitle" 
                type="text" 
                placeholder="What do you want to remember?"
                @keyup.enter="addReminder"
                class="form-input"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Date & Time</label>
              <input type="datetime-local" v-model="newDateTime" class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">Priority</label>
              <select v-model="newPriority" class="form-select">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Notify via</label>
              <select v-model="newNotificationMode" class="form-select">
                <option value="browser">Browser</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
          
          <div v-if="newNotificationMode === 'email' || newNotificationMode === 'both'" class="form-row">
            <div class="form-group full-width">
              <label class="form-label">Email Address</label>
              <input 
                v-model="newEmail" 
                type="email" 
                placeholder="you@example.com"
                class="form-input"
              />
            </div>
          </div>
          
          <div v-if="newNotificationMode === 'sms' || newNotificationMode === 'both'" class="form-row">
            <div class="form-group full-width">
              <label class="form-label">Phone Number</label>
              <input 
                v-model="newPhone" 
                type="tel" 
                placeholder="+234 803 203 4293"
                class="form-input"
              />
              <small class="form-hint">Format: +234 80X XXX XXXX</small>
            </div>
          </div>
          
          <button @click="addReminder" class="add-btn" :disabled="creatingReminder">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            {{ creatingReminder ? 'Creating...' : 'Create Reminder' }}
          </button>
        </div>
      </div>
      
      <!-- View Content with Keep-Alive -->
      <KeepAlive>
        <component 
          :is="currentViewComponent" 
          :key="currentView"
          :reminders="currentViewReminders"
          :loading="viewLoading"
          :sending-sms="sendingSms"
          @refresh="refreshView"
          @edit="editReminder"
          @delete="deleteReminder"
          @toggle="toggleComplete"
          @send-sms="handleSendSms"
        />
      </KeepAlive>
    </main>
    
    <!-- Edit Modal -->
    <Teleport to="body">
      <div v-if="showEditModal" class="modal-overlay" @click.self="closeEditModal">
        <div class="modal-container">
          <div class="modal-header">
            <h3>Edit Reminder</h3>
            <button @click="closeEditModal" class="modal-close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-field">
              <label>Title</label>
              <input type="text" v-model="editingReminder.title" placeholder="What needs to be done?" />
            </div>
            <div class="modal-field">
              <label>Date & Time</label>
              <input type="datetime-local" v-model="editingReminder.datetime" />
            </div>
            <div class="modal-field">
              <label>Priority</label>
              <select v-model="editingReminder.priority">
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div class="modal-field">
              <label>Notification Mode</label>
              <select v-model="editingReminder.notificationMode">
                <option value="browser">Browser Only</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="both">Email + SMS</option>
              </select>
            </div>
            <div v-if="editingReminder.notificationMode === 'email' || editingReminder.notificationMode === 'both'" class="modal-field">
              <label>Email Address</label>
              <input type="email" v-model="editingReminder.email" placeholder="email@example.com" />
            </div>
            <div v-if="editingReminder.notificationMode === 'sms' || editingReminder.notificationMode === 'both'" class="modal-field">
              <label>Phone Number</label>
              <input type="tel" v-model="editingReminder.phone" placeholder="+234 803 203 4293" />
            </div>
          </div>
          <div class="modal-footer">
            <button @click="closeEditModal" class="btn btn-secondary">Cancel</button>
            <button @click="saveEdit" class="btn btn-primary" :disabled="savingEdit">
              {{ savingEdit ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast Notification -->
    <div v-if="toast.show" class="toast" :class="toast.type">
      <div class="toast-content">
        <span class="toast-icon">{{ toast.icon }}</span>
        <span class="toast-message">{{ toast.message }}</span>
      </div>
      <button @click="toast.show = false" class="toast-close">×</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, shallowRef, defineAsyncComponent } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useReminders } from '~/composables/useReminders'

definePageMeta({
  middleware: 'auth'
})

// Import view components
const TodayView = defineAsyncComponent(() => import('~/components/views/TodayView.vue'))
const UpcomingView = defineAsyncComponent(() => import('~/components/views/UpcomingView.vue'))
const AllView = defineAsyncComponent(() => import('~/components/views/AllView.vue'))

const { getUser, logout } = useAuth()
const { 
  reminders, 
  loading: remindersLoading,
  sendingSms,
  fetchReminders, 
  createReminder, 
  updateReminder, 
  deleteReminder: deleteReminderApi,
  toggleComplete: toggleCompleteApi,
  sendSmsNotification,
  hasSmsCapability,
  isSmsSent
} = useReminders()

// User data
const userName = ref('User')
const userEmail = ref('')
const userInitials = ref('U')

// State
const currentView = ref('upcoming')
const viewLoading = ref(false)
const creatingReminder = ref(false)
const savingEdit = ref(false)
const newTitle = ref('')
const newDateTime = ref('')
const newPriority = ref('medium')
const newNotificationMode = ref('browser')
const newEmail = ref('')
const newPhone = ref('')
const filterType = ref('all')
const showEditModal = ref(false)
const editingReminder = ref(null)

// Toast notification
const toast = ref({
  show: false,
  message: '',
  type: 'success',
  icon: '✅'
})

// Navigation items with computed badges
const navItems = computed(() => {
  const todayCount = todayReminders.value.length
  const upcomingCount = upcomingReminders.value.length
  const allCount = reminders.value.length
  
  return [
    { 
      view: 'upcoming', 
      label: 'Upcoming', 
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`, 
      badge: upcomingCount > 0 ? upcomingCount : undefined 
    },
    { 
      view: 'today', 
      label: 'Today', 
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 16H8M11 16H13M16 16H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.7157 20.2843 5.40974 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.7157 5.40974 3.40974 5.7157 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40974 20.2843 3.7157 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`, 
      badge: todayCount > 0 ? todayCount : undefined 
    },
    { 
      view: 'all', 
      label: 'All', 
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`, 
      badge: allCount > 0 ? allCount : undefined 
    }
  ]
})

// Computed
const todayReminders = computed(() => {
  const today = new Date().toDateString()
  return reminders.value
    .filter(r => new Date(r.datetime).toDateString() === today)
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
})

const upcomingReminders = computed(() => {
  const now = new Date()
  return reminders.value
    .filter(r => !r.completed && new Date(r.datetime) > now)
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
})

const filteredReminders = computed(() => {
  let filtered = reminders.value
  if (filterType.value === 'active') {
    filtered = filtered.filter(r => !r.completed)
  } else if (filterType.value === 'completed') {
    filtered = filtered.filter(r => r.completed)
  }
  return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

const activeRemindersCount = computed(() => {
  return reminders.value.filter(r => !r.completed).length
})

const completedRemindersCount = computed(() => {
  return reminders.value.filter(r => r.completed).length
})

const dayProgress = computed(() => {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  const progress = ((now - start) / (end - start)) * 100
  return Math.min(Math.floor(progress), 100)
})

const viewTitle = computed(() => {
  const titles = { today: 'Today', upcoming: 'Upcoming', all: 'All Reminders' }
  return titles[currentView.value] || 'Dashboard'
})

const viewSubtitle = computed(() => {
  const subtitles = {
    today: 'Your schedule for today',
    upcoming: 'What\'s coming up next',
    all: 'Everything in one place'
  }
  return subtitles[currentView.value] || 'Stay organized, stay productive'
})

// Dynamic component selection
const currentViewComponent = computed(() => {
  const components = {
    today: TodayView,
    upcoming: UpcomingView,
    all: AllView
  }
  return components[currentView.value] || UpcomingView
})

const currentViewReminders = computed(() => {
  const views = {
    today: todayReminders,
    upcoming: upcomingReminders,
    all: filteredReminders
  }
  return views[currentView.value]?.value || []
})

// Toast helper
const showToast = (message, type = 'success', icon = '✅') => {
  toast.value = {
    show: true,
    message,
    type,
    icon
  }
  setTimeout(() => {
    toast.value.show = false
  }, 5000)
}

// Methods
const changeView = async (view) => {
  if (currentView.value === view) return
  
  currentView.value = view
  viewLoading.value = true
  
  try {
    if (view === 'today') {
      await fetchReminders('today')
    } else if (view === 'upcoming') {
      await fetchReminders('upcoming')
    } else {
      await fetchReminders()
    }
  } catch (error) {
    console.error('Error loading view:', error)
  } finally {
    viewLoading.value = false
  }
}

const refreshView = async () => {
  viewLoading.value = true
  try {
    if (currentView.value === 'today') {
      await fetchReminders('today')
    } else if (currentView.value === 'upcoming') {
      await fetchReminders('upcoming')
    } else {
      await fetchReminders()
    }
  } finally {
    viewLoading.value = false
  }
}

const getNotificationIcon = (mode) => {
  const icons = { email: '📧', sms: '📱', both: '💌', browser: '🔔' }
  return icons[mode] || '🔔'
}

const getNotificationLabel = (mode) => {
  const labels = { email: 'Email', sms: 'SMS', both: 'Both', browser: 'Browser' }
  return labels[mode] || 'Browser'
}

const addReminder = async () => {
  if (!newTitle.value.trim() || !newDateTime.value) {
    showToast('Please enter a title and date/time', 'error', '❌')
    return
  }
  
  if ((newNotificationMode.value === 'email' || newNotificationMode.value === 'both') && !newEmail.value) {
    showToast('Please enter an email address for email reminders', 'error', '❌')
    return
  }
  
  if ((newNotificationMode.value === 'sms' || newNotificationMode.value === 'both') && !newPhone.value) {
    showToast('Please enter a phone number for SMS reminders', 'error', '❌')
    return
  }
  
  creatingReminder.value = true
  
  const reminderData = {
    title: newTitle.value,
    datetime: newDateTime.value,
    priority: newPriority.value,
    notificationMode: newNotificationMode.value,
    email: (newNotificationMode.value === 'email' || newNotificationMode.value === 'both') ? newEmail.value : null,
    phone: (newNotificationMode.value === 'sms' || newNotificationMode.value === 'both') ? newPhone.value : null,
  }
  
  const result = await createReminder(reminderData)
  
  if (result.success) {
    newTitle.value = ''
    newDateTime.value = ''
    newPriority.value = 'medium'
    newNotificationMode.value = 'browser'
    newEmail.value = ''
    newPhone.value = ''
    setDefaultDateTime()
    await refreshView()
    
    if (result.smsSent) {
      showToast('✅ Reminder created! SMS notification sent.', 'success', '📱')
    } else {
      showToast('✅ Reminder created successfully!', 'success', '✅')
    }
  } else {
    showToast(result.error || 'Failed to create reminder', 'error', '❌')
  }
  
  creatingReminder.value = false
}

const toggleComplete = async (id) => {
  const result = await toggleCompleteApi(id)
  if (result.success) {
    await refreshView()
  }
}

const deleteReminder = async (id) => {
  if (confirm('Delete this reminder?')) {
    const result = await deleteReminderApi(id)
    if (result.success) {
      await refreshView()
      showToast('Reminder deleted successfully', 'success', '🗑️')
    } else {
      showToast(result.error || 'Failed to delete reminder', 'error', '❌')
    }
  }
}

const handleSendSms = async (id) => {
  const result = await sendSmsNotification(id)
  if (result.success) {
    showToast('📱 SMS sent successfully!', 'success', '📱')
    await refreshView()
  } else {
    showToast(result.error || 'Failed to send SMS', 'error', '❌')
  }
}

const editReminder = (reminder) => {
  const formattedDateTime = new Date(reminder.datetime).toISOString().slice(0, 16)
  editingReminder.value = { 
    ...reminder,
    datetime: formattedDateTime
  }
  showEditModal.value = true
}

const saveEdit = async () => {
  savingEdit.value = true
  const result = await updateReminder(editingReminder.value._id, {
    title: editingReminder.value.title,
    datetime: editingReminder.value.datetime,
    priority: editingReminder.value.priority,
    notificationMode: editingReminder.value.notificationMode,
    email: editingReminder.value.email,
    phone: editingReminder.value.phone,
    completed: editingReminder.value.completed
  })
  
  if (result.success) {
    closeEditModal()
    await refreshView()
    showToast('Reminder updated successfully', 'success', '✅')
  } else {
    showToast(result.error || 'Failed to update reminder', 'error', '❌')
  }
  savingEdit.value = false
}

const closeEditModal = () => {
  showEditModal.value = false
  editingReminder.value = null
}

const formatTime = (datetime) => {
  return new Date(datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const formatDate = (datetime) => {
  const date = new Date(datetime)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
}

const formatFullDate = (datetime) => {
  const date = new Date(datetime)
  return date.toLocaleDateString([], { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

const setDefaultDateTime = () => {
  if (!newDateTime.value) {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(9, 0, 0)
    newDateTime.value = tomorrow.toISOString().slice(0, 16)
  }
}

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
}

const handleLogout = async () => {
  await logout()
}

onMounted(async () => {
  const user = getUser()
  if (user) {
    userName.value = user.name || 'User'
    userEmail.value = user.email || ''
    userInitials.value = user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'
  }
  
  setDefaultDateTime()
  await changeView('upcoming')
  
  if ('Notification' in window) {
    Notification.requestPermission()
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard {
  display: flex;
  min-height: 100vh;
  background: #F1F5F9;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #1E293B;
}

/* ===== Sidebar ===== */
.sidebar {
  width: 280px;
  background: #FFFFFF;
  border-right: 1px solid #E2E8F0;
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.sidebar-inner {
  padding: 32px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.logo h2 {
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.logo h2 span {
  color: #3B82F6;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F8FAFC;
  border-radius: 16px;
  margin-bottom: 32px;
}

.avatar-wrapper {
  position: relative;
}

.avatar {
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, #3B82F6, #6366F1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
}

.status-dot {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
}

.status-dot.online {
  background: #22C55E;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-weight: 600;
  color: #1E293B;
  margin: 0;
  font-size: 14px;
}

.user-email {
  font-size: 12px;
  color: #64748B;
  margin: 2px 0 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: transparent;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.nav-icon {
  display: flex;
  align-items: center;
  width: 20px;
  flex-shrink: 0;
}

.nav-btn:hover {
  background: #F1F5F9;
  color: #1E293B;
}

.nav-btn.active {
  background: #EFF6FF;
  color: #3B82F6;
}

.nav-btn.active .nav-icon svg {
  stroke: #3B82F6;
}

.nav-label {
  flex: 1;
  text-align: left;
}

.nav-badge {
  background: #E2E8F0;
  color: #475569;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  min-width: 20px;
  text-align: center;
}

.nav-btn.active .nav-badge {
  background: #3B82F6;
  color: white;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: transparent;
  border: none;
  border-radius: 12px;
  color: #EF4444;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.2s;
  font-weight: 500;
}

.logout-btn:hover {
  background: #FEF2F2;
}

/* ===== Main ===== */
.main {
  flex: 1;
  padding: 32px 40px;
  overflow-y: auto;
  max-height: 100vh;
}

/* ===== Header ===== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-left h1 {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0 0 4px;
}

.header-left p {
  color: #64748B;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-stats {
  display: flex;
  align-items: center;
  background: white;
  padding: 6px 16px;
  border-radius: 12px;
  border: 1px solid #E2E8F0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 12px;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: #1E293B;
}

.stat-label {
  font-size: 11px;
  color: #64748B;
}

.stat-divider {
  width: 1px;
  height: 30px;
  background: #E2E8F0;
}

.header-action {
  width: 40px;
  height: 40px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748B;
  transition: all 0.2s;
}

.header-action:hover {
  background: #F1F5F9;
  border-color: #CBD5E1;
}

/* ===== Add Card ===== */
.add-card {
  background: white;
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid #E2E8F0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.add-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.add-icon-wrapper {
  width: 36px;
  height: 36px;
  background: #EFF6FF;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3B82F6;
}

.add-card-header h3 {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}

.form-row.full-width {
  grid-template-columns: 1fr;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 12px;
  font-weight: 500;
  color: #64748B;
}

.form-hint {
  font-size: 11px;
  color: #94A3B8;
}

.form-input,
.form-select {
  padding: 10px 14px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 14px;
  transition: all 0.2s;
  background: white;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input::placeholder {
  color: #94A3B8;
}

.add-btn {
  padding: 12px;
  background: #1E293B;
  color: white;
  border: none;
  border-radius: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-btn:hover:not(:disabled) {
  background: #0F172A;
}

.add-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ===== Modal ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: white;
  border-radius: 24px;
  width: 90%;
  max-width: 520px;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px) scale(0.98);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #E2E8F0;
}

.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #94A3B8;
  padding: 4px;
  border-radius: 8px;
  transition: background 0.2s;
}

.modal-close:hover {
  background: #F1F5F9;
}

.modal-body {
  padding: 24px;
}

.modal-field {
  margin-bottom: 18px;
}

.modal-field:last-child {
  margin-bottom: 0;
}

.modal-field label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #1E293B;
}

.modal-field input,
.modal-field select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s;
}

.modal-field input:focus,
.modal-field select:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn {
  padding: 10px 24px;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  border: none;
}

.btn-secondary {
  background: #F1F5F9;
  color: #475569;
}

.btn-secondary:hover {
  background: #E2E8F0;
}

.btn-primary {
  background: #1E293B;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #0F172A;
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* ===== Toast Notification ===== */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 16px 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 320px;
  max-width: 480px;
  z-index: 9999;
  animation: slideUpToast 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.toast.success {
  background: #10B981;
  color: white;
}

.toast.error {
  background: #EF4444;
  color: white;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toast-icon {
  font-size: 20px;
}

.toast-message {
  font-size: 14px;
  font-weight: 500;
}

.toast-close {
  background: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  opacity: 0.8;
  padding: 0 4px;
}

.toast-close:hover {
  opacity: 1;
}

@keyframes slideUpToast {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .sidebar {
    width: 80px;
  }
  
  .sidebar-inner {
    padding: 20px 12px;
  }
  
  .logo h2,
  .user-details,
  .nav-label,
  .nav-badge,
  .logout-btn span:last-child {
    display: none;
  }
  
  .user-profile {
    justify-content: center;
    padding: 8px;
  }
  
  .nav-btn {
    justify-content: center;
    padding: 12px;
  }
  
  .logout-btn {
    justify-content: center;
  }
  
  .main {
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-stats {
    width: 100%;
    justify-content: center;
  }
  
  .toast {
    min-width: auto;
    width: 90%;
    bottom: 16px;
    right: 5%;
    left: 5%;
  }
}

@media (max-width: 480px) {
  .main {
    padding: 16px;
  }
  
  .header-left h1 {
    font-size: 22px;
  }
  
  .add-card {
    padding: 16px;
  }
  
  .header-stats {
    padding: 4px 12px;
  }
  
  .stat-item {
    padding: 4px 8px;
  }
  
  .stat-value {
    font-size: 16px;
  }
  
  .toast {
    padding: 12px 16px;
    font-size: 13px;
  }
}
</style>