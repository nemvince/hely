export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@bg-dev/nuxt-naiveui',
    '@sidebase/nuxt-auth'
  ],
  compatibilityDate: '2024-08-19',
  devtools: {
    enabled: false
  },
  typescript: {
    shim: false
  },
  auth: {
    baseURL: process.env.ORIGIN,
    provider: {
      type: "authjs",
      trustHost: true,
      defaultProvider: "azure-ad",
      addDefaultCallbackUrl: true,
    },
  },
  runtimeConfig: {
    auth: {
      secret: process.env.AUTH_SECRET,
      azure: {
        clientId: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        tenantId: process.env.AZURE_TENANT_ID
      }
    }
  }
})
