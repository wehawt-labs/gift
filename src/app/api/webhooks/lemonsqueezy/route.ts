import crypto from 'node:crypto'
import { eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { orders, purchases } from '@/db/schema'
import { sendEmail } from '@/lib/email'
import { buildOrderThankYouEmail } from '@/lib/email/templates/order-thankyou'
import { LEMON_SQUEEZY_PLAN_LABELS, type LemonSqueezyPlan } from '@/lib/lemonsqueezy'
import { resolveUserId } from '@/lib/lemonsqueezy/resolve-user'

/**
 * Verifies the webhook signature from Lemon Squeezy.
 * Uses HMAC-SHA256 with the webhook secret.
 */
function verifySignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(rawBody).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

export async function POST(request: NextRequest) {
  let lsOrderId = 'unknown'
  try {
    const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('[LS Webhook] LEMON_SQUEEZY_WEBHOOK_SECRET is not set')
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
    }

    // Read raw body for signature verification
    const rawBody = await request.text()
    const signature = request.headers.get('x-signature')

    // Verify webhook signature
    if (!verifySignature(rawBody, signature, webhookSecret)) {
      console.error('[LS Webhook] Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload = JSON.parse(rawBody)
    const eventName: string = payload.meta?.event_name
    lsOrderId = String(payload.data?.id ?? 'unknown')

    console.log(`[LS Webhook] Received event: ${eventName}, lsOrderId: ${lsOrderId}`)

    if (eventName === 'order_created') {
      await handleOrderCreated(payload)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    // Structured error logging with context for easier debugging
    console.error('[LS Webhook] Processing failed', {
      lsOrderId,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

/**
 * Handles the `order_created` webhook event.
 *
 * 1. Resolves the user (real, by-email, or shadow)
 * 2. Updates the order status to 'paid'
 * 3. Atomically upserts the purchase record (idempotent on retry)
 */
async function handleOrderCreated(payload: Record<string, unknown>) {
  const meta = payload.meta as Record<string, unknown> | undefined
  const data = payload.data as Record<string, unknown> | undefined
  const attributes = data?.attributes as Record<string, unknown> | undefined

  const customData = meta?.custom_data as Record<string, string> | undefined
  const customUserId = customData?.user_id
  const customOrderId = customData?.order_id

  const lsOrderId = String(data?.id ?? '')
  const amountPaid = (attributes?.total as number) ?? 0
  const buyerEmail = (attributes?.user_email as string) ?? ''
  const buyerName = (attributes?.user_name as string) ?? ''
  const variantId = String((attributes?.first_order_item as Record<string, unknown>)?.variant_id ?? '')

  console.log('[LS Webhook] order_created', { customUserId, customOrderId, buyerEmail, lsOrderId })

  // Resolve user ID (handles guest / shadow user creation)
  const userId = await resolveUserId(customUserId, buyerEmail, buyerName)

  // Update order if we have an order ID from custom data
  if (customOrderId) {
    const updateResult = await db
      .update(orders)
      .set({
        status: 'paid',
        lemonSqueezyOrderId: lsOrderId,
        amountPaid,
        userId,
        updatedAt: new Date()
      })
      .where(eq(orders.id, customOrderId))
      .returning({ id: orders.id })

    if (updateResult.length === 0) {
      console.warn(`[LS Webhook] Order ${customOrderId} not found in DB — may have been deleted`)
    } else {
      console.log(`[LS Webhook] Order ${customOrderId} updated to paid`)
    }
  }

  // Atomic upsert: use lsOrderId (unique) to prevent race condition on retries
  await db
    .insert(purchases)
    .values({
      userId,
      orderId: customOrderId ?? undefined,
      lsOrderId,
      variantId,
      status: 'paid'
    })
    .onConflictDoUpdate({
      target: purchases.lsOrderId,
      set: {
        status: 'paid',
        userId,
        updatedAt: new Date()
      }
    })

  console.log(`[LS Webhook] Purchase upserted for user ${userId}, lsOrder ${lsOrderId}`)

  // Fire-and-forget: send "Thank You" email after payment confirmed
  if (customOrderId) {
    const [orderDetails] = await db
      .select({
        recipientName: orders.recipientName,
        occasion: orders.occasion,
        genre: orders.genre,
        vibe: orders.vibe,
        tier: orders.tier,
        amountPaid: orders.amountPaid
      })
      .from(orders)
      .where(eq(orders.id, customOrderId))
      .limit(1)

    if (orderDetails && buyerEmail) {
      const amountStr = orderDetails.amountPaid ? `$${(orderDetails.amountPaid / 100).toFixed(2)}` : 'N/A'

      void buildOrderThankYouEmail({
        buyerName: buyerName || 'there',
        recipientName: orderDetails.recipientName,
        occasion: orderDetails.occasion,
        genre: orderDetails.genre,
        vibe: orderDetails.vibe,
        plan: LEMON_SQUEEZY_PLAN_LABELS[orderDetails.tier as LemonSqueezyPlan] ?? orderDetails.tier,
        orderId: customOrderId,
        amountPaid: amountStr
      }).then((html) =>
        sendEmail({
          to: buyerEmail,
          subject: 'Thank You! Your Song is on the Way \uD83C\uDFB6',
          html
        })
      )
    }
  }
}
