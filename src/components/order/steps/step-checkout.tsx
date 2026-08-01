'use client'

import { Check } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { PLANS } from '../constants'
import type { OrderFormData } from '../schema'

export function StepCheckout({ validationTrigger }: { validationTrigger: number }) {
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext<OrderFormData>()

  const data = useWatch()

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='font-bold font-heading text-2xl text-foreground'>Review & Checkout</h2>
        <p className='mt-1 text-sm text-muted-foreground font-sans'>Choose your package and provide your details to complete the order.</p>
      </div>

      <div className='space-y-6'>
        {/* Plan Selection */}
        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm'>
          <Label className='font-semibold font-heading text-base text-foreground'>Choose your package</Label>
          <div className='grid gap-4 sm:grid-cols-2'>
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                type='button'
                onClick={() =>
                  setValue('plan', plan.id, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                className={cn(
                  'group relative flex flex-col overflow-hidden rounded-xl border-2 p-5 text-left transition-all active:scale-[0.98]',
                  data.plan === plan.id
                    ? 'border-primary bg-background shadow-md ring-2 ring-primary/20'
                    : 'border-transparent bg-background/60 hover:bg-background hover:border-border'
                )}
              >
                {plan.id === 'premium' && (
                  <div className='absolute top-0 right-0 rounded-bl-lg bg-primary px-3 py-1 font-bold text-[10px] text-white uppercase tracking-wider font-heading'>
                    Most Popular
                  </div>
                )}
                <div className='mb-2 flex items-center justify-between'>
                  <span className='font-bold font-heading text-lg text-foreground'>{plan.name}</span>
                  <span className='font-bold font-heading text-primary text-base'>${plan.price}</span>
                </div>
                <p className='mb-4 text-muted-foreground text-xs font-sans leading-relaxed'>{plan.description}</p>
                <div className='space-y-1.5 mt-auto'>
                  <div className='flex items-center gap-2 font-semibold text-xs text-foreground font-sans'>
                    <Check className='h-3.5 w-3.5 text-accent stroke-[3]' />
                    {plan.revisions} Revision Rounds
                  </div>
                  {plan.id === 'premium' && (
                    <div className='flex items-center gap-2 font-semibold text-xs text-foreground font-sans'>
                      <Check className='h-3.5 w-3.5 text-accent stroke-[3]' />
                      Priority Delivery (24 Hours)
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Order Details Summary Card */}
        <Card className='overflow-hidden rounded-2xl border border-foreground/5 bg-card shadow-sm'>
          <div className='bg-primary/10 px-5 py-3 border-b border-primary/10'>
            <h3 className='font-bold font-heading text-sm text-primary'>Order Summary</h3>
          </div>
          <CardContent className='grid gap-4 p-5 sm:grid-cols-2'>
            <div>
              <p className='font-bold text-[10px] text-muted-foreground uppercase tracking-wider font-heading'>Recipient</p>
              <p className='font-semibold font-sans text-base text-foreground mt-0.5'>
                {data.recipientName || 'Not specified'} ({data.recipient})
              </p>
            </div>
            <div>
              <p className='font-bold text-[10px] text-muted-foreground uppercase tracking-wider font-heading'>Occasion</p>
              <p className='font-semibold font-sans text-base text-foreground mt-0.5'>{data.occasion}</p>
            </div>
          </CardContent>
        </Card>

        {/* User Info Fields */}
        <div className='bg-card rounded-2xl p-5 border border-foreground/5 grid gap-5 sm:grid-cols-2 shadow-sm'>
          <div className='space-y-2'>
            <Label htmlFor='buyerName' className='font-semibold font-heading text-foreground'>
              Your Name
            </Label>
            <Input
              id='buyerName'
              placeholder='Full name'
              className='h-11 rounded-xl border-border bg-background px-4 font-sans text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20'
              {...register('buyerName')}
            />
            <FormErrorMessage message={errors.buyerName?.message as string} trigger={validationTrigger} />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='buyerEmail' className='font-semibold font-heading text-foreground'>
              Your Email
            </Label>
            <Input
              id='buyerEmail'
              type='email'
              placeholder='email@example.com'
              className='h-11 rounded-xl border-border bg-background px-4 font-sans text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20'
              {...register('buyerEmail')}
            />
            <FormErrorMessage message={errors.buyerEmail?.message as string} trigger={validationTrigger} />
          </div>
        </div>
      </div>
    </div>
  )
}
