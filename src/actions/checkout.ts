'use server';

import { headers } from 'next/headers';
import { z } from 'zod';
import { db } from '@/db';
import { orders, purchases } from '@/db/schema';
import { auth } from '@/lib/auth';
import {
  LemonSqueezyPlan,
  LEMON_SQUEEZY_PRICES,
  getVariantId,
} from '@/lib/lemonsqueezy';
import { createCheckout } from '@/lib/lemonsqueezy/client';
import { resolveUserId } from '@/lib/lemonsqueezy/resolve-user';

const checkoutSchema = z.object({
  plan: z.nativeEnum(LemonSqueezyPlan),
  recipientName: z.string().min(1),
  recipientRelationship: z.string().min(1),
  occasion: z.string().min(1),
  storyPrompt: z.string().optional().default(''),
  genre: z.string().min(1),
  vibe: z.string().min(1),
  buyerName: z.string().min(1),
  buyerEmail: z.string().email(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

interface CheckoutResult {
  success: boolean;
  checkoutUrl?: string;
  error?: string;
}

export async function createCheckoutSession(
  input: CheckoutInput,
): Promise<CheckoutResult> {
  try {
    const data = checkoutSchema.parse(input);

    // Resolve current user from BetterAuth session
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const sessionUserId = session?.user?.id;

    // Resolve to a real user ID (find by email or create shadow user)
    const userId = await resolveUserId(
      sessionUserId,
      data.buyerEmail,
      data.buyerName,
    );

    // Map plan to DB tier
    const tier = data.plan as 'standard' | 'premium';
    const variantId = getVariantId(data.plan);

    // Create order row (pending_payment)
    const [order] = await db
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
        amountPaid: LEMON_SQUEEZY_PRICES[data.plan],
      })
      .returning({ id: orders.id });

    if (!order) {
      throw new Error('Failed to create order');
    }

    // Create purchase row (pending)
    await db.insert(purchases).values({
      userId,
      orderId: order.id,
      variantId,
      status: 'pending',
    });

    // Create LS checkout with userId + orderId in custom data
    const checkout = await createCheckout({
      variantId,
      userId,
      orderId: order.id,
      buyerName: data.buyerName,
      buyerEmail: data.buyerEmail,
    });

    return {
      success: true,
      checkoutUrl: checkout.url,
    };
  } catch (error) {
    console.error('Checkout session error:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create checkout',
    };
  }
}
