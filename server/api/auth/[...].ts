import MicrosoftProvider from 'next-auth/providers/azure-ad'
import { NuxtAuthHandler } from '#auth'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
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
  callbacks: {
    /* on before signin */
    async signIn({ profile }) {
      const profileData = profile as Profile;
      const userExists = await prisma.user.findUnique({
        where: { id: profileData.oid }
      });

      if (!userExists) {
        await prisma.user.create({
          data: {
            id: profileData.oid,
            email: profileData.email,
            name: profileData.name,
            admin: profileData.oid === config.auth.rootUserId,
          }
        });
      } else {
        await prisma.user.update({
          where: { id: profileData.oid },
          data: {
            email: profileData.email,
            name: profileData.name,
            admin: profileData.oid === config.auth.rootUserId,
          }
        });
      }

      console.log('User signed in:', profileData.name);

      return true
    },
  }
})

type Profile = {
  aud: string;
  iss: string;
  iat: number;
  nbf: number;
  exp: number;
  email: string;
  name: string;
  oid: string;
  preferred_username: string;
  rh: string;
  sub: string;
  tid: string;
  uti: string;
  ver: string;
};