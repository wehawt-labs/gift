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

        {/* Voice Persona Studio Selector (Revised Spec) */}
        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Crown className='h-4 w-4 text-[#9A6A1E]' />
              <Label className='font-semibold font-heading text-sm text-foreground'>Real Voice Persona Studio</Label>
            </div>
            {plan === 'memory_maker' ? (
              <span className='rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-bold text-[10px] text-emerald-700 uppercase font-heading'>
                Unlimited Free ✓
              </span>
            ) : (
              <span className='rounded-full bg-amber-500/20 px-2.5 py-0.5 font-bold text-[10px] text-[#9A6A1E] uppercase font-heading'>
                $5 / Persona Slot
              </span>
            )}
          </div>
          <p className='text-xs text-muted-foreground font-sans leading-relaxed'>
            Combine a spoken intro message and custom singing voice persona into your song. Select an existing saved voice or record a new one.
          </p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1'>
            <Select
              value={useWatch({ name: 'selectedVoicePersona' }) || 'none'}
              onValueChange={(val) => setValue('selectedVoicePersona', val, { shouldValidate: true, shouldDirty: true })}
            >
              <SelectTrigger className='h-10 rounded-xl bg-background text-xs font-sans border-border'>
                <SelectValue placeholder='Select Saved Voice Persona' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='none'>Default AI Vocalist</SelectItem>
                <SelectItem value='persona_1'>🎙️ Alex (Spoken Intro + Singing)</SelectItem>
                <SelectItem value='persona_2'>🎙️ Emily (Soft Acoustic Voice)</SelectItem>
              </SelectContent>
            </Select>

            <Button
              type='button'
              variant='outline'
              onClick={() => {
                if (plan !== 'memory_maker') {
                  setValue('hasVoiceCloning', true, { shouldValidate: true, shouldDirty: true })
                }
                toast.success('Voice Persona Studio Opened', {
                  description: 'Record or upload a 15-second voice sample to clone your voice.'
                })
              }}
              className='h-10 rounded-xl border-dashed border-primary/50 text-primary font-heading font-semibold text-xs gap-1.5 hover:bg-primary/10'
            >
              <Sparkles className='h-3.5 w-3.5' />
              + Create New Voice Persona ({plan === 'memory_maker' ? 'FREE with Pro' : '$5'})
            </Button>
          </div>
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
                onClick={handleSelectPremium}
                className='px-4 py-2 rounded-xl bg-[#9A6A1E] text-white font-heading font-bold text-xs shadow-md hover:bg-[#835818] active:scale-95 transition-all flex items-center gap-1.5'
              >
                <Crown className='h-3.5 w-3.5 fill-current' />
                Upgrade to Memory Maker ($29.99/mo)
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
            Hum a melody, upload an audio clip, or paste a reference song link. Our Song Chef will use your custom melody for the composition!
          </p>

          <div className='pt-1'>
            <Input
              placeholder='Paste reference song link or audio URL (e.g. YouTube, SoundCloud, MP3)...'
              className='h-10 rounded-xl border-border bg-background px-3 font-sans text-xs text-foreground placeholder:text-muted-foreground'
            />
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
