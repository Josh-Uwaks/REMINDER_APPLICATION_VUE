// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  ssr: false, // Disable server-side rendering
  nitro: {
    preset: 'node-server'
  },
  vite: {
    define: {
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL)
    }
  }
})