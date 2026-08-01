'use client'

import { Crown, Gift, Image, Lock, Mic, Sparkles } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LemonSqueezyPlan } from '@/lib/lemonsqueezy/constants'
import { cn } from '@/lib/utils'
import type { OrderFormData } from '../schema'

function AiEnhanceButton({ label = 'Enhance my input ✨', onClick }: { label?: string; onClick: () => void }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-primary/10 to-amber-500/10 border border-primary/30 hover:border-primary/60 text-primary font-heading font-bold text-[11px] shadow-2xs hover:shadow-sm active:scale-95 transition-all cursor-pointer group shrink-0'
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

  const handleSelectPremium = () => {
    setValue('plan', 'memory_maker', { shouldValidate: true, shouldDirty: true })
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
            <AiEnhanceButton
              onClick={() => {
                const mem = useWatch({ name: 'memory' })
                if (mem) {
                  setValue('memory', `${mem} — enhanced with vivid emotional storytelling and warmth.`, { shouldDirty: true })
                }
              }}
            />
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

        {/* Custom Lyrics & AI Enhancement Block */}
        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div>
              <Label htmlFor='customLyrics' className='font-semibold font-heading text-base text-foreground block'>
                Sample Lyrics / Custom Lyrics (Optional)
              </Label>
            </div>
            <AiEnhanceButton
              onClick={() => {
                const mem = useWatch({ name: 'memory' }) || 'our unforgettable memories'
                const msg = useWatch({ name: 'coreMessage' }) || 'I love you forever'
                const sampleLyrics = `[Verse 1]\nRemembering back to ${mem}\nEvery moment with you shines so bright\n\n[Chorus]\n${msg}\nYou are the melody in my life`
                setValue('customLyrics', sampleLyrics, { shouldValidate: true, shouldDirty: true })
              }}
            />
          </div>

          <Textarea
            id='customLyrics'
            placeholder='[Verse 1]...\n[Chorus]...\n(Or click Enhance my input ✨ above to generate lyrics draft)'
            value={useWatch({ name: 'customLyrics' }) || ''}
            onChange={(e) => setValue('customLyrics', e.target.value, { shouldValidate: true, shouldDirty: true })}
            className='min-h-[110px] rounded-xl border-border bg-background p-3 font-mono text-xs text-foreground focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground resize-none leading-relaxed'
          />

          {/* 2 Clear Lyrics Option Cards (Replaces confusing toggle switch) */}
          <div className='pt-2 border-t border-border/40 space-y-2'>
            <Label className='font-semibold font-heading text-xs text-foreground block'>How should we handle your lyrics?</Label>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
              {/* Option 1: Need help / Draft */}
              <button
                type='button'
                onClick={() => setValue('isFullLyrics', false, { shouldDirty: true })}
                className={cn(
                  'flex flex-col p-3 rounded-xl border text-left transition-all active:scale-[0.98]',
                  !useWatch({ name: 'isFullLyrics' })
                    ? 'border-primary bg-background shadow-xs ring-1 ring-primary/20'
                    : 'border-border/60 bg-background/60 hover:bg-background'
                )}
              >
                <div className='flex items-center justify-between font-bold font-heading text-xs text-foreground mb-1'>
                  <span>✏️ I need help writing lyrics</span>
                  {!useWatch({ name: 'isFullLyrics' }) && <span className='text-primary font-heading text-[10px]'>Selected ✓</span>}
                </div>
                <p className='text-[11px] text-muted-foreground font-sans leading-relaxed'>
                  Our Song Chef will expand your ideas into full lyrics.
                </p>
              </button>

              {/* Option 2: Full lyrics provided */}
              <button
                type='button'
                onClick={() => setValue('isFullLyrics', true, { shouldDirty: true })}
                className={cn(
                  'flex flex-col p-3 rounded-xl border text-left transition-all active:scale-[0.98]',
                  useWatch({ name: 'isFullLyrics' })
                    ? 'border-primary bg-background shadow-xs ring-1 ring-primary/20'
                    : 'border-border/60 bg-background/60 hover:bg-background'
                )}
              >
                <div className='flex items-center justify-between font-bold font-heading text-xs text-foreground mb-1'>
                  <span>✨ Use my exact lyrics</span>
                  {useWatch({ name: 'isFullLyrics' }) && <span className='text-primary font-heading text-[10px]'>Selected ✓</span>}
                </div>
                <p className='text-[11px] text-muted-foreground font-sans leading-relaxed'>
                  Compose music around your exact written words.
                </p>
              </button>
            </div>
          </div>
        </div>

        {/* Digital Keepsake Gift Wrapping & Dedicated URL Paywall Card (Stitch Screen 2cfcaa7c7974454fa1fbd852131c9663) */}
        <div className='relative overflow-hidden rounded-2xl border border-amber-500/30 bg-card p-5 shadow-sm transition-all'>
          {plan !== 'memory_maker' && (
            <div className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#A89A8C]/30 p-5 text-center backdrop-blur-[3px]'>
              <div className='mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-background/95 text-[#9A6A1E] shadow-md'>
                <Lock className='h-5 w-5' />
              </div>
              <h3 className='mb-1 font-bold font-heading text-[#9A6A1E] text-base'>Premium Keepsake Gift Box</h3>
              <p className='mb-4 max-w-xs font-sans text-foreground/80 text-xs leading-relaxed'>
                Unlock a dedicated private web URL, personal voice intro, and photo album for your recipient!
              </p>
              <button
                type='button'
                onClick={handleSelectPremium}
                className='flex items-center gap-2 rounded-xl bg-[#9A6A1E] px-5 py-2.5 font-bold font-heading text-white text-xs uppercase tracking-wider shadow-md transition-all hover:bg-[#835818] active:scale-95'
              >
                <Crown className='h-4 w-4 fill-current' />
                Upgrade to Memory Maker ($29.99/mo)
              </button>
            </div>
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
