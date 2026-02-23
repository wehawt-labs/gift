'use server'

import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { orders, users } from '@/db/schema'
import { getVariantId, type LemonSqueezyPlan } from '@/lib/lemonsqueezy'
import { createCheckout } from '@/lib/lemonsqueezy/client'

interface RetryCheckoutResult {
  success: boolean
  checkoutUrl?: string
  error?: string
}

/**
 * Re-generates a Lemon Squeezy checkout URL for an existing pending order.
 *
 * Accessible by orderId (no auth required) — both guests and registered
 * users can retry since they know the orderId from the URL or email.
 */
export async function retryCheckout(orderId: string): Promise<RetryCheckoutResult> {
  try {
    if (!orderId) {
      return { success: false, error: 'Missing order ID' }
    }

    // Fetch the order + user email for LS checkout pre-fill
    const [order] = await db
      .select({
        id: orders.id,
        userId: orders.userId,
        tier: orders.tier,
        status: orders.status,
        recipientName: orders.recipientName
      })
      .from(orders)
      .where(eq(orders.id, orderId))
      .limit(1)

    if (!order) {
      return { success: false, error: 'Order not found' }
    }

    if (order.status !== 'pending_payment') {
      // Order already paid or beyond — no retry needed
      return { success: false, error: 'Order is no longer pending payment' }
    }

    // Get user's email + name for checkout pre-fill
    const [user] = await db
      .select({ email: users.email, name: users.name })
      .from(users)
      .where(eq(users.id, order.userId))
      .limit(1)

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    const variantId = getVariantId(order.tier as LemonSqueezyPlan)

    const checkout = await createCheckout({
      variantId,
      userId: order.userId,
      orderId: order.id,
      buyerName: user.name,
      buyerEmail: user.email
    })

    return {
      success: true,
      checkoutUrl: checkout.url
    }
  } catch (error) {
    console.error('[RetryCheckout] Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create checkout'
    }
  }
}
