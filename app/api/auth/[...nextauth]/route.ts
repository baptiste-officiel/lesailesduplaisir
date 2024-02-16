import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/app/libs/prisma'
import bcrypt from 'bcrypt';
import { User } from "@prisma/client";



export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials){
          // Check if email or password is valid 
          if (!credentials?.email || !credentials?.password) {
              return null
          }
          
          // Check if the user exists 
          const user = await prisma.user.findUnique({
              where: {
                  email: credentials.email
              }
          })

          if (!user) {
              // throw new Error('This user doesn\'t exist')
              return null
          }

          // Check to see if password match 
          const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword as string)

          if (!passwordMatch) {
              return null;
          }

          // return user if everything is ok 
          return user
      }
  })
    // ...add more providers here
  ],
  // callbacks: {
  //   session({session, token, user}) {
  //     // session.user!.status = (user as User).status;
  //     session.user.id = user.id
  //     return session
  //   }
  // },
  callbacks: {
    async jwt({token, user, session}) {
      // console.log('jwt callback', {token, user, session});

      // pss user.id and status to token 
      if (user) {
        return {
          ...token,
          id: user.id,
          status: user.status,
        };
      }
      return token;
    },
    async session({session, token, user}) {
      // console.log('session callback', {token, user, session});

      // pass user.id and status to session 
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          status: token.status
        }
      }
      return session
    },

    async redirect({url, baseUrl}) {
      console.log('url', {url, baseUrl});
      
      return url
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
},
  session: {
    strategy: 'jwt'
  },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };