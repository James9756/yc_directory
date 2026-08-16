
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./utils/prisma"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true
    }),

    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true
    }),
  
    Credentials({
      name:"Credentials",
      credentials:{
        email:{label:"Email",type:"email"},
        password:{label:"Password",type:"password"}
      },

      async authorize(credentials){
        if(!credentials.email || !credentials.password) return null

        const email = credentials.email as string
        const password = credentials.password as string

      const user = await prisma.user.findUnique({
        where:{email}
      })
        if(!user || !user.password) return null
        
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch) return null

        return {
          id:user.id,
          email:user.email,
          name:user.name,
          role: user.role

        }

      }
    })

  ],
  pages:{
    signIn:"/sign-in"
  },
  session:{
    strategy:"jwt"
  },

   callbacks: {
    async jwt({token, user}){
      if(user){
        token.id = user.id
        token.role = user.role
      }
      return token
    },

    async session({session,token}){
      if(session.user){
        session.user.id = token.id as string
        session.user.role = token.role as string
      }

      return session 
    }
  }

})