'use client'

import { Crown, Gift, Image, Mic } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Label } from '@/components/ui/label'
import { PaywallOverlay } from '@/components/ui/paywall-overlay'
import { SectionDivider } from '@/components/ui/section-divider'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import type { OrderFormData } from '../schema'

function AiEnhanceButton({ label = 'Enhance my input ✨', onClick }: { label?: string; onClick: () => void }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='group inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-primary/30 bg-linear-to-r from-amber-500/10 via-primary/10 to-amber-500/10 px-3.5 py-1.5 font-bold font-heading text-[11px] text-primary shadow-2xs transition-all hover:border-primary/60 hover:shadow-sm active:scale-95'
    >
      <span>{label}</span>
    </button>
  )
}

export function StepStory({ validationTrigger }: { validationTrigger: number }) {
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext<OrderFormData>()

  const plan = useWatch({ name: 'plan' })
  const memory = useWatch({ name: 'memory' })
  const coreMessage = useWatch({ name: 'coreMessage' })
  const customLyrics = useWatch({ name: 'customLyrics' })
  const isFullLyrics = Boolean(useWatch({ name: 'isFullLyrics' }))

  const handleSelectPremium = () => {
    setValue('plan', 'memory_maker', { shouldValidate: true, shouldDirty: true })
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-bold font-heading text-2xl text-foreground leading-snug sm:text-3xl'>Tell Your Story</h1>
        <p className='mt-1 font-sans text-muted-foreground text-sm'>
          Share special memories, inside jokes, or your message to personalize the lyrics.
        </p>
      </div>

      <div className='space-y-6'>
        <div className='relative space-y-4 rounded-2xl border border-foreground/5 bg-card p-5 shadow-sm'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='memory' className='font-heading font-semibold text-base text-foreground'>
              What's your favorite memory together?
            </Label>
            <AiEnhanceButton
              onClick={() => {
                if (memory) {
                  setValue('memory', `${memory} — enhanced with vivid emotional storytelling and warmth.`, {
                    shouldDirty: true
                  })
                }
              }}
            />
          </div>
          <Textarea
            id='memory'
            placeholder='Share a special trip, a quiet moment, or a big celebration...'
            className='min-h-25 resize-none rounded-xl border-border bg-background p-3 font-sans text-foreground text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20'
            {...register('memory')}
          />
          <FormErrorMessage message={errors.memory?.message as string} trigger={validationTrigger} />
        </div>

        <div className='space-y-4 rounded-2xl border border-foreground/5 bg-card p-5 shadow-sm'>
          <Label htmlFor='jokes' className='font-heading font-semibold text-base text-foreground'>
            Any inside jokes, quirks, or specific details?
          </Label>
          <Textarea
            id='jokes'
            placeholder='Those little things that only they would understand...'
            className='min-h-22.5 resize-none rounded-xl border-border bg-background p-3 font-sans text-foreground text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20'
            {...register('jokes')}
          />
        </div>

        <div className='space-y-4 rounded-2xl border border-foreground/5 bg-card p-5 shadow-sm'>
          <Label htmlFor='coreMessage' className='font-heading font-semibold text-base text-foreground'>
            What is the core message you want to say?
          </Label>
          <Textarea
            id='coreMessage'
            placeholder='I love you because... / Thank you for... / Happy birthday because...'
            className='min-h-22.5 resize-none rounded-xl border-border bg-background p-3 font-sans text-foreground text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20'
            {...register('coreMessage')}
          />
          <FormErrorMessage message={errors.coreMessage?.message as string} trigger={validationTrigger} />
        </div>

        {/* Section Divider */}
        <SectionDivider label='Optional Custom Lyrics & Gift Wrapping' />

        {/* Custom Lyrics & AI Enhancement Block */}
        <div className='space-y-4 rounded-2xl border border-foreground/5 bg-card p-5 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <Label htmlFor='customLyrics' className='block font-heading font-semibold text-base text-foreground'>
                Sample Lyrics / Custom Lyrics (Optional)
              </Label>
            </div>
            <AiEnhanceButton
              onClick={() => {
                const mem = memory || 'our unforgettable memories'
                const msg = coreMessage || 'I love you forever'
                const sampleLyrics = `[Verse 1]\nRemembering back to ${mem}\nEvery moment with you shines so bright\n\n[Chorus]\n${msg}\nYou are the melody in my life`
                setValue('customLyrics', sampleLyrics, { shouldValidate: true, shouldDirty: true })
              }}
            />
          </div>

          <Textarea
            id='customLyrics'
            placeholder='[Verse 1]...\n[Chorus]...\n(Or click Enhance my input ✨ above to generate lyrics draft)'
            value={customLyrics || ''}
            onChange={(e) => setValue('customLyrics', e.target.value, { shouldValidate: true, shouldDirty: true })}
            className='min-h-27.5 resize-none rounded-xl border-border bg-background p-3 font-mono text-foreground text-xs leading-relaxed placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20'
          />

          {/* 2 Clear Lyrics Option Cards (Replaces confusing toggle switch) */}
          <div className='space-y-2 border-border/40 border-t pt-2'>
            <Label className='block font-heading font-semibold text-foreground text-xs'>
              How should we handle your lyrics?
            </Label>
            <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2'>
              {/* Option 1: Need help / Draft */}
              <button
                type='button'
                onClick={() => setValue('isFullLyrics', false, { shouldDirty: true })}
                className={cn(
                  'flex flex-col rounded-xl border p-3 text-left transition-all active:scale-[0.98]',
                  !isFullLyrics
                    ? 'border-primary bg-background shadow-xs ring-1 ring-primary/20'
                    : 'border-border/60 bg-background/60 hover:bg-background'
                )}
              >
                <div className='mb-1 flex items-center justify-between font-bold font-heading text-foreground text-xs'>
                  <span>✏️ I need help writing lyrics</span>
                  {!isFullLyrics && <span className='font-heading text-[10px] text-primary'>Selected ✓</span>}
                </div>
                <p className='font-sans text-[11px] text-muted-foreground leading-relaxed'>
                  Our Song Chef will expand your ideas into full lyrics.
                </p>
              </button>

              {/* Option 2: Full lyrics provided */}
              <button
                type='button'
                onClick={() => setValue('isFullLyrics', true, { shouldDirty: true })}
                className={cn(
                  'flex flex-col rounded-xl border p-3 text-left transition-all active:scale-[0.98]',
                  isFullLyrics
                    ? 'border-primary bg-background shadow-xs ring-1 ring-primary/20'
                    : 'border-border/60 bg-background/60 hover:bg-background'
                )}
              >
                <div className='mb-1 flex items-center justify-between font-bold font-heading text-foreground text-xs'>
                  <span>✨ Use my exact lyrics</span>
                  {isFullLyrics && <span className='font-heading text-[10px] text-primary'>Selected ✓</span>}
                </div>
                <p className='font-sans text-[11px] text-muted-foreground leading-relaxed'>
                  Compose music around your exact written words.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Digital Keepsake Gift Wrapping & Dedicated URL Paywall Card (Stitch Screen 2cfcaa7c7974454fa1fbd852131c9663) */}
        <div className='relative overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 shadow-sm transition-all'>
          {plan !== 'memory_maker' && (
            <PaywallOverlay
              title='Premium Keepsake Gift Box'
              description='Unlock a dedicated private web URL, personal voice intro, and photo album for your recipient!'
            >
              <button
                type='button'
                onClick={handleSelectPremium}
                className='flex items-center gap-2 rounded-xl bg-primary px-4 py-2 font-bold font-heading text-primary-foreground text-xs shadow-md transition-all hover:bg-primary/90 active:scale-95'
              >
                <Crown className='h-4 w-4 fill-current' />
                Upgrade to Memory Maker ($29.99/mo)
              </button>
            </PaywallOverlay>
          )}

          <div className='mb-4 flex items-center justify-between border-border/40 border-b pb-3'>
            <div className='flex items-center gap-2'>
              <Gift className='h-5 w-5 text-primary' />
              <h3 className='font-bold font-heading text-base text-foreground'>Digital Keepsake Gift Wrapping</h3>
            </div>
            <span className='rounded-full bg-amber-500/20 px-3 py-1 font-bold font-heading text-[#9A6A1E] text-[10px] uppercase tracking-wider'>
              {plan === 'memory_maker' ? 'Unlocked ✓' : 'Memory Maker Free'}
            </span>
          </div>

          <div className='grid grid-cols-1 gap-3 font-sans text-xs sm:grid-cols-2'>
            <div className='flex items-start gap-3 rounded-xl border border-border/60 bg-background p-3.5'>
              <Mic className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
              <div>
                <p className='font-bold font-heading text-foreground text-xs'>Personal Voice Intro</p>
                <p className='mt-0.5 text-[11px] text-muted-foreground'>
                  Record a 15-second audio message intro before the song plays.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3 rounded-xl border border-border/60 bg-background p-3.5'>
              <Image className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
              <div>
                <p className='font-bold font-heading text-foreground text-xs'>Photo Slideshow Album</p>
                <p className='mt-0.5 text-[11px] text-muted-foreground'>
                  Upload up to 5 photos displayed while your song plays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
