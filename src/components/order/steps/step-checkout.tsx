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

export function StepCheckout({
  validationTrigger
}: {
  validationTrigger: number
}) {
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext<OrderFormData>()

  const data = useWatch()

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='font-bold font-serif text-2xl text-foreground'>
          Review & Checkout
        </h2>
        <p className='mt-1 text-base text-foreground/60'>
          One last look before we start creating.
        </p>
      </div>

      <div className='space-y-6'>
        {/* Plan Selection */}
        <div className='space-y-3'>
          <Label className='font-bold'>Choose your package</Label>
          <div className='grid gap-3 sm:grid-cols-2'>
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
                  'group relative flex flex-col overflow-hidden rounded-xl border-2 p-4 text-left transition-all',
                  data.plan === plan.id
                    ? 'border-primary bg-white ring-4 ring-primary/10'
                    : 'border-foreground/5 bg-white/50 hover:border-foreground/20'
                )}
              >
                {plan.id === 'deluxe' && (
                  <div className='absolute top-0 right-0 rounded-bl-lg bg-primary px-2.5 py-0.5 font-bold text-[9px] text-white uppercase tracking-wider'>
                    Popular
                  </div>
                )}
                <div className='mb-1 flex items-center justify-between'>
                  <span className='font-bold text-base text-foreground'>
                    {plan.name}
                  </span>
                  <span className='font-bold text-primary text-sm'>
                    ${plan.price}
                  </span>
                </div>
                <p className='mb-3 text-foreground/60 text-xs'>
                  {plan.description}
                </p>
                <div className='flex items-center gap-2 font-semibold text-[10px] text-foreground/80'>
                  <Check className='h-2.5 w-2.5 text-accent' />
                  {plan.revisions} Revision Rounds
                </div>
                {plan.id === 'deluxe' && (
                  <div className='mt-0.5 flex items-center gap-2 font-semibold text-[10px] text-foreground/80'>
                    <Check className='h-2.5 w-2.5 text-accent' />
                    Priority Delivery
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <Card className='overflow-hidden rounded-xl border-none bg-white shadow-sm'>
          <div className='bg-foreground px-4 py-2'>
            <h3 className='font-medium text-sm text-white'>Order Details</h3>
          </div>
          <CardContent className='grid gap-4 p-4 sm:grid-cols-2'>
            <div>
              <p className='font-bold text-[10px] text-foreground/40 uppercase tracking-wider'>
                For
              </p>
              <p className='font-medium text-base'>
                {data.recipientName} ({data.recipient})
              </p>
            </div>
            <div>
              <p className='font-bold text-[10px] text-foreground/40 uppercase tracking-wider'>
                Occasion
              </p>
              <p className='font-medium text-base'>{data.occasion}</p>
            </div>
          </CardContent>
        </Card>

        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='buyerName' className='font-semibold'>
              Your Name
            </Label>
            <Input
              id='buyerName'
              placeholder='Full name'
              className='h-10 rounded-xl border-foreground/10 bg-white focus-visible:border-primary focus-visible:ring-primary/20'
              {...register('buyerName')}
            />
            <FormErrorMessage
              message={errors.buyerName?.message as string}
              trigger={validationTrigger}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='buyerEmail' className='font-semibold'>
              Your Email
            </Label>
            <Input
              id='buyerEmail'
              type='email'
              placeholder='email@example.com'
              className='h-10 rounded-xl border-foreground/10 bg-white focus-visible:border-primary focus-visible:ring-primary/20'
              {...register('buyerEmail')}
            />
            <FormErrorMessage
              message={errors.buyerEmail?.message as string}
              trigger={validationTrigger}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
