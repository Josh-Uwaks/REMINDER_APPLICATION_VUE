<!-- app/pages/index.vue -->
<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-inner">
        <div class="logo">
          <div class="logo-mark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="logo-text">
            <h2>Remind<span>Me</span></h2>
            <span class="logo-sub">Personal Ledger</span>
          </div>
        </div>

        <div class="user-profile">
          <div class="avatar-wrapper">
            <div class="avatar">{{ userInitials }}</div>
            <div class="status-dot online"></div>
          </div>
          <div class="user-details">
            <p class="user-name">{{ userName }}</p>
            <p class="user-email">{{ userEmail }}</p>
          </div>
        </div>

        <nav class="nav">
          <span class="nav-eyebrow">Views</span>
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span>Sign out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="main">
      <!-- Header -->
      <div class="header">
        <div class="header-left">
          <span class="header-eyebrow">{{ todayLabel }}</span>
          <h1>{{ viewTitle }}</h1>
          <p>{{ viewSubtitle }}</p>
        </div>
        <div class="header-right">
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-value">{{ String(activeRemindersCount).padStart(2, '0') }}</span>
              <span class="stat-label">Active</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-value">{{ String(completedRemindersCount).padStart(2, '0') }}</span>
              <span class="stat-label">Done</span>
            </div>
          </div>
          <button class="header-action" @click="toggleTheme" title="Toggle theme" aria-label="Toggle theme">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5M17.6859 17.69L18.5 18.5M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Quick Add -->
      <section class="add-card">
        <div class="add-card-header">
          <span class="add-eyebrow">New entry</span>
          <h3>Add a reminder</h3>
        </div>

        <div class="add-form">
          <div class="form-row">
            <div class="form-group full-width">
              <label class="form-label">What do you need to remember</label>
              <textarea
                v-model="newTitle"
                placeholder="e.g. Call the supplier about the March invoice"
                @keydown.enter.exact.prevent="addReminder"
                class="form-textarea"
                rows="2"
                maxlength="200"
              ></textarea>
              <span class="char-count">{{ newTitle.length }}/200</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Date &amp; time</label>
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
                <option value="both">Email + SMS</option>
              </select>
            </div>
          </div>

          <div v-if="newNotificationMode === 'email' || newNotificationMode === 'both'" class="form-row">
            <div class="form-group full-width">
              <label class="form-label">Email address</label>
              <input v-model="newEmail" type="email" placeholder="you@example.com" class="form-input" />
            </div>
          </div>

          <div v-if="newNotificationMode === 'sms' || newNotificationMode === 'both'" class="form-row">
            <div class="form-group full-width">
              <label class="form-label">Phone number</label>
              <input v-model="newPhone" type="tel" placeholder="+234 803 203 4293" class="form-input" />
              <small class="form-hint">Format: +234 80X XXX XXXX</small>
            </div>
          </div>

          <button @click="addReminder" class="add-btn" :disabled="creatingReminder">
            {{ creatingReminder ? 'Adding…' : 'Add reminder' }}
          </button>
        </div>
      </section>

      <!-- Loading State -->
      <div v-if="viewLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading reminders...</p>
      </div>

      <!-- View Content with Keep-Alive -->
      <KeepAlive v-else>
        <component
          :is="currentViewComponent"
          :key="currentView"
          :reminders="currentViewReminders"
          :loading="viewLoading"
          :sending-sms="sendingSms"
          :sending-email="sendingEmail"
          @refresh="refreshView"
          @edit="editReminder"
          @delete="deleteReminder"
          @toggle="toggleComplete"
          @send-sms="handleSendSms"
          @send-email="handleSendEmail"
        />
      </KeepAlive>
    </main>

    <!-- Edit Modal -->
    <Teleport to="body">
      <div v-if="showEditModal" class="modal-overlay" @click.self="closeEditModal">
        <div class="modal-container">
          <div class="modal-header">
            <div>
              <span class="modal-eyebrow">Edit entry</span>
              <h3>{{ editingReminder?.title?.slice(0, 40) || 'Reminder' }}</h3>
            </div>
            <button @click="closeEditModal" class="modal-close" aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-field">
              <label>Title</label>
              <textarea v-model="editingReminder.title" placeholder="What needs to be done?" rows="3" maxlength="200"></textarea>
              <span class="char-count">{{ editingReminder?.title?.length || 0 }}/200</span>
            </div>
            <div class="modal-field">
              <label>Date &amp; time</label>
              <input type="datetime-local" v-model="editingReminder.datetime" />
            </div>
            <div class="modal-field">
              <label>Priority</label>
              <select v-model="editingReminder.priority">
                <option value="low">Low priority</option>
                <option value="medium">Medium priority</option>
                <option value="high">High priority</option>
              </select>
            </div>
            <div class="modal-field">
              <label>Notification mode</label>
              <select v-model="editingReminder.notificationMode">
                <option value="browser">Browser only</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="both">Email + SMS</option>
              </select>
            </div>
            <div v-if="editingReminder.notificationMode === 'email' || editingReminder.notificationMode === 'both'" class="modal-field">
              <label>Email address</label>
              <input type="email" v-model="editingReminder.email" placeholder="email@example.com" />
            </div>
            <div v-if="editingReminder.notificationMode === 'sms' || editingReminder.notificationMode === 'both'" class="modal-field">
              <label>Phone number</label>
              <input type="tel" v-model="editingReminder.phone" placeholder="+234 803 203 4293" />
            </div>
          </div>
          <div class="modal-footer">
            <button @click="closeEditModal" class="btn btn-secondary">Cancel</button>
            <button @click="saveEdit" class="btn btn-primary" :disabled="savingEdit">
              {{ savingEdit ? 'Saving…' : 'Save changes' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast -->
    <Transition name="toast-fade">
      <div v-if="toast.show" class="toast" :class="toast.type">
        <div class="toast-content">
          <span class="toast-icon">{{ toast.icon }}</span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
        <button @click="toast.show = false" class="toast-close" aria-label="Dismiss">×</button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, defineAsyncComponent } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useReminders } from '~/composables/useReminders'

definePageMeta({
  middleware: 'auth'
})

const TodayView = defineAsyncComponent(() => import('~/components/views/TodayView.vue'))
const UpcomingView = defineAsyncComponent(() => import('~/components/views/UpcomingView.vue'))
const AllView = defineAsyncComponent(() => import('~/components/views/AllView.vue'))

const { getUser, logout } = useAuth()
const {
  reminders,
  loading: remindersLoading,
  sendingSms,
  sendingEmail,
  fetchReminders,
  refreshReminders,
  createReminder,
  updateReminder,
  deleteReminder: deleteReminderApi,
  toggleComplete: toggleCompleteApi,
  sendSmsNotification,
  sendEmailNotification
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

// Toast
const toast = ref({ show: false, message: '', type: 'success', icon: '✓' })

// Auto-refresh interval
let refreshInterval = null

// Computed
const todayLabel = computed(() => {
  return new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })
})

const navItems = computed(() => {
  const todayCount = todayReminders.value.length
  const upcomingCount = upcomingReminders.value.length
  const allCount = reminders.value.length

  return [
    {
      view: 'upcoming',
      label: 'Upcoming',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
      badge: upcomingCount > 0 ? upcomingCount : undefined
    },
    {
      view: 'today',
      label: 'Today',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 16H8M11 16H13M16 16H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.7157 20.2843 5.40974 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.7157 5.40974 3.40974 5.7157 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40974 20.2843 3.7157 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
      badge: todayCount > 0 ? todayCount : undefined
    },
    {
      view: 'all',
      label: 'All entries',
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
      badge: allCount > 0 ? allCount : undefined
    }
  ]
})

const todayReminders = computed(() => {
  if (!Array.isArray(reminders.value)) return []
  const today = new Date().toDateString()
  return reminders.value
    .filter(r => r && r.datetime && new Date(r.datetime).toDateString() === today)
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
})

const upcomingReminders = computed(() => {
  if (!Array.isArray(reminders.value)) return []
  const now = new Date()
  return reminders.value
    .filter(r => r && !r.completed && r.datetime && new Date(r.datetime) > now)
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
})

const filteredReminders = computed(() => {
  if (!Array.isArray(reminders.value)) return []
  let filtered = reminders.value
  if (filterType.value === 'active') filtered = filtered.filter(r => r && !r.completed)
  else if (filterType.value === 'completed') filtered = filtered.filter(r => r && r.completed)
  return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

const activeRemindersCount = computed(() => {
  if (!Array.isArray(reminders.value)) return 0
  return reminders.value.filter(r => r && !r.completed).length
})

const completedRemindersCount = computed(() => {
  if (!Array.isArray(reminders.value)) return 0
  return reminders.value.filter(r => r && r.completed).length
})

const viewTitle = computed(() => {
  const titles = { today: 'Today', upcoming: 'Upcoming', all: 'All entries' }
  return titles[currentView.value] || 'Dashboard'
})

const viewSubtitle = computed(() => {
  const subtitles = {
    today: 'Your schedule for today',
    upcoming: "What's coming up next",
    all: 'Everything in one place'
  }
  return subtitles[currentView.value] || 'Stay organized'
})

const currentViewComponent = computed(() => {
  const components = { today: TodayView, upcoming: UpcomingView, all: AllView }
  return components[currentView.value] || UpcomingView
})

const currentViewReminders = computed(() => {
  const views = { today: todayReminders, upcoming: upcomingReminders, all: filteredReminders }
  return views[currentView.value]?.value || []
})

// Toast helper
const showToast = (message, type = 'success', icon = '✓') => {
  toast.value = { show: true, message, type, icon }
  setTimeout(() => { toast.value.show = false }, 5000)
}

// =====================================================================
// TIMEZONE UTILITIES
// =====================================================================
const localToUTC = (localDateTimeString) => {
  if (!localDateTimeString) return null
  return new Date(localDateTimeString).toISOString()
}

const utcToLocal = (utcString) => {
  if (!utcString) return null
  const date = new Date(utcString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

// =====================================================================
// VIEW MANAGEMENT WITH CACHING
// =====================================================================
const changeView = async (view, forceRefresh = false) => {
  if (currentView.value === view && !forceRefresh) return
  
  currentView.value = view
  viewLoading.value = true
  
  try {
    let filter = null
    if (view === 'today') filter = 'today'
    else if (view === 'upcoming') filter = 'upcoming'
    else if (view === 'all') filter = 'all'
    
    const result = forceRefresh 
      ? await refreshReminders(filter)
      : await fetchReminders(filter)
    
    if (!result.success) {
      console.error('Failed to load view:', result.error)
      showToast(result.error || 'Failed to load reminders', 'error', '!')
    }
  } catch (error) {
    console.error('Error loading view:', error)
    showToast('Failed to load reminders. Please try again.', 'error', '!')
  } finally {
    viewLoading.value = false
  }
}

const refreshView = async () => {
  await changeView(currentView.value, true)
}

// =====================================================================
// REMINDER OPERATIONS
// =====================================================================
const addReminder = async () => {
  if (!newTitle.value.trim() || !newDateTime.value) {
    showToast('Add a title and a date/time', 'error', '!')
    return
  }
  if ((newNotificationMode.value === 'email' || newNotificationMode.value === 'both') && !newEmail.value) {
    showToast('Enter an email address for email reminders', 'error', '!')
    return
  }
  if ((newNotificationMode.value === 'sms' || newNotificationMode.value === 'both') && !newPhone.value) {
    showToast('Enter a phone number for SMS reminders', 'error', '!')
    return
  }

  creatingReminder.value = true
  const utcDateTime = localToUTC(newDateTime.value)

  const reminderData = {
    title: newTitle.value,
    datetime: utcDateTime,
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
    
    let message = 'Reminder added'
    if (result.smsSent && result.emailSent) message = 'Reminder added — SMS & Email scheduled'
    else if (result.smsSent) message = 'Reminder added — SMS scheduled'
    else if (result.emailSent) message = 'Reminder added — Email scheduled'
    
    showToast(message, 'success', '✓')
  } else {
    showToast(result.error || 'Could not add reminder', 'error', '!')
  }

  creatingReminder.value = false
}

const toggleComplete = async (id) => {
  const result = await toggleCompleteApi(id)
  if (result.success) await refreshView()
}

const deleteReminder = async (id) => {
  if (confirm('Delete this reminder?')) {
    const result = await deleteReminderApi(id)
    if (result.success) {
      await refreshView()
      showToast('Reminder deleted', 'success', '✓')
    } else {
      showToast(result.error || 'Could not delete reminder', 'error', '!')
    }
  }
}

const handleSendSms = async (id) => {
  const result = await sendSmsNotification(id)
  if (result.success) {
    showToast('📱 SMS sent successfully!', 'success', '✓')
    await refreshView()
  } else {
    showToast(result.error || 'Could not send SMS', 'error', '!')
  }
}

const handleSendEmail = async (id) => {
  const result = await sendEmailNotification(id)
  if (result.success) {
    showToast('📧 Email sent successfully!', 'success', '✓')
    await refreshView()
  } else {
    showToast(result.error || 'Could not send email', 'error', '!')
  }
}

const editReminder = (reminder) => {
  const localDateTime = utcToLocal(reminder.datetime)
  editingReminder.value = { ...reminder, datetime: localDateTime }
  showEditModal.value = true
}

const saveEdit = async () => {
  savingEdit.value = true
  const utcDateTime = localToUTC(editingReminder.value.datetime)

  const result = await updateReminder(editingReminder.value._id, {
    title: editingReminder.value.title,
    datetime: utcDateTime,
    priority: editingReminder.value.priority,
    notificationMode: editingReminder.value.notificationMode,
    email: editingReminder.value.email,
    phone: editingReminder.value.phone,
    completed: editingReminder.value.completed
  })

  if (result.success) {
    closeEditModal()
    await refreshView()
    showToast('Reminder updated', 'success', '✓')
  } else {
    showToast(result.error || 'Could not update reminder', 'error', '!')
  }
  savingEdit.value = false
}

const closeEditModal = () => {
  showEditModal.value = false
  editingReminder.value = null
}

const setDefaultDateTime = () => {
  if (!newDateTime.value) {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(9, 0, 0, 0)
    const year = tomorrow.getFullYear()
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
    const day = String(tomorrow.getDate()).padStart(2, '0')
    const hours = String(tomorrow.getHours()).padStart(2, '0')
    const minutes = String(tomorrow.getMinutes()).padStart(2, '0')
    newDateTime.value = `${year}-${month}-${day}T${hours}:${minutes}`
  }
}

const toggleTheme = () => {
  document.documentElement.classList.toggle('dark')
}

const handleLogout = async () => {
  await logout()
}

// =====================================================================
// LIFECYCLE HOOKS
// =====================================================================
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

  refreshInterval = setInterval(async () => {
    if (!viewLoading.value && !creatingReminder.value && !savingEdit.value) {
      console.log('🔄 Auto-refreshing data...')
      await changeView(currentView.value, true)
    }
  }, 60000)
})

onBeforeUnmount(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

.dashboard {
  --ink: #1E293B;
  --ink-soft: #64748B;
  --paper: #F8FAFC;
  --surface: #FFFFFF;
  --line: #E2E8F0;
  --primary: #3B82F6;
  --primary-deep: #2563EB;
  --navy: #1E293B;
  --navy-deep: #0F172A;
  --success: #059669;
  --success-soft: #ECFDF5;
  --error: #EF4444;
  --error-soft: #FEF2F2;
  --purple: #8B5CF6;
  --cyan: #06B6D4;

  display: flex;
  min-height: 100vh;
  background: var(--paper);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--ink);
}

/* ===== Loading State ===== */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: var(--surface);
  border-radius: 16px;
  border: 1px solid var(--line);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--line);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: var(--ink-soft);
  font-size: 14px;
}

/* ===== Sidebar ===== */
.sidebar {
  width: 264px;
  background: var(--navy);
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.sidebar-inner {
  padding: 28px 22px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 36px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.logo-mark {
  width: 40px;
  height: 40px;
  background: rgba(59, 130, 246, 0.12);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3B82F6;
  flex-shrink: 0;
}

.logo-text h2 {
  font-family: 'Sora', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -0.5px;
}

.logo-text h2 span {
  color: #3B82F6;
}

.logo-sub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  color: rgba(255,255,255,0.4);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
  padding: 12px;
  background: rgba(255,255,255,0.04);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.06);
}

.avatar-wrapper { position: relative; }

.avatar {
  width: 38px;
  height: 38px;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3B82F6;
  font-family: 'Sora', sans-serif;
  font-weight: 600;
  font-size: 13px;
}

.status-dot {
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 2px solid var(--navy);
  background: #22C55E;
}

.user-details { flex: 1; min-width: 0; }

.user-name {
  font-weight: 600;
  color: #FFFFFF;
  font-size: 13.5px;
}

.user-email {
  font-size: 11.5px;
  color: rgba(255,255,255,0.45);
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.nav-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  margin-bottom: 10px;
  padding-left: 2px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 500;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Inter', sans-serif;
}

.nav-icon { display: flex; align-items: center; width: 18px; flex-shrink: 0; }
.nav-icon svg { stroke: rgba(255,255,255,0.5); }

.nav-btn:hover { background: rgba(255,255,255,0.05); color: #FFFFFF; }
.nav-btn:hover .nav-icon svg { stroke: #FFFFFF; }

.nav-btn.active { 
  background: rgba(59, 130, 246, 0.12); 
  color: #3B82F6; 
}
.nav-btn.active .nav-icon svg { stroke: #3B82F6; }

.nav-label { flex: 1; text-align: left; }

.nav-badge {
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.6);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  font-weight: 500;
  padding: 1px 7px;
  border-radius: 4px;
  min-width: 20px;
  text-align: center;
}

.nav-btn.active .nav-badge { 
  background: rgba(59, 130, 246, 0.15); 
  color: #3B82F6; 
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: rgba(255,255,255,0.45);
  cursor: pointer;
  margin-top: 12px;
  transition: all 0.15s;
  font-weight: 500;
  font-size: 13.5px;
  font-family: 'Inter', sans-serif;
}

.logout-btn:hover { 
  background: rgba(239, 68, 68, 0.1); 
  color: #EF4444; 
}
.logout-btn:hover .nav-icon svg { stroke: #EF4444; }

/* ===== Main ===== */
.main { flex: 1; padding: 36px 44px; overflow-y: auto; max-height: 100vh; background: var(--paper); }

/* ===== Header ===== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 16px;
}

.header-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #3B82F6;
  display: block;
  margin-bottom: 6px;
}

.header-left h1 {
  font-family: 'Sora', sans-serif;
  font-size: 27px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 4px;
  color: var(--ink);
}

.header-left p { color: var(--ink-soft); font-size: 13.5px; }

.header-right { display: flex; align-items: center; gap: 14px; }

.header-stats {
  display: flex;
  align-items: center;
  background: var(--surface);
  padding: 4px 6px;
  border-radius: 12px;
  border: 1px solid var(--line);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 16px;
}

.stat-value {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 18px;
  font-weight: 500;
  color: var(--ink);
}

.stat-label {
  font-size: 10.5px;
  color: var(--ink-soft);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-top: 1px;
}

.stat-divider { width: 1px; height: 26px; background: var(--line); }

.header-action {
  width: 38px;
  height: 38px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--surface);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ink-soft);
  transition: all 0.15s;
}

.header-action:hover { border-color: #3B82F6; color: #3B82F6; }

/* ===== Add Card ===== */
.add-card {
  background: var(--surface);
  border-radius: 16px;
  padding: 26px 28px;
  margin-bottom: 32px;
  border: 1px solid var(--line);
  border-top: 3px solid #3B82F6;
}

.add-card-header { margin-bottom: 18px; }

.add-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #3B82F6;
  display: block;
  margin-bottom: 4px;
}

.add-card-header h3 {
  font-family: 'Sora', sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: var(--ink);
}

.add-form { display: flex; flex-direction: column; gap: 16px; }

.form-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
.form-row.full-width { grid-template-columns: 1fr; }

.form-group { display: flex; flex-direction: column; gap: 6px; }

.form-label {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--ink-soft);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.form-hint { font-size: 11px; color: var(--ink-soft); opacity: 0.7; }

.form-input, .form-select, .form-textarea {
  padding: 10px 13px;
  border: 1.5px solid var(--line);
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  transition: all 0.15s;
  background: var(--paper);
  color: var(--ink);
}

.form-textarea {
  resize: vertical;
  min-height: 60px;
  max-height: 120px;
  line-height: 1.5;
  width: 100%;
}

.char-count {
  font-size: 11px;
  color: var(--ink-soft);
  text-align: right;
  opacity: 0.6;
  margin-top: 2px;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: #3B82F6;
  background: var(--surface);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
}

.form-input::placeholder, .form-textarea::placeholder { color: #94A3B8; }

.add-btn {
  padding: 12px;
  background: var(--navy);
  color: #FFFFFF;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'Inter', sans-serif;
}

.add-btn:hover:not(:disabled) { background: var(--navy-deep); }
.add-btn:disabled { opacity: 0.6; cursor: not-allowed; }

/* ===== Modal ===== */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-container {
  background: #FFFFFF;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  border-top: 3px solid #3B82F6;
  animation: slideUp 0.22s ease;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

@keyframes slideUp {
  from { transform: translateY(20px) scale(0.95); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 22px 26px;
  border-bottom: 1px solid var(--line, #E2E8F0);
  background: #FFFFFF;
  border-radius: 16px 16px 0 0;
}

.modal-eyebrow {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #3B82F6;
  display: block;
  margin-bottom: 4px;
}

.modal-header h3 {
  font-family: 'Sora', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
  max-width: 360px;
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  color: #64748B;
  padding: 4px;
  border-radius: 8px;
  transition: background 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #F8FAFC;
}

.modal-body {
  padding: 22px 26px;
  background: #FFFFFF;
}

.modal-field {
  margin-bottom: 16px;
}

.modal-field:last-child {
  margin-bottom: 0;
}

.modal-field label {
  display: block;
  margin-bottom: 6px;
  font-size: 11.5px;
  font-weight: 600;
  color: #64748B;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.modal-field input,
.modal-field select,
.modal-field textarea {
  width: 100%;
  padding: 10px 13px;
  border: 1.5px solid #E2E8F0;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  background: #F8FAFC;
  color: #1E293B;
  transition: border-color 0.15s;
}

.modal-field textarea {
  resize: vertical;
  min-height: 70px;
  max-height: 150px;
  line-height: 1.5;
}

.modal-field input:focus,
.modal-field select:focus,
.modal-field textarea:focus {
  outline: none;
  border-color: #3B82F6;
  background: #FFFFFF;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.08);
}

.modal-field .char-count {
  font-size: 11px;
  color: #64748B;
  text-align: right;
  opacity: 0.6;
  margin-top: 2px;
}

.modal-footer {
  padding: 16px 26px;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background: #FFFFFF;
  border-radius: 0 0 16px 16px;
}

.btn {
  padding: 10px 22px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 13.5px;
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  font-family: 'Inter', sans-serif;
}

.btn-secondary {
  background: #F8FAFC;
  color: #64748B;
  border: 1.5px solid #E2E8F0;
}

.btn-secondary:hover {
  background: #E2E8F0;
}

.btn-primary {
  background: #1E293B;
  color: #FFFFFF;
}

.btn-primary:hover:not(:disabled) {
  background: #0F172A;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ===== Toast ===== */
.toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  padding: 14px 18px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 300px;
  max-width: 440px;
  z-index: 9999;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.15);
  border-left: 3px solid transparent;
}

.toast.success {
  background: #1E293B;
  color: #FFFFFF;
  border-left-color: #22C55E;
}

.toast.error {
  background: #1E293B;
  color: #FFFFFF;
  border-left-color: #EF4444;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toast-icon {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 600;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  font-size: 12px;
  flex-shrink: 0;
}

.toast-message {
  font-size: 13.5px;
  font-weight: 500;
}

.toast-close {
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.5);
  font-size: 20px;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
}

.toast-close:hover {
  color: #FFFFFF;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.2s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .sidebar {
    width: 76px;
  }
  .sidebar-inner {
    padding: 20px 12px;
  }
  .logo-text,
  .user-details,
  .nav-eyebrow,
  .nav-label,
  .nav-badge,
  .logout-btn span:last-child {
    display: none;
  }
  .logo {
    justify-content: center;
  }
  .user-profile {
    justify-content: center;
    padding: 8px;
  }
  .nav-btn,
  .logout-btn {
    justify-content: center;
    padding: 12px;
  }
  .main {
    padding: 22px;
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
  .modal-container {
    margin: 10px;
    max-height: 95vh;
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
    padding: 18px;
  }
  .modal-body {
    padding: 16px 18px;
  }
  .modal-header {
    padding: 16px 18px;
  }
  .modal-footer {
    padding: 12px 18px;
  }
}
</style>