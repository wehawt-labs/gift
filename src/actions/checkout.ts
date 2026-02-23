'use server'

import { and, eq, gt } from 'drizzle-orm'
import { headers } from 'next/headers'
import { z } from 'zod'
import { db } from '@/db'
import { orders, purchases } from '@/db/schema'
import { auth } from '@/lib/auth'
import { sendEmail } from '@/lib/email'
import { buildOrderCreatedEmail } from '@/lib/email/templates/order-created'
import { getVariantId, LEMON_SQUEEZY_PLAN_LABELS, LEMON_SQUEEZY_PRICES, LemonSqueezyPlan } from '@/lib/lemonsqueezy'
import { createCheckout } from '@/lib/lemonsqueezy/client'
import { resolveUserId } from '@/lib/lemonsqueezy/resolve-user'

const checkoutSchema = z.object({
  plan: z.nativeEnum(LemonSqueezyPlan),
  recipientName: z.string().min(1),
  recipientRelationship: z.string().min(1),
  occasion: z.string().min(1),
  storyPrompt: z.string().optional().default(''),
  genre: z.string().min(1),
  vibe: z.string().min(1),
  buyerName: z.string().min(1),
  buyerEmail: z.string().email()
})

export type CheckoutInput = z.infer<typeof checkoutSchema>

interface CheckoutResult {
  success: boolean
  checkoutUrl?: string
  orderId?: string
  error?: string
}

/** Reuse window for pending orders: 1 hour */
const PENDING_ORDER_REUSE_WINDOW_MS = 60 * 60 * 1000

export async function createCheckoutSession(input: CheckoutInput): Promise<CheckoutResult> {
  try {
    const data = checkoutSchema.parse(input)

    // Resolve current user from BetterAuth session
    const session = await auth.api.getSession({
      headers: await headers()
    })
    const sessionUserId = session?.user?.id

    // Resolve to a real user ID (find by email or create shadow user)
    const userId = await resolveUserId(sessionUserId, data.buyerEmail, data.buyerName)

    // Map plan to DB tier
    const tier = data.plan as 'standard' | 'premium'
    const variantId = getVariantId(data.plan)

    // Idempotency: reuse a recent pending_payment order for the same user + tier
    const reuseCutoff = new Date(Date.now() - PENDING_ORDER_REUSE_WINDOW_MS)
    const [existingOrder] = await db
      .select({ id: orders.id })
      .from(orders)
      .where(
        and(
          eq(orders.userId, userId),
          eq(orders.tier, tier),
          eq(orders.status, 'pending_payment'),
          gt(orders.createdAt, reuseCutoff)
        )
      )
      .limit(1)

    let orderId: string

    if (existingOrder) {
      // Reuse the existing pending order, update its details
      orderId = existingOrder.id
      await db
        .update(orders)
        .set({
          recipientName: data.recipientName,
          recipientRelationship: data.recipientRelationship,
          occasion: data.occasion,
          storyPrompt: data.storyPrompt ?? '',
          genre: data.genre,
          vibe: data.vibe,
          amountPaid: LEMON_SQUEEZY_PRICES[data.plan],
          updatedAt: new Date()
        })
        .where(eq(orders.id, orderId))

      console.log(`[Checkout] Reusing pending order ${orderId}`)
    } else {
      // Create new order row (pending_payment)
      const [newOrder] = await db
        .insert(orders)
        .values({
          userId,
          tier,
          status: 'pending_payment',
          recipientName: data.recipientName,
          recipientRelationship: data.recipientRelationship,
          occasion: data.occasion,
          storyPrompt: data.storyPrompt ?? '',
          genre: data.genre,
          vibe: data.vibe,
          amountPaid: LEMON_SQUEEZY_PRICES[data.plan]
        })
        .returning({ id: orders.id })

      if (!newOrder) {
        throw new Error('Failed to create order')
      }

      orderId = newOrder.id

      // Create purchase row (pending)
      await db.insert(purchases).values({
        userId,
        orderId,
        variantId,
        status: 'pending'
      })

      console.log(`[Checkout] Created new order ${orderId}`)

      // Fire-and-forget: send "Order Created" email for new orders only
      const appUrl = process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'
      const retryPaymentUrl = `${appUrl}/order/success?orderId=${orderId}`

      void buildOrderCreatedEmail({
        buyerName: data.buyerName,
        recipientName: data.recipientName,
        occasion: data.occasion,
        genre: data.genre,
        vibe: data.vibe,
        plan: LEMON_SQUEEZY_PLAN_LABELS[data.plan] ?? data.plan,
        orderId,
        retryPaymentUrl
      }).then((html) =>
        sendEmail({
          to: data.buyerEmail,
          subject: `Your Song for ${data.recipientName} is Being Crafted! 🎵`,
          html
        })
      )
    }

    // Create LS checkout with userId + orderId in custom data
    const checkout = await createCheckout({
      variantId,
      userId,
      orderId,
      buyerName: data.buyerName,
      buyerEmail: data.buyerEmail
    })

    return {
      success: true,
      checkoutUrl: checkout.url,
      orderId
    }
  } catch (error) {
    console.error('Checkout session error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create checkout'
    }
  }
}
