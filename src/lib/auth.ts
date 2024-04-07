import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import type { NextAuthConfig } from "next-auth"
import { db } from "./db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"

// For more information on each option (and a full list of options) go to
// https://authjs.dev/reference/configuration/auth-options
export const config = {
  // https://authjs.dev/reference/core/providers
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  adapter: DrizzleAdapter(db),
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config)