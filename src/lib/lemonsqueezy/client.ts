/**
 * Server-side Lemon Squeezy API client.
 * Creates checkout sessions via the LS API.
 */

import { getLemonSqueezyConfig } from './constants';

const LEMON_SQUEEZY_API_BASE = 'https://api.lemonsqueezy.com/v1';

interface CreateCheckoutParams {
  variantId: string;
  userId: string;
  orderId: string;
  buyerName: string;
  buyerEmail: string;
  redirectUrl?: string;
}

interface CheckoutResponse {
  url: string;
}

/**
 * Creates a Lemon Squeezy checkout session.
 *
 * - Pre-fills customer name & email
 * - Passes userId + orderId as custom data for webhook correlation
 * - Enables embed mode for checkout overlay
 */
export async function createCheckout({
  variantId,
  userId,
  orderId,
  buyerName,
  buyerEmail,
  redirectUrl,
}: CreateCheckoutParams): Promise<CheckoutResponse> {
  const config = getLemonSqueezyConfig();

  const payload = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_options: {
          embed: true,
        },
        checkout_data: {
          email: buyerEmail,
          name: buyerName,
          custom: {
            user_id: userId,
            order_id: orderId,
          },
        },
        product_options: {
          redirect_url:
            redirectUrl ??
            `${process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'}/order/success`,
        },
      },
      relationships: {
        store: {
          data: {
            type: 'stores',
            id: config.storeId,
          },
        },
        variant: {
          data: {
            type: 'variants',
            id: variantId,
          },
        },
      },
    },
  };

  const response = await fetch(`${LEMON_SQUEEZY_API_BASE}/checkouts`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error('Lemon Squeezy checkout error:', errorBody);
    throw new Error(
      `Failed to create Lemon Squeezy checkout: ${response.status}`,
    );
  }

  const result = await response.json();
  const checkoutUrl = result.data?.attributes?.url;

  if (!checkoutUrl) {
    throw new Error('No checkout URL returned from Lemon Squeezy');
  }

  return { url: checkoutUrl };
}
