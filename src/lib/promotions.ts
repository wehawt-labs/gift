import { and, desc, eq, gte, lte } from 'drizzle-orm'
import { db } from '@/db'
import { promotions } from '@/db/schema'

export interface PromotionContent {
  badgeText: string
  ctaNote: string
  ctaSubtext: string
  summaryLabel: string
}

export const DEFAULT_PROMOTION: PromotionContent = {
  badgeText: '✨ PERSONALIZED SONGS • 24H EXPRESS DELIVERY',
  ctaNote: '⚡ Priority Queue + 24h Delivery Included',
  ctaSubtext: 'Start your order today. 100% money-back guarantee.',
  summaryLabel: 'Special Price'
}

/**
 * Fallback static campaigns based on month/day rules
 */
const STATIC_CAMPAIGNS = [
  {
    startMonth: 2,
    startDay: 1,
    endMonth: 2,
    endDay: 15,
    badgeText: '💝 VALENTINE SALE: STARTING AT $19 • 24H DELIVERY',
    ctaNote: "💝 Valentine's Special: Priority Queue + 24h Delivery Included",
    ctaSubtext: "Order now to get your personalized song in time for Valentine's Day.",
    summaryLabel: 'Valentine Sale Price'
  },
  {
    startMonth: 5,
    startDay: 1,
    endMonth: 5,
    endDay: 15,
    badgeText: "💐 MOTHER'S DAY SPECIAL: STARTING AT $19 • 24H DELIVERY",
    ctaNote: "💐 Mother's Day Special: Priority Queue + 24h Delivery Included",
    ctaSubtext: 'Give Mom a gift she will remember forever. 100% money-back guarantee.',
    summaryLabel: "Mother's Day Special Price"
  },
  {
    startMonth: 12,
    startDay: 15,
    endMonth: 12,
    endDay: 31,
    badgeText: '🎄 HOLIDAY SPECIAL: STARTING AT $19 • 24H DELIVERY',
    ctaNote: '🎄 Holiday Special: Priority Queue + 24h Delivery Included',
    ctaSubtext: 'Give a unique musical gift this holiday season.',
    summaryLabel: 'Holiday Special Price'
  }
]

/**
 * Fetches the currently active promotion from database (Supabase),
 * or falls back to date-based seasonal campaigns if DB is unconfigured.
 */
export async function getActivePromotion(): Promise<PromotionContent> {
  try {
    const now = new Date()

    // 1. Query Supabase/Database for active promotion within date range
    if (process.env.DATABASE_URL) {
      const activePromos = await db
        .select()
        .from(promotions)
        .where(and(eq(promotions.isActive, true), lte(promotions.startDate, now), gte(promotions.endDate, now)))
        .orderBy(desc(promotions.priority))
        .limit(1)

      if (activePromos.length > 0) {
        const promo = activePromos[0]
        return {
          badgeText: promo.badgeText,
          ctaNote: promo.ctaNote,
          ctaSubtext: promo.ctaSubtext || DEFAULT_PROMOTION.ctaSubtext,
          summaryLabel: promo.summaryLabel || DEFAULT_PROMOTION.summaryLabel
        }
      }
    }
  } catch (error) {
    console.warn('Failed to fetch promotion from DB, using fallback date rule:', error)
  }

  // 2. Fallback: Check date rules
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()

  const matched = STATIC_CAMPAIGNS.find((c) => {
    return month === c.startMonth && day >= c.startDay && day <= c.endDay
  })

  return matched || DEFAULT_PROMOTION
}
