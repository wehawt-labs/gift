import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className='bg-background py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-center sm:px-16 lg:px-24'>
          {/* Content */}
          <h2 className='font-heading text-3xl font-bold text-background md:text-4xl'>
            Ready to create something beautiful?
          </h2>
          <p className='mx-auto mt-4 max-w-xl text-lg text-background/80'>
            Start your song today and have the perfect gift ready in less than a
            week.
          </p>

          {/* CTA */}
          <div className='mt-8'>
            <Button
              href='/order/new'
              size='lg'
              className='rounded-full bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90'
            >
              Start Your Song - $199
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </div>

          {/* Note */}
          <p className='mt-4 text-sm text-background/60'>
            100% money-back guarantee if you don't love the result.
          </p>
        </div>
      </div>
    </section>
  )
}
