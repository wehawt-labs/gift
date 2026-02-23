import crypto from 'node:crypto'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { orders, purchases, users } from '@/db/schema'

/**
 * Resolves a user ID for the given context.
 *
 * Priority:
 * 1. If `sessionUserId` is a real (non-guest) ID, use it.
 *    - If a shadow user exists with the same email, merge shadow data into real user.
 * 2. Otherwise, look up existing user by email.
 * 3. If no user exists, create a "shadow" user record.
 */
export async function resolveUserId(sessionUserId: string | undefined, email: string, name: string): Promise<string> {
  // If we have a real (non-guest) user ID, verify it exists
  if (sessionUserId && sessionUserId !== 'guest') {
    const [existing] = await db
      .select({ id: users.id, email: users.email })
      .from(users)
      .where(eq(users.id, sessionUserId))
      .limit(1)

    if (existing) {
      // Check for a shadow user with the same email that needs merging
      await mergeShadowUser(existing.id, existing.email)
      return existing.id
    }
  }

  // Look up by email
  const [byEmail] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1)

  if (byEmail) return byEmail.id

  // Create a shadow user
  const shadowId = crypto.randomUUID()
  const now = new Date()

  await db.insert(users).values({
    id: shadowId,
    name: name || 'Guest',
    email,
    emailVerified: false,
    createdAt: now,
    updatedAt: now,
    role: 'user'
  })

  console.log(`[resolveUserId] Created shadow user ${shadowId} for ${email}`)
  return shadowId
}

/**
 * Merges a shadow user's data into the real authenticated user.
 *
 * When a guest purchases a song and later registers with the same email,
 * BetterAuth creates a new user record. This function migrates all
 * orders and purchases from the shadow user to the real user, then
 * deletes the shadow record to prevent duplicates.
 *
 * Uses email uniqueness constraint: if `realUserId` owns a different
 * row than the shadow, the shadow's data is migrated.
 */
async function mergeShadowUser(realUserId: string, realEmail: string): Promise<void> {
  // Find shadow users with the same email but different ID
  const shadowUsers = await db.select({ id: users.id }).from(users).where(eq(users.email, realEmail))

  const shadowIds = shadowUsers.map((u) => u.id).filter((id) => id !== realUserId)

  if (shadowIds.length === 0) return

  for (const shadowId of shadowIds) {
    // Migrate orders from shadow to real user
    await db.update(orders).set({ userId: realUserId, updatedAt: new Date() }).where(eq(orders.userId, shadowId))

    // Migrate purchases from shadow to real user
    await db.update(purchases).set({ userId: realUserId, updatedAt: new Date() }).where(eq(purchases.userId, shadowId))

    // Delete the shadow user (no longer needed)
    await db.delete(users).where(eq(users.id, shadowId))

    console.log(`[resolveUserId] Merged shadow user ${shadowId} into ${realUserId}`)
  }
}
