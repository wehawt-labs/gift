/**
 * Lemon Squeezy constants and configuration.
 * Central source of truth for all LS-related values.
 */

// ─── Plan Enum ───────────────────────────────────────────────

export enum LemonSqueezyPlan {
  STANDARD = 'standard',
  PREMIUM = 'premium'
}

// ─── Pricing (in cents) ──────────────────────────────────────

export const LEMON_SQUEEZY_PRICES: Record<LemonSqueezyPlan, number> = {
  [LemonSqueezyPlan.STANDARD]: 1999,
  [LemonSqueezyPlan.PREMIUM]: 2999
} as const

// ─── Human-readable labels ───────────────────────────────────

export const LEMON_SQUEEZY_PLAN_LABELS: Record<LemonSqueezyPlan, string> = {
  [LemonSqueezyPlan.STANDARD]: 'Standard',
  [LemonSqueezyPlan.PREMIUM]: 'Premium'
} as const

// ─── Environment config ──────────────────────────────────────

export interface LemonSqueezyConfig {
  apiKey: string
  storeId: string
  webhookSecret: string
  variantIds: Record<LemonSqueezyPlan, string>
}

import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'
import { z } from 'zod'

const lemonSqueezyEnvSchema = z.object({
  LEMON_SQUEEZY_API_KEY: z.string().min(1, 'LEMON_SQUEEZY_API_KEY is required'),
  LEMON_SQUEEZY_STORE_ID: z.string().min(1, 'LEMON_SQUEEZY_STORE_ID is required'),
  LEMON_SQUEEZY_WEBHOOK_SECRET: z.string().min(1, 'LEMON_SQUEEZY_WEBHOOK_SECRET is required'),
  LEMON_SQUEEZY_VARIANT_STANDARD: z.string().min(1, 'LEMON_SQUEEZY_VARIANT_STANDARD is required'),
  LEMON_SQUEEZY_VARIANT_PREMIUM: z.string().min(1, 'LEMON_SQUEEZY_VARIANT_PREMIUM is required')
})

/**
 * Reads and validates all required Lemon Squeezy environment variables.
 * Throws at startup if any are missing.
 */
export function getLemonSqueezyConfig(): LemonSqueezyConfig {
  const env = lemonSqueezyEnvSchema.safeParse({
    LEMON_SQUEEZY_API_KEY: process.env.LEMON_SQUEEZY_API_KEY,
    LEMON_SQUEEZY_STORE_ID: process.env.LEMON_SQUEEZY_STORE_ID,
    LEMON_SQUEEZY_WEBHOOK_SECRET: process.env.LEMON_SQUEEZY_WEBHOOK_SECRET,
    LEMON_SQUEEZY_VARIANT_STANDARD: process.env.LEMON_SQUEEZY_VARIANT_STANDARD,
    LEMON_SQUEEZY_VARIANT_PREMIUM: process.env.LEMON_SQUEEZY_VARIANT_PREMIUM
  })

  if (!env.success) {
    const missing = env.error.issues.map((issue) => issue.message).join(', ')
    throw new Error(`Missing or invalid Lemon Squeezy environment variables: ${missing}`)
  }

  // Initialize SDK
  lemonSqueezySetup({
    apiKey: env.data.LEMON_SQUEEZY_API_KEY
  })

  return {
    apiKey: env.data.LEMON_SQUEEZY_API_KEY,
    storeId: env.data.LEMON_SQUEEZY_STORE_ID,
    webhookSecret: env.data.LEMON_SQUEEZY_WEBHOOK_SECRET,
    variantIds: {
      [LemonSqueezyPlan.STANDARD]: env.data.LEMON_SQUEEZY_VARIANT_STANDARD,
      [LemonSqueezyPlan.PREMIUM]: env.data.LEMON_SQUEEZY_VARIANT_PREMIUM
    }
  }
}

/**
 * Gets the LS variant ID for a given plan.
 */
export function getVariantId(plan: LemonSqueezyPlan): string {
  const config = getLemonSqueezyConfig()
  return config.variantIds[plan]
}
