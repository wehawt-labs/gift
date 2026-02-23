/**
 * Server-side Lemon Squeezy API client.
 * Creates checkout sessions via the official LS SDK.
 */

import { createCheckout as createLSCheckout } from '@lemonsqueezy/lemonsqueezy.js'
import { getLemonSqueezyConfig } from './constants'

interface CreateCheckoutParams {
  variantId: string
  userId: string
  orderId: string
  buyerName: string
  buyerEmail: string
  redirectUrl?: string
}

interface CheckoutResponse {
  url: string
}

/**
 * Creates a Lemon Squeezy checkout session using the official SDK.
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
  redirectUrl
}: CreateCheckoutParams): Promise<CheckoutResponse> {
  const config = getLemonSqueezyConfig()

  const { data, error } = await createLSCheckout(config.storeId, variantId, {
    checkoutOptions: {
      embed: true
    },
    checkoutData: {
      email: buyerEmail,
      name: buyerName,
      custom: {
        user_id: userId,
        order_id: orderId
      }
    },
    productOptions: {
      redirectUrl: redirectUrl ?? `${process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'}/order/success`
    }
  })

  if (error) {
    console.error('Lemon Squeezy SDK error:', error)
    throw new Error(`Failed to create Lemon Squeezy checkout: ${error.message}`)
  }

  const checkoutUrl = data?.data.attributes.url

  if (!checkoutUrl) {
    throw new Error('No checkout URL returned from Lemon Squeezy')
  }

  return { url: checkoutUrl }
}
