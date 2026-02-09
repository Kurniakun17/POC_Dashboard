import NextAuth from "next-auth"
import { authOptions } from "./auth"

export const { auth, signIn, signOut, handlers } = NextAuth(authOptions)
