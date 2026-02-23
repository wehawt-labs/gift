import { eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { orders, users } from '@/db/schema'

interface OrderStatusResponse {
  status: string
  lemonSqueezyOrderId: string | null
  recipientName: string
  occasion: string
  genre: string
  vibe: string
  tier: string
  amountPaid: number | null
  buyerEmail: string | null
  buyerName: string | null
}

/**
 * GET /api/orders/[orderId]/status
 *
 * Returns order status + full details for the confirmation page.
 * Used for polling (waiting for webhook) and for displaying the order summary.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
): Promise<NextResponse<OrderStatusResponse | { error: string }>> {
  try {
    const { orderId } = await params

    if (!orderId) {
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 })
    }

    const [result] = await db
      .select({
        status: orders.status,
        lemonSqueezyOrderId: orders.lemonSqueezyOrderId,
        recipientName: orders.recipientName,
        occasion: orders.occasion,
        genre: orders.genre,
        vibe: orders.vibe,
        tier: orders.tier,
        amountPaid: orders.amountPaid,
        buyerEmail: users.email,
        buyerName: users.name
      })
      .from(orders)
      .leftJoin(users, eq(orders.userId, users.id))
      .where(eq(orders.id, orderId))
      .limit(1)

    if (!result) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({
      status: result.status,
      lemonSqueezyOrderId: result.lemonSqueezyOrderId,
      recipientName: result.recipientName,
      occasion: result.occasion,
      genre: result.genre,
      vibe: result.vibe,
      tier: result.tier,
      amountPaid: result.amountPaid,
      buyerEmail: result.buyerEmail,
      buyerName: result.buyerName
    })
  } catch (error) {
    console.error('[Order Status] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch order status' }, { status: 500 })
  }
}
