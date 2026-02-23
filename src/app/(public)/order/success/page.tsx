import { Suspense } from 'react'
import { OrderConfirmation } from '@/components/order/order-confirmation'

export const metadata = {
  title: 'Order Confirmed | GiftOfSong',
  description: 'Your personalized song order has been placed successfully.'
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center'>
          <p className='text-foreground/50'>Loading...</p>
        </div>
      }
    >
      <OrderConfirmation />
    </Suspense>
  )
}
