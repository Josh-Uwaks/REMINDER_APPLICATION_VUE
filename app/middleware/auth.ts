// app/middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  // This middleware only runs on client-side when SSR is disabled
  const token = localStorage.getItem('auth_token')
  const isAuthenticated = !!token

  // Redirect to login if not authenticated and trying to access home page
  if (!isAuthenticated && to.path === '/') {
    return navigateTo('/login')
  }

  // Redirect to home if authenticated and trying to access login
  if (isAuthenticated && to.path === '/login') {
    return navigateTo('/')
  }
})