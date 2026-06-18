<!-- app/pages/dashboard.vue -->
<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="logo">
        <div class="logo-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <h2>RemindMe</h2>
      </div>
      
      <div class="user-info">
        <div class="avatar">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="1.5"/>
          </svg>
        </div>
        <div>
          <p class="user-name">{{ userName }}</p>
          <p class="user-email">{{ userEmail }}</p>
        </div>
      </div>
      
      <nav class="nav">
        <button @click="changeView('upcoming')" class="nav-btn" :class="{ active: currentView === 'upcoming' }">
          <span class="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span>Upcoming</span>
        </button>
        <button @click="changeView('today')" class="nav-btn" :class="{ active: currentView === 'today' }">
          <span class="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 16H8M11 16H13M16 16H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.7157 20.2843 5.40974 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.7157 5.40974 3.40974 5.7157 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40974 20.2843 3.7157 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span>Today</span>
        </button>
        <button @click="changeView('all')" class="nav-btn" :class="{ active: currentView === 'all' }">
          <span class="nav-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span>All Reminders</span>
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
    </aside>
    
    <!-- Main Content -->
    <main class="main">
      <!-- Loading State -->
      <div v-if="remindersLoading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading reminders...</p>
      </div>
      
      <template v-else>
        <!-- Header -->
        <div class="header">
          <div>
            <h1>{{ viewTitle }}</h1>
            <p>Stay organized, stay productive</p>
          </div>
          <div class="header-stats">
            <div class="stat-badge">
              <span class="stat-number">{{ activeRemindersCount }}</span>
              <span class="stat-label">Active</span>
            </div>
            <div class="stat-badge">
              <span class="stat-number">{{ completedRemindersCount }}</span>
              <span class="stat-label">Completed</span>
            </div>
          </div>
        </div>
        
        <!-- Quick Add -->
        <div class="add-card">
          <div class="add-card-header">
            <div class="add-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <h3>New Reminder</h3>
          </div>
          <input 
            v-model="newTitle" 
            type="text" 
            placeholder="What do you want to remember?"
            @keyup.enter="addReminder"
            class="add-input"
          />
          <div class="add-options">
            <div class="input-group">
              <label>Date & Time</label>
              <input type="datetime-local" v-model="newDateTime" class="date-input" />
            </div>
            <div class="input-group">
              <label>Priority</label>
              <select v-model="newPriority" class="priority-input">
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div class="input-group">
              <label>Notify via</label>
              <select v-model="newNotificationMode" class="notification-mode-input">
                <option value="browser">Browser Only</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="both">Email + SMS</option>
              </select>
            </div>
          </div>
          
          <div class="contact-fields">
            <div v-if="newNotificationMode === 'email' || newNotificationMode === 'both'" class="contact-field">
              <label>Email Address</label>
              <input 
                v-model="newEmail" 
                type="email" 
                placeholder="you@example.com"
                class="contact-input"
              />
            </div>
            <div v-if="newNotificationMode === 'sms' || newNotificationMode === 'both'" class="contact-field">
              <label>Phone Number</label>
              <input 
                v-model="newPhone" 
                type="tel" 
                placeholder="+1 234 567 8900"
                class="contact-input"
              />
            </div>
          </div>
          
          <button @click="addReminder" class="add-btn" :disabled="remindersLoading">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            {{ remindersLoading ? 'Creating...' : 'Create Reminder' }}
          </button>
        </div>
        
        <!-- Today's Schedule View -->
        <div v-if="currentView === 'today'" class="today-view">
          <div class="today-header">
            <h2>Today's Schedule</h2>
            <div class="progress">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: dayProgress + '%' }"></div>
              </div>
              <span class="progress-text">{{ dayProgress }}% done</span>
            </div>
          </div>
          
          <div class="reminders-list">
            <div 
              v-for="reminder in todayReminders" 
              :key="reminder._id"
              class="reminder-card"
              :class="{
                'priority-high': reminder.priority === 'high',
                'priority-medium': reminder.priority === 'medium',
                'completed': reminder.completed
              }"
            >
              <div class="card-left">
                <label class="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    :checked="reminder.completed"
                    @change="toggleComplete(reminder._id)"
                    class="checkbox"
                  />
                  <span class="checkmark"></span>
                </label>
                <div class="card-content">
                  <div class="card-title">{{ reminder.title }}</div>
                  <div class="card-time">
                    <span class="time-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                    </span>
                    {{ formatTime(reminder.datetime) }}
                    <span class="notification-badge" :class="reminder.notificationMode">
                      {{ getNotificationIcon(reminder.notificationMode) }} {{ getNotificationLabel(reminder.notificationMode) }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="card-actions">
                <button @click="editReminder(reminder)" class="action-btn edit-btn" title="Edit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button @click="deleteReminder(reminder._id)" class="action-btn delete-btn" title="Delete">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 7H20M10 11V16M14 11V16M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div v-if="todayReminders.length === 0" class="empty-state">
              <div class="empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <h3>No reminders for today</h3>
              <p>Add a reminder above to get started</p>
            </div>
          </div>
        </div>
        
        <!-- Upcoming View -->
        <div v-if="currentView === 'upcoming'" class="upcoming-view">
          <div class="section-header">
            <h2>Upcoming Reminders</h2>
            <span class="section-count">{{ upcomingReminders.length }} reminders</span>
          </div>
          
          <div class="reminders-list">
            <div 
              v-for="reminder in upcomingReminders" 
              :key="reminder._id"
              class="reminder-card"
              :class="{
                'priority-high': reminder.priority === 'high',
                'priority-medium': reminder.priority === 'medium',
                'completed': reminder.completed
              }"
            >
              <div class="card-left">
                <label class="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    :checked="reminder.completed"
                    @change="toggleComplete(reminder._id)"
                    class="checkbox"
                  />
                  <span class="checkmark"></span>
                </label>
                <div class="card-content">
                  <div class="card-title">{{ reminder.title }}</div>
                  <div class="card-time">
                    <span class="date-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 16H8M11 16H13M16 16H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.7157 20.2843 5.40974 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.7157 5.40974 3.40974 5.7157 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40974 20.2843 3.7157 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                    </span>
                    {{ formatDate(reminder.datetime) }} at {{ formatTime(reminder.datetime) }}
                    <span class="notification-badge" :class="reminder.notificationMode">
                      {{ getNotificationIcon(reminder.notificationMode) }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="card-actions">
                <button @click="editReminder(reminder)" class="action-btn edit-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </button>
                <button @click="deleteReminder(reminder._id)" class="action-btn delete-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 7H20M10 11V16M14 11V16M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div v-if="upcomingReminders.length === 0" class="empty-state">
              <div class="empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <h3>All caught up!</h3>
              <p>No upcoming reminders scheduled</p>
            </div>
          </div>
        </div>
        
        <!-- All Reminders View -->
        <div v-if="currentView === 'all'" class="all-view">
          <div class="section-header">
            <h2>All Reminders</h2>
            <div class="filters">
              <button @click="filterType = 'all'; fetchReminders()" class="filter-btn" :class="{ active: filterType === 'all' }">
                All ({{ reminders.length }})
              </button>
              <button @click="filterType = 'active'; fetchReminders('active')" class="filter-btn" :class="{ active: filterType === 'active' }">
                Active ({{ activeRemindersCount }})
              </button>
              <button @click="filterType = 'completed'; fetchReminders('completed')" class="filter-btn" :class="{ active: filterType === 'completed' }">
                Completed ({{ completedRemindersCount }})
              </button>
            </div>
          </div>
          
          <div class="reminders-list">
            <div 
              v-for="reminder in filteredReminders" 
              :key="reminder._id"
              class="reminder-card"
              :class="{
                'priority-high': reminder.priority === 'high',
                'priority-medium': reminder.priority === 'medium',
                'completed': reminder.completed
              }"
            >
              <div class="card-left">
                <label class="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    :checked="reminder.completed"
                    @change="toggleComplete(reminder._id)"
                    class="checkbox"
                  />
                  <span class="checkmark"></span>
                </label>
                <div class="card-content">
                  <div class="card-title">{{ reminder.title }}</div>
                  <div class="card-time">
                    <span class="date-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9H21M7 3V5M17 3V5M6 12H8M11 12H13M16 12H18M6 16H8M11 16H13M16 16H18M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.7157 20.2843 5.40974 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.7157 5.40974 3.40974 5.7157 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40974 20.2843 3.7157 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                    </span>
                    {{ formatFullDate(reminder.datetime) }}
                    <span class="priority-badge" :class="reminder.priority">
                      {{ reminder.priority }}
                    </span>
                    <span class="notification-badge" :class="reminder.notificationMode">
                      {{ getNotificationIcon(reminder.notificationMode) }}
                    </span>
                  </div>
                  <div v-if="reminder.email" class="contact-info">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 6L12 13L2 6M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    {{ reminder.email }}
                  </div>
                  <div v-if="reminder.phone" class="contact-info">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 16.92V19C22.001 19.7906 21.786 20.5663 21.381 21.2395C20.976 21.9127 20.398 22.4532 19.716 22.795C19.034 23.1368 18.2765 23.2662 17.53 23.1694C16.7836 23.0726 16.0828 22.7537 15.51 22.25C13.2192 20.2733 11.203 17.9983 9.53 15.5C9.02078 14.7257 8.6592 13.8593 8.465 12.947C8.2708 12.0347 8.24807 11.0936 8.398 10.172C8.54793 9.25041 8.86684 8.36288 9.333 7.55999C9.79916 6.7571 10.4028 6.05473 11.11 5.49" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    {{ reminder.phone }}
                  </div>
                </div>
              </div>
              <div class="card-actions">
                <button @click="editReminder(reminder)" class="action-btn edit-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </button>
                <button @click="deleteReminder(reminder._id)" class="action-btn delete-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 7H20M10 11V16M14 11V16M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <div v-if="filteredReminders.length === 0" class="empty-state">
              <div class="empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </div>
              <h3>No reminders found</h3>
              <p>Create a new reminder to get started</p>
            </div>
          </div>
        </div>
      </template>
    </main>
    
    <!-- Edit Modal -->
    <Teleport to="body">
      <div v-if="showEditModal" class="modal-overlay" @click.self="closeEditModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>Edit Reminder</h3>
            <button @click="closeEditModal" class="close-modal">
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
              <input type="tel" v-model="editingReminder.phone" placeholder="+1 234 567 8900" />
            </div>
          </div>
          <div class="modal-footer">
            <button @click="closeEditModal" class="modal-btn cancel">Cancel</button>
            <button @click="saveEdit" class="modal-btn save" :disabled="remindersLoading">Save Changes</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useReminders } from '~/composables/useReminders'

definePageMeta({
  middleware: 'auth'
})

const { getUser, logout } = useAuth()
const { 
  reminders, 
  loading: remindersLoading,
  fetchReminders, 
  createReminder, 
  updateReminder, 
  deleteReminder: deleteReminderApi,
  toggleComplete: toggleCompleteApi
} = useReminders()

// User data - set after mount to avoid SSR issues
const userName = ref('User')
const userEmail = ref('')

// State
const currentView = ref('upcoming')
const newTitle = ref('')
const newDateTime = ref('')
const newPriority = ref('medium')
const newNotificationMode = ref('browser')
const newEmail = ref('')
const newPhone = ref('')
const filterType = ref('all')
const showEditModal = ref(false)
const editingReminder = ref(null)

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
  if (currentView.value === 'today') return 'Today'
  if (currentView.value === 'upcoming') return 'Upcoming'
  return 'All Reminders'
})

// Methods
const changeView = async (view) => {
  currentView.value = view
  if (view === 'today') {
    await fetchReminders('today')
  } else if (view === 'upcoming') {
    await fetchReminders('upcoming')
  } else {
    await fetchReminders()
  }
}

const getNotificationIcon = (mode) => {
  switch(mode) {
    case 'email': return '📧'
    case 'sms': return '📱'
    case 'both': return '💌'
    default: return '🔔'
  }
}

const getNotificationLabel = (mode) => {
  switch(mode) {
    case 'email': return 'Email'
    case 'sms': return 'SMS'
    case 'both': return 'Email+SMS'
    default: return 'Browser'
  }
}

const addReminder = async () => {
  if (!newTitle.value.trim() || !newDateTime.value) {
    alert('Please enter a title and date/time')
    return
  }
  
  if ((newNotificationMode.value === 'email' || newNotificationMode.value === 'both') && !newEmail.value) {
    alert('Please enter an email address for email reminders')
    return
  }
  
  if ((newNotificationMode.value === 'sms' || newNotificationMode.value === 'both') && !newPhone.value) {
    alert('Please enter a phone number for SMS reminders')
    return
  }
  
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
    
    await changeView(currentView.value)
  } else {
    alert(result.error)
  }
}

const toggleComplete = async (id) => {
  await toggleCompleteApi(id)
}

const deleteReminder = async (id) => {
  if (confirm('Delete this reminder?')) {
    const result = await deleteReminderApi(id)
    if (result.success) {
      await changeView(currentView.value)
    } else {
      alert(result.error)
    }
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
    await changeView(currentView.value)
  } else {
    alert(result.error)
  }
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
  return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const setDefaultDateTime = () => {
  if (!newDateTime.value) {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(9, 0, 0)
    newDateTime.value = tomorrow.toISOString().slice(0, 16)
  }
}

const handleLogout = async () => {
  await logout()
}

onMounted(async () => {
  // Load user data only on client side
  const user = getUser()
  if (user) {
    userName.value = user.name || 'User'
    userEmail.value = user.email || ''
  }
  
  setDefaultDateTime()
  await changeView('upcoming')
  
  if ('Notification' in window) {
    Notification.requestPermission()
  }
})
</script>
<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background: #F8FAFC;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: #FFFFFF;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #E2E8F0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
}

.logo-icon {
  color: #3B82F6;
  display: flex;
  align-items: center;
}

.logo h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1E293B;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #F8FAFC;
  border-radius: 16px;
  margin-bottom: 32px;
}

.avatar {
  color: #64748B;
  display: flex;
  align-items: center;
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
}

.nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #64748B;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-icon {
  display: flex;
  align-items: center;
  width: 20px;
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

.logout-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: transparent;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  color: #EF4444;
  cursor: pointer;
  margin-top: 24px;
  transition: all 0.2s;
  font-weight: 500;
}

.logout-btn:hover {
  background: #FEF2F2;
  border-color: #FECACA;
}

/* Main Content */
.main {
  flex: 1;
  padding: 40px 48px;
  overflow-y: auto;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 60px 20px;
  background: #FFFFFF;
  border-radius: 20px;
  border: 1px solid #E2E8F0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #E2E8F0;
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: #64748B;
  margin: 0;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 4px;
}

.header p {
  color: #64748B;
  margin: 0;
}

.header-stats {
  display: flex;
  gap: 16px;
}

.stat-badge {
  background: #FFFFFF;
  padding: 12px 20px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid #E2E8F0;
}

.stat-number {
  display: block;
  font-size: 24px;
  font-weight: 700;
  color: #1E293B;
}

.stat-label {
  font-size: 12px;
  color: #64748B;
}

/* Add Card */
.add-card {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid #E2E8F0;
}

.add-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.add-icon {
  width: 32px;
  height: 32px;
  background: #EFF6FF;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3B82F6;
}

.add-card-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
}

.add-input {
  width: 100%;
  padding: 14px;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  font-size: 14px;
  font-family: inherit;
  margin-bottom: 16px;
  transition: all 0.2s;
}

.add-input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.add-options {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 12px;
  font-weight: 500;
  color: #64748B;
}

.date-input,
.priority-input,
.notification-mode-input {
  padding: 10px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 14px;
  background: #FFFFFF;
}

.contact-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.contact-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.contact-field label {
  font-size: 12px;
  font-weight: 500;
  color: #64748B;
}

.contact-input {
  padding: 10px 12px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 14px;
}

.add-btn {
  width: 100%;
  padding: 12px;
  background: #3B82F6;
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
  background: #2563EB;
}

.add-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Section Headers */
.today-header,
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.today-header h2,
.section-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #1E293B;
  margin: 0;
}

.section-count {
  font-size: 13px;
  color: #64748B;
  background: #F1F5F9;
  padding: 4px 12px;
  border-radius: 20px;
}

.progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  width: 160px;
  height: 6px;
  background: #E2E8F0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #3B82F6;
  border-radius: 3px;
  transition: width 0.3s;
}

.progress-text {
  font-size: 13px;
  color: #64748B;
}

/* Filters */
.filters {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 6px 14px;
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  color: #64748B;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #3B82F6;
  border-color: #3B82F6;
  color: white;
}

.filter-btn:hover:not(.active) {
  background: #F1F5F9;
}

/* Reminders List */
.reminders-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.reminder-card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  border: 1px solid #E2E8F0;
}

.reminder-card:hover {
  border-color: #CBD5E1;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
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

.card-left {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

/* Custom Checkbox */
.checkbox-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.checkbox {
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

.checkbox:checked + .checkmark {
  background: #3B82F6;
  border-color: #3B82F6;
}

.checkbox:checked + .checkmark::after {
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
}

.card-title {
  font-size: 15px;
  font-weight: 500;
  color: #1E293B;
  margin-bottom: 6px;
}

.card-time {
  font-size: 12px;
  color: #64748B;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.time-icon,
.date-icon {
  display: inline-flex;
  align-items: center;
  color: #94A3B8;
}

.contact-info {
  font-size: 11px;
  color: #94A3B8;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Badges */
.priority-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 500;
  text-transform: capitalize;
}

.priority-badge.high {
  background: #FEF2F2;
  color: #EF4444;
}

.priority-badge.medium {
  background: #FFFBEB;
  color: #F59E0B;
}

.priority-badge.low {
  background: #F0FDF4;
  color: #10B981;
}

.notification-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 500;
}

.notification-badge.browser {
  background: #F1F5F9;
  color: #475569;
}

.notification-badge.email {
  background: #EFF6FF;
  color: #2563EB;
}

.notification-badge.sms {
  background: #FEF2F2;
  color: #DC2626;
}

.notification-badge.both {
  background: #F3E8FF;
  color: #9333EA;
}

/* Card Actions */
.card-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
  color: #94A3B8;
}

.action-btn:hover {
  background: #F1F5F9;
}

.edit-btn:hover {
  color: #3B82F6;
}

.delete-btn:hover {
  color: #EF4444;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #FFFFFF;
  border-radius: 20px;
  border: 1px solid #E2E8F0;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: #CBD5E1;
}

.empty-state h3 {
  font-size: 18px;
  font-weight: 500;
  color: #1E293B;
  margin: 0 0 8px;
}

.empty-state p {
  color: #64748B;
  margin: 0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #FFFFFF;
  border-radius: 24px;
  width: 90%;
  max-width: 520px;
  animation: slideUp 0.2s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
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
  color: #1E293B;
  margin: 0;
}

.close-modal {
  background: none;
  border: none;
  cursor: pointer;
  color: #94A3B8;
  display: flex;
  align-items: center;
}

.modal-body {
  padding: 24px;
}

.modal-field {
  margin-bottom: 20px;
}

.modal-field label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #1E293B;
}

.modal-field input,
.modal-field select {
  width: 100%;
  padding: 12px;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  font-family: inherit;
  font-size: 14px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #E2E8F0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.modal-btn {
  padding: 10px 20px;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-btn.cancel {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  color: #64748B;
}

.modal-btn.save {
  background: #3B82F6;
  border: none;
  color: white;
}

.modal-btn.save:hover:not(:disabled) {
  background: #2563EB;
}

.modal-btn.save:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    width: 80px;
    padding: 24px 12px;
  }
  
  .logo h2,
  .user-info div,
  .nav-btn span:last-child,
  .logout-btn span:last-child {
    display: none;
  }
  
  .user-info {
    justify-content: center;
    padding: 12px;
  }
  
  .nav-btn {
    justify-content: center;
  }
  
  .logout-btn {
    justify-content: center;
  }
  
  .main {
    padding: 20px;
  }
  
  .add-options {
    grid-template-columns: 1fr;
  }
  
  .contact-fields {
    grid-template-columns: 1fr;
  }
  
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .today-header,
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>