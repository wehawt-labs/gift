import crypto from 'node:crypto';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { users } from '@/db/schema';

/**
 * Resolves a user ID for the given context.
 *
 * - If `sessionUserId` is a real (non-guest) ID, returns it directly.
 * - Otherwise, looks up the user by email.
 * - If no user exists, creates a "shadow" user record.
 */
export async function resolveUserId(
  sessionUserId: string | undefined,
  email: string,
  name: string,
): Promise<string> {
  // If we have a real (non-guest) user ID, verify it exists
  if (sessionUserId && sessionUserId !== 'guest') {
    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.id, sessionUserId))
      .limit(1);

    if (existing) return existing.id;
  }

  // Look up by email
  const [byEmail] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (byEmail) return byEmail.id;

  // Create a shadow user
  const shadowId = crypto.randomUUID();
  const now = new Date();

  await db.insert(users).values({
    id: shadowId,
    name: name || 'Guest',
    email,
    emailVerified: false,
    createdAt: now,
    updatedAt: now,
    role: 'user',
  });

  console.log(`[resolveUserId] Created shadow user ${shadowId} for ${email}`);
  return shadowId;
}
