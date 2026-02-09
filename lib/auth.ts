import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions = {
  // JWT-only strategy - No database sessions!
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Validate credentials exist
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password harus diisi")
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        // Check if user exists
        if (!user) {
          throw new Error("Email atau password salah")
        }

        // Verify password
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          throw new Error("Email atau password salah")
        }

        // Return user object (will be stored in JWT)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        }
      }
    })
  ],

  // Callback functions
  callbacks: {
    // JWT callback - Add custom data to token
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.role = user.role
      }

      // Update token on session update
      if (trigger === "update" && session) {
        token.name = session.name
        token.email = session.email
      }

      return token
    },

    // Session callback - Add custom data to session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }

      return session
    }
  },

  // Custom pages
  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login on error
  },

  // Security
  secret: process.env.NEXTAUTH_SECRET,
}
