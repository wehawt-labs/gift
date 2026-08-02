'use client'

import { Heart, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PLANS } from './constants'
import type { OrderFormData } from './schema'

export function OrderSummary({ formData }: { formData: OrderFormData }) {
  const selectedPlan = PLANS.find((p) => p.id === formData.plan) || PLANS[0]

  return (
    <Card className='overflow-hidden rounded-xl border-none bg-white shadow-lg'>
      <CardHeader className='border-foreground/5 border-b p-6'>
        <CardTitle className='font-serif text-foreground text-xl'>Your Song</CardTitle>
        <CardDescription className='text-sm'>{selectedPlan.name} Package</CardDescription>
      </CardHeader>

      <CardContent className='space-y-4 p-6'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-muted-foreground'>Package Price</span>
          <span className='font-medium text-foreground'>${selectedPlan.price.toFixed(2)}</span>
        </div>

        <div className='flex items-center gap-2 rounded-lg border border-accent/20 bg-accent/10 px-3 py-2'>
          <Zap className='h-4 w-4 fill-current text-accent' />
          <span className='font-semibold text-accent text-xs'>Priority Delivery - 24 hours</span>
        </div>

        <div className='space-y-3 border-foreground/5 border-y py-4 text-sm'>
          <div className='flex items-center gap-2.5'>
            <div className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/10'>
              <Sparkles className='h-3 w-3 text-primary' />
            </div>
            <span className='font-medium'>{selectedPlan.quota}</span>
          </div>
          {formData.recipient && (
            <div className='flex items-center gap-2.5'>
              <div className='flex h-6 w-6 items-center justify-center rounded-full bg-primary/10'>
                <Heart className='h-3 w-3 text-primary' />
              </div>
              <span className='font-medium'>
                For {formData.recipientName || formData.recipient || 'Someone Special'}
              </span>
            </div>
          )}
        </div>

        <div className='flex items-center justify-between pt-1'>
          <span className='font-bold text-base'>Total</span>
          <span className='font-bold text-primary text-xl'>${selectedPlan.price.toFixed(2)}</span>
        </div>
      </CardContent>

      <CardFooter className='flex flex-col gap-3 bg-foreground/5 p-6'>
        <div className='w-full space-y-2'>
          <Input
            placeholder='Save progress email'
            className='h-9 rounded-lg border-transparent bg-white text-xs focus-visible:ring-primary/20'
          />
          <Button
            variant='ghost'
            size='sm'
            className='w-full rounded-full font-medium text-foreground/70 text-xs hover:text-foreground'
          >
            Save Progress
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
