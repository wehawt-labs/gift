import { betterAuth } from 'better-auth'
// import { drizzleAdapter } from 'better-auth/adapters/drizzle'
// import { db } from '@/db'
// import * as schema from '@/db/schema'
import { resolveUserId } from '@/lib/lemonsqueezy/resolve-user'

export const auth = betterAuth({
  // database: drizzleAdapter(db, {
  //   provider: 'pg',
  //   schema: {
  //     ...schema
  //     // Mapping the "users" table to the "user" table in Drizzle if needed
  //     // But we can just pass the schema and BetterAuth will find its tables
  //   },
  //   usePlural: true
  // }),
  emailAndPassword: {
    enabled: true
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      // TODO: integrate with email provider (e.g. Resend, SendGrid)
      console.log(`[Auth] Verification email for ${user.email}: ${url}`)
    },
    autoSignInAfterVerification: true,
    async afterEmailVerification(user) {
      // When a user verifies their email, merge any shadow user data
      // This handles the case where a guest bought a song, then registered
      await resolveUserId(user.id, user.email, user.name)
      console.log(`[Auth] Email verified & shadow merge checked for ${user.email}`)
    }
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }
  },
  experimental: { joins: true }
})
