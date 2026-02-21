import crypto from 'node:crypto';
import { and, eq } from 'drizzle-orm';
import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { orders, purchases } from '@/db/schema';
import { resolveUserId } from '@/lib/lemonsqueezy/resolve-user';

/**
 * Verifies the webhook signature from Lemon Squeezy.
 * Uses HMAC-SHA256 with the webhook secret.
 */
function verifySignature(
  rawBody: string,
  signature: string | null,
  secret: string,
): boolean {
  if (!signature) return false;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('LEMON_SQUEEZY_WEBHOOK_SECRET is not set');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 },
      );
    }

    // Read raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature');

    // Verify webhook signature
    if (!verifySignature(rawBody, signature, webhookSecret)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    const eventName: string = payload.meta?.event_name;

    console.log(`[LS Webhook] Received event: ${eventName}`);

    if (eventName === 'order_created') {
      await handleOrderCreated(payload);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('[LS Webhook] Error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 },
    );
  }
}

/**
 * Handles the `order_created` webhook event.
 *
 * 1. Resolves the user (real, by-email, or shadow)
 * 2. Updates the order status to 'paid'
 * 3. Updates/inserts the purchase record
 */
async function handleOrderCreated(payload: Record<string, unknown>) {
  const meta = payload.meta as Record<string, unknown> | undefined;
  const data = payload.data as Record<string, unknown> | undefined;
  const attributes = data?.attributes as Record<string, unknown> | undefined;

  const customData = meta?.custom_data as Record<string, string> | undefined;
  const customUserId = customData?.user_id;
  const customOrderId = customData?.order_id;

  const lsOrderId = String(data?.id ?? '');
  const amountPaid = (attributes?.total as number) ?? 0;
  const buyerEmail = (attributes?.user_email as string) ?? '';
  const buyerName = (attributes?.user_name as string) ?? '';
  const variantId = String(
    (attributes?.first_order_item as Record<string, unknown>)?.variant_id ?? '',
  );

  console.log(
    `[LS Webhook] order_created — user: ${customUserId}, order: ${customOrderId}, email: ${buyerEmail}`,
  );

  // Resolve user ID (handles guest / shadow user creation)
  const userId = await resolveUserId(customUserId, buyerEmail, buyerName);

  // Update order if we have an order ID from custom data
  if (customOrderId) {
    await db
      .update(orders)
      .set({
        status: 'paid',
        lemonSqueezyOrderId: lsOrderId,
        amountPaid,
        userId,
        updatedAt: new Date(),
      })
      .where(eq(orders.id, customOrderId));

    console.log(`[LS Webhook] Order ${customOrderId} updated to paid`);
  }

  // Upsert purchase record
  const [existingPurchase] = await db
    .select({ id: purchases.id })
    .from(purchases)
    .where(
      and(
        eq(purchases.orderId, customOrderId ?? ''),
        eq(purchases.userId, userId),
      ),
    )
    .limit(1);

  if (existingPurchase) {
    // Update existing purchase
    await db
      .update(purchases)
      .set({
        status: 'paid',
        lsOrderId,
        userId,
        updatedAt: new Date(),
      })
      .where(eq(purchases.id, existingPurchase.id));
  } else {
    // Insert new purchase (e.g. if checkout was created without our action)
    await db.insert(purchases).values({
      userId,
      orderId: customOrderId ?? undefined,
      lsOrderId,
      variantId,
      status: 'paid',
    });
  }

  console.log(`[LS Webhook] Purchase recorded for user ${userId}`);
}
