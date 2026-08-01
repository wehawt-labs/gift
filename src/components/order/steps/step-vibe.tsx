'use client'

import { Crown, Play, Sparkles } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PaywallOverlay } from '@/components/ui/paywall-overlay'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { SectionDivider } from '@/components/ui/section-divider'
import { cn } from '@/lib/utils'
import { GENRE_OPTIONS, MOOD_OPTIONS, VOCAL_PREFERENCES } from '../constants'
import type { OrderFormData } from '../schema'

export function StepVibe({ validationTrigger }: { validationTrigger: number }) {
  const {
    setValue,
    formState: { errors }
  } = useFormContext<OrderFormData>()

  const genre = useWatch({ name: 'genre' })
  const tempo = useWatch({ name: 'tempo' })
  const vocalPreference = useWatch({ name: 'vocalPreference' })
  const plan = useWatch({ name: 'plan' })
  const hasVoiceCloning = Boolean(useWatch({ name: 'hasVoiceCloning' }))
  const sampleMelodyUrl = useWatch({ name: 'sampleMelodyUrl' })

  const _handleSelectPremium = () => {
    setValue('plan', 'memory_maker', { shouldValidate: true, shouldDirty: true })
    setValue('vocalPreference', 'Custom Voice (Premium)', { shouldValidate: true, shouldDirty: true })
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-bold font-heading text-2xl text-foreground leading-snug sm:text-3xl'>Set the Mood</h1>
        <p className='mt-1 font-sans text-muted-foreground text-sm'>
          Pick the genre, mood, and vocal tone for your custom song.
        </p>
      </div>

      <div className='space-y-6'>
        {/* Genre Selection */}
        <div className='space-y-3'>
          <Label className='font-heading font-semibold text-foreground text-sm'>Music Genre</Label>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
            {GENRE_OPTIONS.map((g) => (
              <button
                key={g.value}
                type='button'
                onClick={() =>
                  setValue('genre', g.value, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                className={cn(
                  'group relative flex items-center justify-between rounded-xl border p-3.5 transition-all active:scale-95',
                  genre === g.value
                    ? 'border-primary bg-card text-primary shadow-[0_2px_0_0_#c1502e]'
                    : 'border-border/60 bg-card/60 text-muted-foreground hover:border-border hover:bg-card'
                )}
              >
                <span
                  className={cn(
                    'font-sans font-semibold text-xs',
                    genre === g.value ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {g.label}
                </span>
                <div
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full transition-colors',
                    genre === g.value ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                  )}
                >
                  <Play className='h-2.5 w-2.5 fill-current' />
                </div>
              </button>
            ))}
          </div>

          {/* Custom Genre Input */}
          <Input
            placeholder='Or type custom genre (e.g. Indie Folk, 90s Hip-Hop, Lo-Fi Chill...)'
            value={genre && !['Acoustic Pop', 'Rock Ballad', 'EDM', 'R&B', 'Country'].includes(genre) ? genre : ''}
            onChange={(e) => setValue('genre', e.target.value, { shouldValidate: true, shouldDirty: true })}
            className='h-10 rounded-xl border-border bg-card px-3 font-sans text-foreground text-xs placeholder:text-muted-foreground'
          />
          <FormErrorMessage message={errors.genre?.message} trigger={validationTrigger} />
        </div>

        {/* Emoji Mood Selector Chips (Stitch Version) */}
        <div className='space-y-3'>
          <Label className='font-heading font-semibold text-foreground text-sm'>Mood & Style</Label>
          <div className='flex flex-wrap gap-2.5'>
            {MOOD_OPTIONS.map((mood) => {
              const isSelected = tempo === mood.value
              return (
                <button
                  key={mood.value}
                  type='button'
                  onClick={() => setValue('tempo', mood.value, { shouldValidate: true, shouldDirty: true })}
                  className={cn(
                    'flex items-center gap-2 rounded-full border px-4 py-2 font-sans font-semibold text-xs transition-all active:scale-95',
                    isSelected
                      ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                      : 'border-border/80 bg-card text-foreground hover:border-primary/50'
                  )}
                >
                  <span className='text-sm'>{mood.emoji}</span>
                  <span>{mood.label}</span>
                </button>
              )
            })}
          </div>

          {/* Custom Tempo/Mood Input */}
          <Input
            placeholder='Or type custom mood/style (e.g. Energetic, Nostalgic, Cinematic...)'
            value={tempo && !MOOD_OPTIONS.some((m) => m.value === tempo) ? tempo : ''}
            onChange={(e) => setValue('tempo', e.target.value, { shouldValidate: true, shouldDirty: true })}
            className='mt-2 h-10 rounded-xl border-border bg-card px-3 font-sans text-foreground text-xs placeholder:text-muted-foreground'
          />
          <FormErrorMessage message={errors.tempo?.message} trigger={validationTrigger} />
        </div>

        {/* Vocal Preference Section */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <Label className='font-heading font-semibold text-foreground text-sm'>Vocal Preference</Label>
          </div>
          <RadioGroup
            value={vocalPreference}
            onValueChange={(val) =>
              setValue('vocalPreference', val as (typeof VOCAL_PREFERENCES)[number], {
                shouldValidate: true,
                shouldDirty: true
              })
            }
            className='grid grid-cols-2 gap-3 sm:grid-cols-3'
          >
            {VOCAL_PREFERENCES.filter((v) => v !== 'Custom Voice (Premium)').map((vocal) => (
              <div
                key={vocal}
                className={cn(
                  'flex cursor-pointer items-center space-x-3 rounded-xl border p-3 transition-all',
                  vocalPreference === vocal
                    ? 'border-primary bg-card font-semibold text-primary ring-1 ring-primary/20'
                    : 'border-border/60 bg-card/60 text-foreground hover:bg-card'
                )}
              >
                <RadioGroupItem value={vocal} id={`vocal-${vocal}`} />
                <Label htmlFor={`vocal-${vocal}`} className='flex-1 cursor-pointer font-medium font-sans text-xs'>
                  {vocal}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <FormErrorMessage message={errors.vocalPreference?.message} trigger={validationTrigger} />
        </div>

        {/* Section Divider */}
        <SectionDivider label='Optional Voice Studio & Sample Melody' />

        {/* Real Voice Persona Studio (Unified Styling with Sample Melody Upload Card) */}
        <div className='relative space-y-3 overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 shadow-sm transition-all'>
          {/* Paywall Overlay for Voice Persona when on Free Plan and not added */}
          {plan === 'single_gift' && !hasVoiceCloning && (
            <PaywallOverlay
              title='Curious How Your Voice Sounds in a Song?'
              description="Record a spoken intro or clone your singing voice for your recipient's special keepsake song."
            >
              <button
                type='button'
                onClick={() => {
                  setValue('plan', 'memory_maker', { shouldDirty: true })
                  setValue('hasVoiceCloning', true, { shouldDirty: true })
                  toast.success('Memory Maker Selected', {
                    description: 'All premium add-ons including Real Voice Persona are UNLOCKED FREE!'
                  })
                }}
                className='flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 font-bold font-heading text-primary-foreground text-xs shadow-md transition-all hover:bg-primary/90 active:scale-95'
              >
                <Crown className='h-3.5 w-3.5 fill-current' />
                Unlock Free with Memory Maker ($29.99/mo)
              </button>
              <button
                type='button'
                onClick={() => {
                  setValue('hasVoiceCloning', true, { shouldDirty: true })
                  toast.success('Voice Persona Add-on Added', {
                    description: 'Added Real Voice Persona slot to your order (+$5.00).'
                  })
                }}
                className='flex items-center gap-1 rounded-xl border border-amber-500/40 bg-background px-3.5 py-1.5 font-bold font-heading text-foreground text-xs shadow-2xs transition-all hover:bg-card active:scale-95'
              >
                <span>Add Voice Persona (+$5.00)</span>
              </button>
            </PaywallOverlay>
          )}

          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-2'>
              <Crown className='h-4 w-4 text-[#9A6A1E]' />
              <h3 className='font-bold font-heading text-foreground text-sm'>Real Voice Persona</h3>
            </div>
            <span className='rounded-full bg-amber-500/20 px-2.5 py-0.5 font-bold font-heading text-[#9A6A1E] text-[10px] uppercase'>
              {plan === 'memory_maker' ? 'Unlocked ✓' : hasVoiceCloning ? 'Selected ✓' : '$5 / Slot'}
            </span>
          </div>
          <p className='font-sans text-muted-foreground text-xs leading-relaxed'>
            Combine a spoken intro message and custom singing voice persona into your song.
          </p>

          {/* Persona Card: Active State vs Paywall Upload State */}
          {hasVoiceCloning ? (
            /* Active Saved Voice Persona Card */
            <div className='flex flex-col justify-between gap-3 rounded-xl border border-primary/30 bg-background p-3.5 shadow-sm sm:flex-row sm:items-center'>
              <div className='flex items-center gap-3'>
                <div className='flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-bold text-base text-primary'>
                  🎙️
                </div>
                <div>
                  <h4 className='font-bold font-heading text-foreground text-xs'>
                    Active Voice Persona: "My Custom Voice"
                  </h4>
                  <p className='font-sans text-[11px] text-muted-foreground'>
                    Spoken intro & singing voice clone active
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    toast.info('Opening Voice Settings', {
                      description: 'Navigating to Profile Settings -> Voice Persona Studio...'
                    })
                  }}
                  className='h-8 rounded-lg font-heading font-semibold text-muted-foreground text-xs hover:text-foreground'
                >
                  Settings ⚙️
                </Button>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => setValue('hasVoiceCloning', false, { shouldDirty: true })}
                  className='h-8 rounded-lg text-destructive text-xs hover:bg-destructive/10'
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            /* Paywall & Upload Card for New Voice Sample */
            <div className='pt-1'>
              <div className='flex flex-col items-center gap-2 sm:flex-row'>
                <Button
                  type='button'
                  onClick={() => {
                    setValue('hasVoiceCloning', true, { shouldDirty: true })
                    toast.success('Voice Sample Uploaded', {
                      description: 'Voice Persona created! Saved to your Profile Settings.'
                    })
                  }}
                  className='h-9 w-full gap-1.5 rounded-xl bg-primary px-4 font-bold font-heading text-primary-foreground text-xs shadow-[0_2px_0_0_#842504] sm:w-auto'
                >
                  <Sparkles className='h-3.5 w-3.5' />
                  Upload Voice Sample File (.mp3, .wav)
                </Button>

                <Button
                  type='button'
                  variant='outline'
                  onClick={() => {
                    toast.info('Redirecting to Settings', {
                      description: 'Opening Profile Settings -> Voice Persona Studio...'
                    })
                  }}
                  className='h-9 w-full rounded-xl border-border bg-background font-heading font-semibold text-xs sm:w-auto'
                >
                  Open Voice Settings ⚙️
                </Button>
              </div>
            </div>
          )}

          <div className='flex items-center gap-2 border-border/40 border-t pt-1 font-sans font-semibold text-primary text-xs'>
            <Sparkles className='h-3.5 w-3.5' />
            {plan === 'memory_maker'
              ? '✓ Included Free with Memory Maker.'
              : hasVoiceCloning
                ? '✓ Voice Persona added (+$5.00)'
                : 'Optional $5 Add-on or Free with Memory Maker'}
          </div>
        </div>

        {/* Custom Sample Audio / Melody Upload */}
        <div className='relative space-y-3 overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 shadow-sm transition-all'>
          {plan === 'single_gift' && (
            <PaywallOverlay
              title='Paid Tier Feature'
              description='Unlock Custom Sample Melody Uploads & Quick Priority Processing'
            >
              <button
                type='button'
                onClick={() => {
                  setValue('plan', 'family_bond', { shouldDirty: true })
                  toast.success('Family Bond Plan Selected', {
                    description:
                      'Custom Melody Upload is unlocked on Family Bond ($9.99/mo) or Memory Maker ($29.99/mo).'
                  })
                }}
                className='flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 font-bold font-heading text-primary-foreground text-xs shadow-md transition-all hover:bg-primary/90 active:scale-95'
              >
                <Crown className='h-3.5 w-3.5 fill-current' />
                Unlock with Subscription ($9.99/mo)
              </button>
              <button
                type='button'
                onClick={() => {
                  setValue('plan', 'family_bond', { shouldDirty: true })
                  toast.success('Sample Melody Add-on Selected', {
                    description: 'Selected Family Bond ($9.99/mo) to unlock melody uploads & priority queue.'
                  })
                }}
                className='flex items-center gap-1 rounded-xl border border-amber-500/40 bg-background px-3.5 py-1.5 font-bold font-heading text-foreground text-xs shadow-2xs transition-all hover:bg-card active:scale-95'
              >
                <span>Use as Add-on (+$5.00)</span>
              </button>
            </PaywallOverlay>
          )}

          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-2'>
              <Crown className='h-4 w-4 text-[#9A6A1E]' />
              <h3 className='font-bold font-heading text-foreground text-sm'>Sample Melody / Audio Reference Upload</h3>
            </div>
            {plan !== 'single_gift' ? (
              <button
                type='button'
                onClick={() => setValue('plan', 'single_gift', { shouldDirty: true })}
                className='rounded-full bg-amber-500/20 px-2.5 py-0.5 font-bold font-heading text-[#9A6A1E] text-[10px] uppercase transition-colors hover:bg-amber-500/30'
                title='Click to revert to Free plan'
              >
                Unlocked ✓ (Revert)
              </button>
            ) : (
              <span className='rounded-full bg-muted px-2.5 py-0.5 font-bold font-heading text-[10px] text-muted-foreground uppercase'>
                Paid Tiers Only
              </span>
            )}
          </div>
          <p className='font-sans text-muted-foreground text-xs leading-relaxed'>
            Hum a melody or upload an audio file (.mp3, .wav, .m4a). Our Song Chef will use your custom melody for the
            composition!
          </p>

          {/* File Input Upload Only (URL input disabled per user request) */}
          <div className='pt-1'>
            {sampleMelodyUrl ? (
              <div className='flex items-center justify-between rounded-xl border border-primary/30 bg-background p-3 font-sans text-xs'>
                <div className='flex items-center gap-2 truncate font-medium text-foreground'>
                  <Sparkles className='h-4 w-4 shrink-0 text-primary' />
                  <span className='truncate'>Uploaded: {sampleMelodyUrl.replace('uploaded://', '')}</span>
                </div>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => setValue('sampleMelodyUrl', '', { shouldDirty: true })}
                  className='h-7 px-2 text-destructive text-xs hover:bg-destructive/10'
                >
                  Remove File
                </Button>
              </div>
            ) : (
              <label className='flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-primary/40 border-dashed bg-background px-4 font-heading font-semibold text-primary text-xs shadow-sm transition-colors hover:bg-card active:scale-[0.99]'>
                <Sparkles className='h-4 w-4' />
                <span>Choose Audio File to Upload (.mp3, .wav, .m4a)</span>
                <input
                  type='file'
                  accept='audio/*'
                  className='hidden'
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const fakeUrl = `uploaded://${file.name}`
                      setValue('sampleMelodyUrl', fakeUrl, { shouldDirty: true })
                      if (plan === 'single_gift') {
                        setValue('plan', 'family_bond', { shouldDirty: true })
                      }
                      toast.success('Audio File Selected', {
                        description: `Uploaded: ${file.name}`
                      })
                    }
                  }}
                />
              </label>
            )}
          </div>

          <div className='flex items-center gap-2 pt-1 font-sans font-semibold text-primary text-xs'>
            <Sparkles className='h-3.5 w-3.5' />
            {plan !== 'single_gift' ? '✓ Reference melody upload enabled.' : 'Locked on Free plan'}
          </div>
        </div>
      </div>
    </div>
  )
}
