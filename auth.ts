import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import authorized from "./actions/authorize";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers:
    [
      Credentials({
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
          let user = null
   
          user = await authorized(credentials)
   
          if (!user) {
            // No user found, so this is their first attempt to login
            // Optionally, this is also the place you could do a user registration
            throw new Error("Invalid credentials.")
          }
   
          // return user object with their profile data
          return user
        }
      }),
      GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
      })
    ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/signIn"
  }
})