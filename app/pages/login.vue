<!-- app/pages/login.vue -->
<template>
  <div class="login-container">
    <!-- Background decoration -->
    <div class="bg-gradient"></div>
    <div class="bg-blob bg-blob-1"></div>
    <div class="bg-blob bg-blob-2"></div>
    
    <div class="login-card">
      <div class="brand-header">
        <div class="logo-wrapper">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span class="logo-text">RemindMe</span>
        </div>
      </div>
      
      <div class="welcome-section">
        <h1 class="welcome-title">Welcome back</h1>
        <p class="welcome-subtitle">Sign in to your account to continue</p>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div v-if="loginSuccess" class="success-message">
        Login successful! Redirecting...
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="email">Email address</label>
          <div class="input-wrapper">
            <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 6L12 13L2 6M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <input 
              id="email"
              v-model="email" 
              type="email" 
              placeholder="name@example.com"
              required
              class="input-field"
            />
          </div>
        </div>
        
        <div class="input-group">
          <label for="password">Password</label>
          <div class="input-wrapper">
            <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15V17M6 21H18C19.1 21 20 20.1 20 19V11C20 9.9 19.1 9 18 9H6C4.9 9 4 9.9 4 11V19C4 20.1 4.9 21 6 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M8 9V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <input 
              id="password"
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="Enter your password"
              required
              class="input-field"
            />
            <button type="button" @click="showPassword = !showPassword" class="password-toggle">
              <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C2 12 5 5 12 5C19 5 22 12 22 12C22 12 19 19 12 19C5 19 2 12 2 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 2L22 22M9.88 9.88C9.33 10.19 9 10.81 9 11.5C9 12.88 10.12 14 11.5 14C12.19 14 12.81 13.67 13.12 13.12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M22 12C22 12 19 19 12 19C10.9 19 9.86 18.79 8.91 18.44M5.76 16.24C4.01 14.58 2.69 12.56 2 12C2 12 5 5 12 5C13.57 5 15.03 5.47 16.32 6.18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <button type="submit" class="login-btn" :disabled="loading">
          <span>{{ loading ? 'Signing in...' : 'Sign in' }}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import apiClient from '~/api/client'

definePageMeta({
  middleware: 'auth'
})

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const loginSuccess = ref(false)

const handleLogin = async () => {
  // Reset states
  error.value = ''
  loading.value = true
  
  try {
    console.log('Attempting login with:', email.value)
    
    const response = await apiClient.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    
    console.log('Login response:', response.data)
    
    const { token, ...userInfo } = response.data.data
    
    // Store auth data
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(userInfo))
    
    loginSuccess.value = true
    
    // Wait a moment to show success message, then redirect
    setTimeout(() => {
      navigateTo('/')
    }, 1000)
    
  } catch (err) {
    console.error('Login error:', err)
    error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
    loading.value = false
  }
}
</script>

<style scoped>
/* Add error message styles */
.error-message {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #EF4444;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 13px;
  text-align: center;
}

.success-message {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  color: #059669;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 13px;
  text-align: center;
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Keep all your existing styles from the original login.vue */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F8FAFC;
  overflow: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
}

.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  z-index: 0;
}

.bg-blob-1 {
  width: 300px;
  height: 300px;
  background: #3B82F6;
  top: -100px;
  right: -100px;
}

.bg-blob-2 {
  width: 250px;
  height: 250px;
  background: #8B5CF6;
  bottom: -80px;
  left: -80px;
}

.login-card {
  position: relative;
  z-index: 10;
  background: #FFFFFF;
  border-radius: 32px;
  padding: 40px 48px;
  max-width: 460px;
  width: 90%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

.brand-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.logo-wrapper svg {
  color: #3B82F6;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #1E293B;
  letter-spacing: -0.3px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 32px;
}

.welcome-title {
  font-size: 28px;
  font-weight: 700;
  color: #1E293B;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.welcome-subtitle {
  font-size: 14px;
  color: #64748B;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
  letter-spacing: -0.2px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #94A3B8;
  pointer-events: none;
}

.input-field {
  width: 100%;
  padding: 12px 42px;
  border: 1.5px solid #E2E8F0;
  border-radius: 14px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;
  background: #FFFFFF;
}

.input-field:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-field::placeholder {
  color: #94A3B8;
}

.password-toggle {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  color: #94A3B8;
  display: flex;
  align-items: center;
  padding: 0;
}

.password-toggle:hover {
  color: #64748B;
}

.login-btn {
  background: #1E293B;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-btn:hover:not(:disabled) {
  background: #0F172A;
  transform: translateY(-1px);
}

.login-btn:active {
  transform: translateY(0);
}

@media (max-width: 640px) {
  .login-card {
    padding: 32px 24px;
    width: 90%;
    margin: 16px;
  }
  
  .welcome-title {
    font-size: 24px;
  }
  
  .bg-blob-1,
  .bg-blob-2 {
    width: 200px;
    height: 200px;
  }
}
</style>