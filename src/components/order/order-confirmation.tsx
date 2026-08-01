'use client'

import { CheckCircle, Home, Loader2, Mail, Music, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { retryCheckout } from '@/actions/retry-checkout'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type OrderStatus = 'waiting' | 'confirmed' | 'needs_attention'

interface OrderDetails {
  recipientName: string
  occasion: string
  genre: string
  vibe: string
  tier: string
  amountPaid: number | null
  buyerEmail: string | null
}

/** Max polling duration before switching to "needs attention" state */
const MAX_POLL_DURATION_MS = 120_000
const POLL_INTERVAL_MS = 3_000

export function OrderConfirmation() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  const [status, setStatus] = useState<OrderStatus>(orderId ? 'waiting' : 'confirmed')
  const [elapsedMs, setElapsedMs] = useState(0)
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [isRetrying, setIsRetrying] = useState(false)
  const timedOutRef = useRef(false)

  const pollOrderStatus = useCallback(async () => {
    if (!orderId || timedOutRef.current) return

    try {
      const response = await fetch(`/api/orders/${orderId}/status`)
      if (!response.ok) {
        console.error('[OrderConfirmation] Poll failed:', response.status)
        return
      }

      const data = await response.json()

      // Store order details for display
      setOrderDetails({
        recipientName: data.recipientName,
        occasion: data.occasion,
        genre: data.genre,
        vibe: data.vibe,
        tier: data.tier,
        amountPaid: data.amountPaid,
        buyerEmail: data.buyerEmail
      })

      if (data.status === 'paid' || data.status === 'in_progress' || data.status === 'completed') {
        setStatus('confirmed')
      }
    } catch (error) {
      console.error('[OrderConfirmation] Poll error:', error)
    }
  }, [orderId])

  useEffect(() => {
    if (status !== 'waiting' || !orderId) return

    // Poll immediately on mount
    pollOrderStatus()

    const intervalId = setInterval(() => {
      setElapsedMs((prev) => {
        const next = prev + POLL_INTERVAL_MS
        if (next >= MAX_POLL_DURATION_MS) {
          // Timeout: switch to "needs attention" instead of auto-confirming
          timedOutRef.current = true
          setStatus('needs_attention')
          clearInterval(intervalId)
          return next
        }
        return next
      })
      pollOrderStatus()
    }, POLL_INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [status, orderId, pollOrderStatus])

  const handleRetryPayment = async () => {
    if (!orderId) return
    setIsRetrying(true)

    try {
      const result = await retryCheckout(orderId)

      if (!result.success || !result.checkoutUrl) {
        toast.error('Could not restart checkout', {
          description: result.error ?? 'Please try again or contact support.'
        })
        return
      }

      // Open LS overlay or redirect
      if (window.LemonSqueezy) {
        window.LemonSqueezy.Url.Open(result.checkoutUrl)
      } else {
        window.location.href = result.checkoutUrl
      }
    } catch (error) {
      console.error('[OrderConfirmation] Retry error:', error)
      toast.error('Something went wrong', {
        description: 'Please try again or contact support.'
      })
    } finally {
      setIsRetrying(false)
    }
  }

  const formatAmount = (cents: number | null): string => {
    if (!cents) return ''
    return `$${(cents / 100).toFixed(2)}`
  }

  const formatTier = (tier: string): string => {
    return tier.charAt(0).toUpperCase() + tier.slice(1)
  }

  return (
    <div className='flex min-h-screen items-center justify-center px-6 py-16'>
      <div className='mx-auto max-w-md text-center'>
        {/* ─── Waiting State ─── */}
        {status === 'waiting' && (
          <>
            <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/20'>
              <Loader2 className='h-10 w-10 animate-spin text-primary' />
            </div>

            <h1 className='mb-3 font-bold font-heading text-3xl text-foreground'>Confirming Your Order...</h1>
            <p className='mb-2 text-foreground/70 text-lg'>Please wait while we verify everything.</p>
            <p className='mb-8 text-foreground/50 text-sm'>
              This usually takes just a few seconds. Don&apos;t close this page.
            </p>

            <div className='mb-8 rounded-2xl border border-primary/20 bg-white p-6 shadow-sm'>
              <div className='mb-3 h-1.5 overflow-hidden rounded-full bg-primary/10'>
                <div
                  className='h-full rounded-full bg-primary transition-all duration-1000 ease-linear'
                  style={{ width: `${Math.min((elapsedMs / MAX_POLL_DURATION_MS) * 100, 100)}%` }}
                />
              </div>
              <div className='flex items-center justify-center gap-2 text-primary'>
                <Music className='h-5 w-5' />
                <span className='font-semibold text-sm'>Verifying with payment provider...</span>
              </div>
            </div>
          </>
        )}

        {/* ─── Confirmed State ─── */}
        {status === 'confirmed' && (
          <>
            <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20'>
              <CheckCircle className='h-10 w-10 text-accent' />
            </div>

            <h1 className='mb-3 font-bold font-heading text-3xl text-foreground'>Thank You! 🎶</h1>
            <p className='mb-2 text-foreground/70 text-lg'>Your order has been placed successfully.</p>
            <p className='mb-6 text-foreground/50 text-sm'>Our Song Chef is warming up! We&apos;ll be in touch soon.</p>

            {/* Order Summary Card */}
            {orderDetails && (
              <div className='mb-6 rounded-2xl border border-accent/20 bg-white p-6 text-left shadow-sm'>
                <div className='mb-4 flex items-center gap-2 text-accent'>
                  <Music className='h-5 w-5' />
                  <span className='font-semibold text-sm uppercase tracking-wider'>Your Song Details</span>
                </div>

                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-foreground/60'>For</span>
                    <span className='font-medium text-foreground'>{orderDetails.recipientName}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-foreground/60'>Occasion</span>
                    <span className='font-medium text-foreground'>{orderDetails.occasion}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-foreground/60'>Genre</span>
                    <span className='font-medium text-foreground'>{orderDetails.genre}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-foreground/60'>Vibe</span>
                    <span className='font-medium text-foreground'>{orderDetails.vibe}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-foreground/60'>Plan</span>
                    <span className='font-medium text-foreground'>{formatTier(orderDetails.tier)}</span>
                  </div>
                  {orderDetails.amountPaid && (
                    <div className='flex justify-between border-foreground/10 border-t pt-2'>
                      <span className='text-foreground/60'>Amount</span>
                      <span className='font-semibold text-foreground'>{formatAmount(orderDetails.amountPaid)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Email confirmation note */}
            {orderDetails?.buyerEmail && (
              <div className='mb-6 flex items-center justify-center gap-2 rounded-xl bg-primary/5 px-4 py-3 text-foreground/60 text-sm'>
                <Mail className='h-4 w-4 shrink-0' />
                <span>
                  Confirmation sent to <strong className='text-foreground/80'>{orderDetails.buyerEmail}</strong>
                </span>
              </div>
            )}

            {/* Refinement note */}
            <div className='mb-8 rounded-xl border-amber-400/60 border-l-4 bg-amber-50/50 px-4 py-3 text-left text-foreground/70 text-sm'>
              <p className='font-medium text-foreground/80'>💡 Want to adjust your song details?</p>
              <p className='mt-1'>
                You can always refine your preferences — just reply to your confirmation email or contact our support
                team.
              </p>
            </div>

            <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
              <Link
                href={`/song/${orderId || 'ord_98231'}`}
                className={cn(
                  buttonVariants({ size: 'default' }),
                  'rounded-full bg-primary px-8 font-heading font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 gap-2'
                )}
              >
                <Music className='h-4 w-4' />
                Listen to Sample Song Page 🎶
              </Link>
              <Link
                href='/'
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'default' }),
                  'rounded-full px-6 font-semibold'
                )}
              >
                <Home className='mr-2 h-4 w-4' />
                Back to Home
              </Link>
            </div>
          </>
        )}

        {/* ─── Needs Attention State ─── */}
        {status === 'needs_attention' && (
          <>
            <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100'>
              <RefreshCw className='h-10 w-10 text-amber-600' />
            </div>

            <h1 className='mb-3 font-bold font-heading text-3xl text-foreground'>Almost There!</h1>
            <p className='mb-2 text-foreground/70 text-lg'>Looks like your order is still processing.</p>
            <p className='mb-8 text-foreground/50 text-sm'>
              This can happen if the payment window was closed. No worries — you can try again below, or check the email
              we sent you.
            </p>

            {/* Order summary if available */}
            {orderDetails && (
              <div className='mb-6 rounded-2xl border border-amber-200 bg-white p-6 text-left shadow-sm'>
                <div className='mb-4 flex items-center gap-2 text-amber-600'>
                  <Music className='h-5 w-5' />
                  <span className='font-semibold text-sm uppercase tracking-wider'>Your Song Details</span>
                </div>

                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-foreground/60'>For</span>
                    <span className='font-medium text-foreground'>{orderDetails.recipientName}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-foreground/60'>Occasion</span>
                    <span className='font-medium text-foreground'>{orderDetails.occasion}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-foreground/60'>Genre</span>
                    <span className='font-medium text-foreground'>{orderDetails.genre}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-foreground/60'>Vibe</span>
                    <span className='font-medium text-foreground'>{orderDetails.vibe}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-foreground/60'>Plan</span>
                    <span className='font-medium text-foreground'>{formatTier(orderDetails.tier)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
              <button
                type='button'
                onClick={handleRetryPayment}
                disabled={isRetrying}
                className={cn(
                  buttonVariants({ size: 'default' }),
                  'rounded-full bg-primary px-8 font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-50'
                )}
              >
                {isRetrying ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Reopening Checkout...
                  </>
                ) : (
                  <>
                    <RefreshCw className='mr-2 h-4 w-4' />
                    Complete Your Order
                  </>
                )}
              </button>

              <Link
                href='/'
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'default' }),
                  'rounded-full px-8 font-semibold'
                )}
              >
                <Home className='mr-2 h-4 w-4' />
                Back to Home
              </Link>
            </div>

            {/* Subtle email reminder */}
            <p className='mt-6 text-foreground/40 text-xs'>
              We also sent you an email with a link to complete your order. Check your inbox if you prefer.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
