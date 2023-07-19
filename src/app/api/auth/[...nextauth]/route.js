import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { getAvatarurl } from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

const handler = NextAuth({
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
          console.log(user, 'user');
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
    newUser: '/register',
    },
    session: {
        //database
        jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async session({ session, token, user }) {
          console.log(session,'session')
          console.log(token,'token')
          console.log(user,'user')

          const userBdd = await getAvatarurl(token.email)

            session.user = {avatar : userBdd};
            session.token = token;
            return session;
    },
}, secret: process.env.NEXTAUTH_SECRET,

});

export { handler as GET , handler as POST}
