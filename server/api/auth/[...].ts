import MicrosoftProvider from 'next-auth/providers/azure-ad'
import { NuxtAuthHandler } from '#auth'

const config = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: config.auth.secret,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    MicrosoftProvider.default({
      clientId: config.auth.azure.clientId,
      clientSecret: config.auth.azure.clientSecret,
      tenantId: config.auth.azure.tenantId,
    }),
  ],
})
