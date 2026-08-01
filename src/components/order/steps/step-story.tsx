'use client'

import { Crown, Gift, Image, Lock, Mic, Sparkles } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LemonSqueezyPlan } from '@/lib/lemonsqueezy/constants'
import type { OrderFormData } from '../schema'

export function StepStory({ validationTrigger }: { validationTrigger: number }) {
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext<OrderFormData>()

  const plan = useWatch({ name: 'plan' })

  const handleSelectPremium = () => {
    setValue('plan', LemonSqueezyPlan.PREMIUM, { shouldValidate: true, shouldDirty: true })
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-bold font-heading text-2xl sm:text-3xl text-foreground leading-snug'>Tell Your Story</h1>
        <p className='mt-1 text-sm text-muted-foreground font-sans'>Share special memories, inside jokes, or your message to personalize the lyrics.</p>
      </div>

      <div className='space-y-6'>
        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm relative'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='memory' className='font-semibold font-heading text-base text-foreground'>
              What's your favorite memory together?
            </Label>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='rounded-full text-xs font-semibold text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5'
            >
              <Sparkles className='h-3.5 w-3.5 text-primary' />
              Refine with AI
            </Button>
          </div>
          <Textarea
            id='memory'
            placeholder='Share a special trip, a quiet moment, or a big celebration...'
            className='min-h-[100px] rounded-xl border-border bg-background p-3 font-sans text-sm text-foreground focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground resize-none'
            {...register('memory')}
          />
          <FormErrorMessage message={errors.memory?.message as string} trigger={validationTrigger} />
        </div>

        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm'>
          <Label htmlFor='jokes' className='font-semibold font-heading text-base text-foreground'>
            Any inside jokes, quirks, or specific details?
          </Label>
          <Textarea
            id='jokes'
            placeholder='Those little things that only they would understand...'
            className='min-h-[90px] rounded-xl border-border bg-background p-3 font-sans text-sm text-foreground focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground resize-none'
            {...register('jokes')}
          />
        </div>

        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm'>
          <Label htmlFor='coreMessage' className='font-semibold font-heading text-base text-foreground'>
            What is the core message you want to say?
          </Label>
          <Textarea
            id='coreMessage'
            placeholder='I love you because... / Thank you for... / Happy birthday because...'
            className='min-h-[90px] rounded-xl border-border bg-background p-3 font-sans text-sm text-foreground focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground resize-none'
            {...register('coreMessage')}
          />
          <FormErrorMessage message={errors.coreMessage?.message as string} trigger={validationTrigger} />
        </div>

        {/* Digital Keepsake Gift Wrapping & Dedicated URL Paywall Card (Stitch Screen 2cfcaa7c7974454fa1fbd852131c9663) */}
        <div className='relative overflow-hidden rounded-2xl border border-amber-500/30 bg-card p-5 shadow-sm transition-all'>
          {plan !== LemonSqueezyPlan.PREMIUM && (
            <div className='absolute inset-0 bg-[#A89A8C]/30 backdrop-blur-[3px] z-10 flex flex-col items-center justify-center p-5 text-center'>
              <div className='h-11 w-11 rounded-full bg-background/95 shadow-md flex items-center justify-center text-[#9A6A1E] mb-2'>
                <Lock className='h-5 w-5' />
              </div>
              <h3 className='font-bold font-heading text-base text-[#9A6A1E] mb-1'>Premium Keepsake Gift Box</h3>
              <p className='text-xs text-foreground/80 font-sans max-w-xs mb-4 leading-relaxed'>
                Unlock a dedicated private web URL, personal voice intro, and photo album for your recipient!
              </p>
              <button
                type='button'
                onClick={handleSelectPremium}
                className='px-5 py-2.5 rounded-xl bg-[#9A6A1E] text-white font-heading font-bold text-xs shadow-md hover:bg-[#835818] active:scale-95 transition-all flex items-center gap-2 uppercase tracking-wider'
              >
                <Crown className='h-4 w-4 fill-current' />
                Upgrade to Unlock Dedicated Page
              </button>
            </div>
          )}

          <div className='flex items-center justify-between border-b border-border/40 pb-3 mb-4'>
            <div className='flex items-center gap-2'>
              <Gift className='h-5 w-5 text-primary' />
              <h3 className='font-bold font-heading text-base text-foreground'>Digital Keepsake Gift Wrapping</h3>
            </div>
            <span className='rounded-full bg-amber-500/20 px-3 py-1 font-bold text-[10px] text-[#9A6A1E] uppercase font-heading tracking-wider'>
              {plan === LemonSqueezyPlan.PREMIUM ? 'Unlocked ✓' : 'Premium Feature'}
            </span>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans'>
            <div className='p-3.5 rounded-xl bg-background border border-border/60 flex items-start gap-3'>
              <Mic className='h-4 w-4 text-primary shrink-0 mt-0.5' />
              <div>
                <p className='font-bold font-heading text-foreground text-xs'>Personal Voice Intro</p>
                <p className='text-muted-foreground text-[11px] mt-0.5'>Record a 15-second audio message intro before the song plays.</p>
              </div>
            </div>

            <div className='p-3.5 rounded-xl bg-background border border-border/60 flex items-start gap-3'>
              <Image className='h-4 w-4 text-primary shrink-0 mt-0.5' />
              <div>
                <p className='font-bold font-heading text-foreground text-xs'>Photo Slideshow Album</p>
                <p className='text-muted-foreground text-[11px] mt-0.5'>Upload up to 5 photos displayed while your song plays.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
