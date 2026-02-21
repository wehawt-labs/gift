import { and, eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { db } from '@/db';
import { purchases } from '@/db/schema';
import { auth } from '@/lib/auth';

/**
 * Checks if the current session user has a 'paid' purchase
 * for the given Lemon Squeezy variant ID.
 *
 * @returns `true` if the user has paid for this variant, `false` otherwise.
 */
export async function hasAccess(variantId: string): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return false;
  }

  const [purchase] = await db
    .select({ id: purchases.id })
    .from(purchases)
    .where(
      and(
        eq(purchases.userId, session.user.id),
        eq(purchases.variantId, variantId),
        eq(purchases.status, 'paid'),
      ),
    )
    .limit(1);

  return !!purchase;
}
