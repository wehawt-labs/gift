'use client'

import { Check, Gift } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LemonSqueezyPlan } from '@/lib/lemonsqueezy/constants'
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

        {/* Dedicated Keepsake Web Page Add-On Selection */}
        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Gift className='h-5 w-5 text-primary' />
              <Label className='font-semibold font-heading text-base text-foreground'>
                Dedicated Keepsake Web Page URL
              </Label>
            </div>
            {data.plan === LemonSqueezyPlan.PREMIUM ? (
              <span className='rounded-full bg-emerald-500/20 px-3 py-1 font-bold text-[10px] text-emerald-700 uppercase font-heading tracking-wider'>
                FREE with Premium ⭐
              </span>
            ) : (
              <span className='rounded-full bg-primary/10 px-3 py-1 font-bold text-xs text-primary font-heading'>
                +$5.00 Add-on
              </span>
            )}
          </div>

          <p className='text-xs text-muted-foreground font-sans leading-relaxed'>
            Give your recipient a unique custom web URL (e.g. <span className='font-mono font-semibold text-foreground'>giftofsong.com/song/for-{data.recipientName ? data.recipientName.toLowerCase().replace(/\s+/g, '-') : 'you'}</span>) featuring an interactive audio player, waveform animation, lyrics, and share buttons.
          </p>

          {data.plan === LemonSqueezyPlan.PREMIUM ? (
            <div className='flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-800 font-sans'>
              <Check className='h-4 w-4 text-emerald-600 stroke-[3]' />
              <span>Dedicated Private Web Page is automatically included FREE with your Premium package!</span>
            </div>
          ) : (
            <button
              type='button'
              onClick={() => setValue('hasDedicatedUrlAddon', !data.hasDedicatedUrlAddon, { shouldValidate: true, shouldDirty: true })}
              className={cn(
                'w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all active:scale-[0.98] text-left',
                data.hasDedicatedUrlAddon
                  ? 'border-primary bg-background shadow-md ring-2 ring-primary/20'
                  : 'border-border bg-background/60 hover:bg-background'
              )}
            >
              <div className='flex items-center gap-3'>
                <div className={cn(
                  'h-5 w-5 rounded border flex items-center justify-center transition-colors',
                  data.hasDedicatedUrlAddon ? 'bg-primary border-primary text-white' : 'border-muted-foreground'
                )}>
                  {data.hasDedicatedUrlAddon && <Check className='h-3.5 w-3.5 stroke-[3]' />}
                </div>
                <div>
                  <span className='font-semibold text-xs font-heading text-foreground block'>Add Dedicated Keepsake Page URL</span>
                  <span className='text-[11px] text-muted-foreground font-sans'>Hosted on a private shareable web link</span>
                </div>
              </div>
              <span className='font-bold font-heading text-sm text-primary'>+$5.00</span>
            </button>
          )}
        </div>

        {/* Order Details Summary Card */}
        <Card className='overflow-hidden rounded-2xl border border-foreground/5 bg-card shadow-sm'>
          <div className='bg-primary/10 px-5 py-3 border-b border-primary/10 flex items-center justify-between'>
            <h3 className='font-bold font-heading text-sm text-primary'>Order Summary</h3>
            <span className='font-bold font-heading text-base text-primary'>
              ${((PLANS.find(p => p.id === data.plan)?.price || 19.99) + (data.plan === LemonSqueezyPlan.STANDARD && data.hasDedicatedUrlAddon ? 5 : 0)).toFixed(2)}
            </span>
          </div>
          <CardContent className='grid gap-4 p-5 sm:grid-cols-2 text-xs font-sans'>
            <div>
              <p className='font-bold text-[10px] text-muted-foreground uppercase tracking-wider font-heading'>Recipient</p>
              <p className='font-semibold text-sm text-foreground mt-0.5'>
                {data.recipientName || 'Not specified'} ({data.recipient})
              </p>
            </div>
            <div>
              <p className='font-bold text-[10px] text-muted-foreground uppercase tracking-wider font-heading'>Occasion</p>
              <p className='font-semibold text-sm text-foreground mt-0.5'>{data.occasion}</p>
            </div>
            <div>
              <p className='font-bold text-[10px] text-muted-foreground uppercase tracking-wider font-heading'>Package Tier</p>
              <p className='font-semibold text-sm text-foreground mt-0.5 capitalize'>{data.plan || 'Standard'}</p>
            </div>
            <div>
              <p className='font-bold text-[10px] text-muted-foreground uppercase tracking-wider font-heading'>Dedicated Web Page</p>
              <p className='font-semibold text-sm text-emerald-700 mt-0.5'>
                {data.plan === LemonSqueezyPlan.PREMIUM ? 'Included FREE ✓' : data.hasDedicatedUrlAddon ? 'Added (+$5.00)' : 'Not included'}
              </p>
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
