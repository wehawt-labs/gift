/**
 * Lemon Squeezy constants and configuration.
 * Central source of truth for all LS-related values.
 */

// ─── Plan Enum ───────────────────────────────────────────────

export enum LemonSqueezyPlan {
  STANDARD = 'standard',
  PREMIUM = 'premium',
}

// ─── Pricing (in cents) ──────────────────────────────────────

export const LEMON_SQUEEZY_PRICES: Record<LemonSqueezyPlan, number> = {
  [LemonSqueezyPlan.STANDARD]: 1999,
  [LemonSqueezyPlan.PREMIUM]: 2999,
} as const;

// ─── Human-readable labels ───────────────────────────────────

export const LEMON_SQUEEZY_PLAN_LABELS: Record<LemonSqueezyPlan, string> = {
  [LemonSqueezyPlan.STANDARD]: 'Standard',
  [LemonSqueezyPlan.PREMIUM]: 'Premium',
} as const;

// ─── Environment config ──────────────────────────────────────

export interface LemonSqueezyConfig {
  apiKey: string;
  storeId: string;
  webhookSecret: string;
  variantIds: Record<LemonSqueezyPlan, string>;
}

/**
 * Reads and validates all required Lemon Squeezy environment variables.
 * Throws at startup if any are missing.
 */
export function getLemonSqueezyConfig(): LemonSqueezyConfig {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
  const webhookSecret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
  const variantStandard = process.env.LEMON_SQUEEZY_VARIANT_STANDARD;
  const variantPremium = process.env.LEMON_SQUEEZY_VARIANT_PREMIUM;

  const missing: string[] = [];
  if (!apiKey) missing.push('LEMON_SQUEEZY_API_KEY');
  if (!storeId) missing.push('LEMON_SQUEEZY_STORE_ID');
  if (!webhookSecret) missing.push('LEMON_SQUEEZY_WEBHOOK_SECRET');
  if (!variantStandard) missing.push('LEMON_SQUEEZY_VARIANT_STANDARD');
  if (!variantPremium) missing.push('LEMON_SQUEEZY_VARIANT_PREMIUM');

  if (missing.length > 0) {
    throw new Error(
      `Missing Lemon Squeezy environment variables: ${missing.join(', ')}`,
    );
  }

  return {
    apiKey: apiKey!,
    storeId: storeId!,
    webhookSecret: webhookSecret!,
    variantIds: {
      [LemonSqueezyPlan.STANDARD]: variantStandard!,
      [LemonSqueezyPlan.PREMIUM]: variantPremium!,
    },
  };
}

/**
 * Gets the LS variant ID for a given plan.
 */
export function getVariantId(plan: LemonSqueezyPlan): string {
  const config = getLemonSqueezyConfig();
  return config.variantIds[plan];
}
