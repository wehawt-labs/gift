'use client'

import { Crown, Lock, Play, Sparkles } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LemonSqueezyPlan } from '@/lib/lemonsqueezy/constants'
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

  const handleSelectPremium = () => {
    setValue('plan', 'memory_maker', { shouldValidate: true, shouldDirty: true })
    setValue('vocalPreference', 'Custom Voice (Premium)', { shouldValidate: true, shouldDirty: true })
  }

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='font-bold font-heading text-2xl sm:text-3xl text-foreground leading-snug'>Set the Mood</h1>
        <p className='mt-1 text-sm text-muted-foreground font-sans'>Pick the genre, mood, and vocal tone for your custom song.</p>
      </div>

      <div className='space-y-6'>
        {/* Genre Selection */}
        <div className='space-y-3'>
          <Label className='font-semibold font-heading text-sm text-foreground'>Music Genre</Label>
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
                    ? 'border-primary bg-card shadow-[0_2px_0_0_#c1502e] text-primary'
                    : 'border-border/60 bg-card/60 hover:bg-card hover:border-border text-muted-foreground'
                )}
              >
                <span className={cn('font-semibold text-xs font-sans', genre === g.value ? 'text-primary' : 'text-foreground')}>
                  {g.label}
                </span>
                <div className={cn('flex h-6 w-6 items-center justify-center rounded-full transition-colors', genre === g.value ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary/20')}>
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
            className='h-10 rounded-xl border-border bg-card px-3 font-sans text-xs text-foreground placeholder:text-muted-foreground'
          />
          <FormErrorMessage message={errors.genre?.message} trigger={validationTrigger} />
        </div>

        {/* Emoji Mood Selector Chips (Stitch Version) */}
        <div className='space-y-3'>
          <Label className='font-semibold font-heading text-sm text-foreground'>Mood & Style</Label>
          <div className='flex flex-wrap gap-2.5'>
            {MOOD_OPTIONS.map((mood) => {
              const isSelected = tempo === mood.value
              return (
                <button
                  key={mood.value}
                  type='button'
                  onClick={() => setValue('tempo', mood.value as any, { shouldValidate: true, shouldDirty: true })}
                  className={cn(
                    'px-4 py-2 rounded-full border text-xs font-semibold font-sans flex items-center gap-2 transition-all active:scale-95',
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

          {/* Custom Mood Input */}
          <Input
            placeholder='Or type custom mood/style (e.g. Nostalgic & Bittersweet, Energetic...)'
            value={tempo && !['Warm & Cozy', 'Joyful & Upbeat', 'Tear-Jerker', 'Playful', 'Romantic', 'Calming'].includes(tempo) ? tempo : ''}
            onChange={(e) => setValue('tempo', e.target.value, { shouldValidate: true, shouldDirty: true })}
            className='h-10 rounded-xl border-border bg-card px-3 font-sans text-xs text-foreground placeholder:text-muted-foreground'
          />
          <FormErrorMessage message={errors.tempo?.message} trigger={validationTrigger} />
        </div>

        {/* Vocal Preference */}
        <div className='space-y-3'>
          <Label className='font-semibold font-heading text-sm text-foreground'>Vocal Preference</Label>
          <RadioGroup
            value={vocalPreference}
            onValueChange={(v) => setValue('vocalPreference', v as any, { shouldValidate: true, shouldDirty: true })}
            className='grid grid-cols-1 sm:grid-cols-3 gap-2.5'
          >
            {VOCAL_PREFERENCES.filter(v => v !== 'Custom Voice (Premium)').map((vocal) => (
              <div
                key={vocal}
                className={cn(
                  'flex items-center space-x-3 rounded-xl border p-3 transition-all cursor-pointer',
                  vocalPreference === vocal
                    ? 'border-primary bg-card ring-1 ring-primary/20 text-primary font-semibold'
                    : 'border-border/60 bg-card/60 hover:bg-card text-foreground'
                )}
              >
                <RadioGroupItem value={vocal} id={`vocal-${vocal}`} />
                <Label htmlFor={`vocal-${vocal}`} className='flex-1 cursor-pointer font-medium text-xs font-sans'>
                  {vocal}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <FormErrorMessage message={errors.vocalPreference?.message} trigger={validationTrigger} />
        </div>

        {/* Real Voice Persona Studio (Single Persona & Upload Paywall) */}
        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Crown className='h-4 w-4 text-[#9A6A1E]' />
              <Label className='font-semibold font-heading text-sm text-foreground'>Real Voice Persona</Label>
            </div>
            {plan === 'memory_maker' ? (
              <span className='rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-bold text-[10px] text-emerald-700 uppercase font-heading'>
                Included Free ✓
              </span>
            ) : (
              <span className='rounded-full bg-amber-500/20 px-2.5 py-0.5 font-bold text-[10px] text-[#9A6A1E] uppercase font-heading'>
                $5 / Persona Slot
              </span>
            )}
          </div>

          {/* Persona Card: Active State vs Paywall Upload State */}
          {useWatch({ name: 'hasVoiceCloning' }) ? (
            /* Active Saved Voice Persona Card */
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-background border border-primary/30 shadow-sm'>
              <div className='flex items-center gap-3'>
                <div className='h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg'>
                  🎙️
                </div>
                <div>
                  <h4 className='font-bold font-heading text-xs text-foreground'>Active Voice Persona: "My Custom Voice"</h4>
                  <p className='text-[11px] text-muted-foreground font-sans'>Spoken intro & singing voice clone active</p>
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
                  className='h-8 rounded-lg text-xs font-heading font-semibold text-muted-foreground hover:text-foreground'
                >
                  Manage in Settings ⚙️
                </Button>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => setValue('hasVoiceCloning', false, { shouldValidate: true, shouldDirty: true })}
                  className='h-8 rounded-lg text-xs text-destructive hover:bg-destructive/10'
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            /* Paywall & Upload Card for New Voice Sample */
            <div className='p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-3'>
              <p className='text-xs text-muted-foreground font-sans leading-relaxed'>
                Clone your voice or record a spoken intro message for your recipient. You have not uploaded a Voice Persona yet.
              </p>

              <div className='flex flex-col sm:flex-row items-center gap-2 pt-1'>
                <Button
                  type='button'
                  onClick={() => {
                    setValue('hasVoiceCloning', true, { shouldValidate: true, shouldDirty: true })
                    toast.success('Voice Sample Uploaded', {
                      description: 'Voice Persona created! It will be saved to your Profile Settings.'
                    })
                  }}
                  className='w-full sm:w-auto h-9 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-xs px-4 gap-1.5 shadow-[0_2px_0_0_#842504]'
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
                  className='w-full sm:w-auto h-9 rounded-xl text-xs font-heading font-semibold border-border bg-background'
                >
                  Open Voice Settings ⚙️
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Custom Sample Audio / Melody Upload */}
        <div className='relative overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 transition-all space-y-3'>
          {plan === 'single_gift' && (
            <div className='absolute inset-0 bg-[#A89A8C]/25 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-4 text-center'>
              <div className='h-10 w-10 rounded-full bg-background/90 shadow-md flex items-center justify-center text-[#9A6A1E] mb-2'>
                <Lock className='h-5 w-5' />
              </div>
              <p className='font-bold font-heading text-sm text-[#9A6A1E] mb-1'>Paid Tier Feature</p>
              <p className='text-xs text-foreground/80 font-sans max-w-xs mb-3'>
                Unlock Custom Sample Melody Uploads & Quick Priority Processing
              </p>
              <button
                type='button'
                onClick={() => {
                  setValue('plan', 'family_bond', { shouldValidate: true, shouldDirty: true })
                  toast.success('Family Bond Plan Selected', {
                    description: 'Custom Melody Upload is unlocked on Family Bond ($9.99/mo) or Memory Maker ($29.99/mo).'
                  })
                }}
                className='px-4 py-2 rounded-xl bg-[#9A6A1E] text-white font-heading font-bold text-xs shadow-md hover:bg-[#835818] active:scale-95 transition-all flex items-center gap-1.5'
              >
                <Crown className='h-3.5 w-3.5 fill-current' />
                Unlock with Family Bond ($9.99/mo)
              </button>
            </div>
          )}

          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-2'>
              <Crown className='h-4 w-4 text-[#9A6A1E]' />
              <h3 className='font-bold font-heading text-sm text-foreground'>Sample Melody / Audio Reference Upload</h3>
            </div>
            <span className='rounded-full bg-amber-500/20 px-2.5 py-0.5 font-bold text-[10px] text-[#9A6A1E] uppercase font-heading'>
              {plan !== 'single_gift' ? 'Unlocked ✓' : 'Paid Tiers Only'}
            </span>
          </div>
          <p className='text-xs text-muted-foreground font-sans leading-relaxed'>
            Hum a melody or upload an audio file (.mp3, .wav, .m4a). Our Song Chef will use your custom melody for the composition!
          </p>

          {/* File Input Upload Only (URL input disabled per user request) */}
          <div className='pt-1'>
            {useWatch({ name: 'sampleMelodyUrl' }) ? (
              <div className='flex items-center justify-between p-3 rounded-xl bg-background border border-primary/30 text-xs font-sans'>
                <div className='flex items-center gap-2 font-medium text-foreground truncate'>
                  <Sparkles className='h-4 w-4 text-primary shrink-0' />
                  <span className='truncate'>Uploaded: {useWatch({ name: 'sampleMelodyUrl' })?.replace('uploaded://', '')}</span>
                </div>
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  onClick={() => setValue('sampleMelodyUrl', '', { shouldValidate: true, shouldDirty: true })}
                  className='h-7 text-xs text-destructive hover:bg-destructive/10 px-2'
                >
                  Remove File
                </Button>
              </div>
            ) : (
              <label className='cursor-pointer flex items-center justify-center gap-2 h-11 px-4 rounded-xl border-2 border-dashed border-primary/40 bg-background hover:bg-card transition-colors text-xs font-semibold font-heading text-primary shadow-sm active:scale-[0.99]'>
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
                      setValue('sampleMelodyUrl', fakeUrl, { shouldValidate: true, shouldDirty: true })
                      if (plan === 'single_gift') {
                        setValue('plan', 'family_bond', { shouldValidate: true, shouldDirty: true })
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

          <div className='flex items-center gap-2 text-xs font-semibold text-primary font-sans pt-1'>
            <Sparkles className='h-3.5 w-3.5' />
            {plan !== 'single_gift' ? '✓ Reference melody upload enabled.' : 'Locked on Free plan'}
          </div>
        </div>
      </div>
    </div>
  )
}
