import NextAuth from 'next-auth/next';
import GitlabProvider from 'next-auth/providers/gitlab';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';

export const authOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }: any) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GitlabProvider({
      clientId: process.env.GITLAB_CLIENT_ID || '',
      clientSecret: process.env.GITLAB_CLIENT_SECRET || '',
    }),
  ],
};

export default NextAuth(authOptions);
