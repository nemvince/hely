export default defineNuxtConfig({
  compatibilityDate: '2024-08-19',
  modules: [
    '@nuxtjs/tailwindcss',
    '@sidebase/nuxt-auth',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/eslint'
  ],
  devtools: {
    enabled: false
  },
  typescript: {
    shim: false
  },
  auth: {
    isEnabled: true,
    disableServerSideAuth: false,
    baseURL: "http://localhost:3000/api/auth",
    originEnvKey: "ORIGIN",
    provider: {
      type: "authjs",
      trustHost: true,
      defaultProvider: "azure-ad",
      addDefaultCallbackUrl: "http://localhost:3000/api/auth/callback/azure-ad",
    },
  },
  runtimeConfig: {
    authOrigin: process.env.ORIGIN,
    auth: {
      secret: process.env.AUTH_SECRET,
      rootUserId: process.env.ROOT_USER_ID,
      azure: {
        clientId: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        tenantId: process.env.AZURE_TENANT_ID
      }
    }
  }
})