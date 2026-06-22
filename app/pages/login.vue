<!-- app/pages/login.vue -->
<template>
  <div class="login-container">
    <!-- Animated Background -->
    <div class="bg-gradient"></div>
    <div class="bg-blob bg-blob-1"></div>
    <div class="bg-blob bg-blob-2"></div>
    <div class="bg-blob bg-blob-3"></div>
    <div class="bg-grid"></div>
    
    <div class="login-wrapper">
      <!-- Left Panel - Branding -->
      <div class="login-brand">
        <div class="brand-content">
          <div class="brand-logo">
            <div class="logo-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <span class="brand-name">Remind<span>Me</span></span>
          </div>
          
          <div class="brand-features">
            <div class="feature-item">
              <div class="feature-icon">⚡</div>
              <div>
                <h4>Smart Reminders</h4>
                <p>Never miss an important task again</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📱</div>
              <div>
                <h4>Multi-Channel</h4>
                <p>Email, SMS, or Browser notifications</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🎯</div>
              <div>
                <h4>Stay Organized</h4>
                <p>Track your tasks with ease</p>
              </div>
            </div>
          </div>
          
          <div class="brand-footer">
            <p>© 2026 RemindMe. All rights reserved.</p>
          </div>
        </div>
      </div>
      
      <!-- Right Panel - Login Form -->
      <div class="login-card">
        <div class="card-header">
          <div class="mobile-logo">
            <div class="logo-icon-small">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <span>RemindMe</span>
            </div>
          </div>
          
          <div class="welcome-section">
            <h1 class="welcome-title">Welcome back</h1>
            <p class="welcome-subtitle">Sign in to your account to continue</p>
          </div>
        </div>
        
        <!-- Alert Messages -->
        <div v-if="error" class="alert alert-error">
          <svg class="alert-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          {{ error }}
        </div>
        
        <div v-if="loginSuccess" class="alert alert-success">
          <svg class="alert-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          Login successful! Redirecting...
        </div>
        
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email address</label>
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
                autocomplete="email"
              />
            </div>
          </div>
          
          <div class="form-group">
            <div class="label-row">
              <label for="password" class="form-label">Password</label>
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>
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
                autocomplete="current-password"
              />
              <button type="button" @click="showPassword = !showPassword" class="password-toggle" tabindex="-1">
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
            <span class="btn-content">
              <span v-if="loading" class="spinner-small"></span>
              <span>{{ loading ? 'Signing in...' : 'Sign in' }}</span>
            </span>
            <svg v-if="!loading" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          
          <div class="signup-prompt">
            <p>Don't have an account? <a href="#" class="signup-link">Create one</a></p>
          </div>
        </form>
      </div>
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
  error.value = ''
  loading.value = true
  
  try {
    const response = await apiClient.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    
    const { token, ...userInfo } = response.data.data
    
    localStorage.setItem('auth_token', token)
    localStorage.setItem('user', JSON.stringify(userInfo))
    
    loginSuccess.value = true
    
    setTimeout(() => {
      navigateTo('/')
    }, 1000)
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
    loading.value = false
  }
}
</script>

<style scoped>
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

/* ===== Animated Background ===== */
.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.06) 0%, transparent 50%);
}

.bg-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  z-index: 0;
  animation: float 20s ease-in-out infinite;
}

.bg-blob-1 {
  width: 400px;
  height: 400px;
  background: #3B82F6;
  top: -150px;
  right: -100px;
  animation-delay: 0s;
}

.bg-blob-2 {
  width: 350px;
  height: 350px;
  background: #8B5CF6;
  bottom: -120px;
  left: -80px;
  animation-delay: -7s;
}

.bg-blob-3 {
  width: 250px;
  height: 250px;
  background: #06B6D4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -14s;
  opacity: 0.1;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  z-index: 0;
}

/* ===== Login Wrapper ===== */
.login-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  max-width: 1000px;
  width: 92%;
  min-height: 600px;
  background: #FFFFFF;
  border-radius: 32px;
  box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* ===== Left Panel - Brand ===== */
.login-brand {
  flex: 1;
  background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
  padding: 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 600px;
}

.brand-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 48px;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  width: 44px;
  height: 44px;
  background: rgba(59, 130, 246, 0.15);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3B82F6;
}

.brand-name {
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: -0.5px;
}

.brand-name span {
  color: #3B82F6;
}

.brand-features {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: auto 0;
  padding: 20px 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateX(4px);
}

.feature-icon {
  font-size: 24px;
  line-height: 1;
  margin-top: 2px;
}

.feature-item h4 {
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px;
}

.feature-item p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  margin: 0;
  line-height: 1.4;
}

.brand-footer {
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.brand-footer p {
  color: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  margin: 0;
}

/* ===== Right Panel - Login Card ===== */
.login-card {
  flex: 1;
  padding: 48px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 600px;
  background: #FFFFFF;
}

.mobile-logo {
  display: none;
  margin-bottom: 32px;
}

.logo-icon-small {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1E293B;
  font-size: 20px;
  font-weight: 700;
}

.logo-icon-small svg {
  color: #3B82F6;
}

.card-header {
  margin-bottom: 32px;
}

.welcome-section {
  text-align: left;
}

.welcome-title {
  font-size: 28px;
  font-weight: 700;
  color: #1E293B;
  margin: 0 0 8px;
  letter-spacing: -0.5px;
}

.welcome-subtitle {
  font-size: 14px;
  color: #64748B;
  margin: 0;
}

/* ===== Alerts ===== */
.alert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 13px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.alert-error {
  background: #FEF2F2;
  border: 1px solid #FECACA;
  color: #EF4444;
}

.alert-success {
  background: #ECFDF5;
  border: 1px solid #A7F3D0;
  color: #059669;
}

.alert-icon {
  flex-shrink: 0;
}

/* ===== Form ===== */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-label {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}

.forgot-link {
  font-size: 12px;
  color: #3B82F6;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #2563EB;
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
  transition: color 0.2s;
}

.input-field {
  width: 100%;
  padding: 12px 42px;
  border: 1.5px solid #E2E8F0;
  border-radius: 12px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;
  background: #FFFFFF;
  color: #1E293B;
}

.input-field:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-field:focus + .input-icon,
.input-wrapper:focus-within .input-icon {
  color: #3B82F6;
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
  transition: color 0.2s;
}

.password-toggle:hover {
  color: #64748B;
}

/* ===== Login Button ===== */
.login-btn {
  background: #1E293B;
  color: white;
  padding: 14px 20px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 4px;
  position: relative;
}

.login-btn:hover:not(:disabled) {
  background: #0F172A;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(30, 41, 59, 0.2);
}

.login-btn:active:not(:disabled) {
  transform: translateY(0);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.spinner-small {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: #FFFFFF;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ===== Signup Prompt ===== */
.signup-prompt {
  text-align: center;
  margin-top: 8px;
}

.signup-prompt p {
  font-size: 13px;
  color: #64748B;
  margin: 0;
}

.signup-link {
  color: #3B82F6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.signup-link:hover {
  color: #2563EB;
}

/* ===== Responsive ===== */
@media (max-width: 968px) {
  .login-wrapper {
    flex-direction: column;
    max-width: 480px;
    min-height: auto;
  }
  
  .login-brand {
    display: none;
  }
  
  .login-card {
    padding: 40px 32px;
    min-height: auto;
  }
  
  .mobile-logo {
    display: block;
  }
  
  .welcome-title {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .login-wrapper {
    width: 95%;
    border-radius: 24px;
  }
  
  .login-card {
    padding: 28px 20px;
  }
  
  .welcome-title {
    font-size: 22px;
  }
  
  .input-field {
    padding: 11px 38px;
    font-size: 13px;
  }
  
  .login-btn {
    padding: 12px 16px;
    font-size: 13px;
  }
}
</style>