import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className='bg-background py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center sm:px-16 lg:px-24'>
          {/* Content */}
          <h2 className='font-bold font-heading text-3xl text-background md:text-4xl'>
            Ready to create something beautiful?
          </h2>
          <p className='mx-auto mt-4 max-w-xl text-background/80 text-lg'>
            Start your song today and have the perfect gift ready in just 24 hours.
          </p>

          {/* CTA */}
          <div className='mt-8'>
            <Button
              size='lg'
              className='rounded-full px-8 shadow-lg shadow-primary/30'
              nativeButton={false}
              render={
                <Link href='/order/new'>
                  Start Your Song - $19
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              }
            />
          </div>

          {/* Note */}
          <div className='mt-6 space-y-2'>
            <p className='font-bold text-background text-sm'>⚡ Priority Queue + 24h Express Delivery Included</p>
            <p className='text-background/60 text-xs'>
              Order now to receive your custom song within 24 hours. 100% money-back guarantee.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
