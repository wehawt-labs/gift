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

function AiEnhanceButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-primary/10 to-amber-500/10 border border-primary/30 hover:border-primary/60 text-primary font-heading font-bold text-[11px] shadow-2xs hover:shadow-sm active:scale-95 transition-all cursor-pointer group shrink-0'
    >
      <Sparkles className='h-3.5 w-3.5 text-primary group-hover:scale-110 transition-transform' />
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
              label='Refine with AI ✨'
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
              label='Enhance with AI ✨'
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
            placeholder='[Verse 1]...\n[Chorus]...\n(Or click Enhance with AI above to generate lyrics draft)'
            value={useWatch({ name: 'customLyrics' }) || ''}
            onChange={(e) => setValue('customLyrics', e.target.value, { shouldValidate: true, shouldDirty: true })}
            className='min-h-[120px] rounded-xl border-border bg-background p-3 font-mono text-xs text-foreground focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground resize-none leading-relaxed'
          />

          {/* Simplified Toggle Switch (Clean & Direct Without Sub-Description) */}
          {(() => {
            const isFull = Boolean(useWatch({ name: 'isFullLyrics' }))
            return (
              <div
                onClick={() => setValue('isFullLyrics', !isFull, { shouldDirty: true })}
                className='pt-2 border-t border-border/40 flex items-center justify-between cursor-pointer select-none group'
              >
                <Label className='font-semibold font-heading text-xs text-foreground block cursor-pointer group-hover:text-primary transition-colors'>
                  {isFull
                    ? "✨ I've written the full lyrics — use my exact words!"
                    : "✏️ Just an idea — let our Song Chef write the full lyrics for me!"}
                </Label>

                <div
                  className={cn(
                    'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
                    isFull ? 'bg-primary' : 'bg-muted-foreground/30'
                  )}
                >
                  <span
                    className={cn(
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                      isFull ? 'translate-x-5' : 'translate-x-0'
                    )}
                  />
                </div>
              </div>
            )
          })()}
        </div>

        {/* Digital Keepsake Gift Wrapping & Dedicated URL Paywall Card (Stitch Screen 2cfcaa7c7974454fa1fbd852131c9663) */}
        <div className='relative overflow-hidden rounded-2xl border border-amber-500/30 bg-card p-5 shadow-sm transition-all'>
          {plan !== 'memory_maker' && (
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
                Upgrade to Memory Maker ($29.99/mo)
              </button>
            </div>
          )}

          <div className='flex items-center justify-between border-b border-border/40 pb-3 mb-4'>
            <div className='flex items-center gap-2'>
              <Gift className='h-5 w-5 text-primary' />
              <h3 className='font-bold font-heading text-base text-foreground'>Digital Keepsake Gift Wrapping</h3>
            </div>
            <span className='rounded-full bg-amber-500/20 px-3 py-1 font-bold text-[10px] text-[#9A6A1E] uppercase font-heading tracking-wider'>
              {plan === 'memory_maker' ? 'Unlocked ✓' : 'Memory Maker Free'}
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
