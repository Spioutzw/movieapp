import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserinfo } from '@/app/libs/prismadb';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const res = await fetch(process.env.NEXTAUTH_URL + '/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        if (res.ok) {
          const user = await res.json();
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          const err = await res.json();
          // If you return null or false then the credentials will be rejected
          throw new Error(err.message)

        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    //database
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token, }) {

      const infoUser = await getUserinfo(session.user.email);

      session.user = { infoUser };
      session.token = token;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {

      if (account?.provider === 'credentials') {
        token.id = user.id;
      }
      return token;
    }

  }, secret: process.env.NEXTAUTH_SECRET,

};

const handler = NextAuth(authOptions);

export { authOptions}

export { handler as GET, handler as POST }
