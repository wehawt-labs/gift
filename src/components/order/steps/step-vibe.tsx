'use client'

import { Play } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { GENRE_OPTIONS, TEMPOS, VOCAL_PREFERENCES } from '../constants'
import type { OrderFormData } from '../schema'

export function StepVibe({ validationTrigger }: { validationTrigger: number }) {
  const {
    setValue,
    formState: { errors }
  } = useFormContext<OrderFormData>()

  const genre = useWatch({ name: 'genre' })
  const tempo = useWatch({ name: 'tempo' })
  const vocalPreference = useWatch({ name: 'vocalPreference' })

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='font-bold font-heading text-2xl text-foreground'>Set the mood & musical style</h2>
        <p className='mt-1 text-sm text-muted-foreground font-sans'>Pick the genre, tempo, and vocal tone for the song.</p>
      </div>

      <div className='space-y-6'>
        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm'>
          <Label className='font-semibold font-heading text-base text-foreground'>Music Genre</Label>
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
                  'group relative flex items-center justify-between rounded-xl border-2 p-3.5 transition-all active:scale-[0.98]',
                  genre === g.value
                    ? 'border-primary bg-background shadow-md ring-2 ring-primary/20'
                    : 'border-transparent bg-background/60 hover:bg-background hover:border-border'
                )}
              >
                <span className={cn('font-semibold text-sm font-sans', genre === g.value ? 'text-primary' : 'text-foreground')}>{g.label}</span>
                <div className={cn('flex h-7 w-7 items-center justify-center rounded-full transition-colors', genre === g.value ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary/20')}>
                  <Play className='h-3 w-3 fill-current' />
                </div>
              </button>
            ))}
          </div>
          <FormErrorMessage message={errors.genre?.message} trigger={validationTrigger} />
        </div>

        <div className='grid gap-6 sm:grid-cols-2'>
          <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-3 shadow-sm'>
            <Label className='font-semibold font-heading text-base text-foreground'>Tempo / Mood</Label>
            <RadioGroup
              value={tempo}
              onValueChange={(v) => setValue('tempo', v as any, { shouldValidate: true })}
              className='flex flex-col gap-2'
            >
              {TEMPOS.map((mood) => (
                <div
                  key={mood}
                  className={cn('flex items-center space-x-3 rounded-xl border p-3 transition-all cursor-pointer', tempo === mood ? 'border-primary bg-background ring-1 ring-primary/20' : 'border-border bg-background/60 hover:bg-background')}
                >
                  <RadioGroupItem value={mood} id={`mood-${mood}`} />
                  <Label htmlFor={`mood-${mood}`} className='flex-1 cursor-pointer font-medium text-sm font-sans text-foreground'>
                    {mood}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <FormErrorMessage message={errors.tempo?.message} trigger={validationTrigger} />
          </div>

          <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-3 shadow-sm'>
            <Label className='font-semibold font-heading text-base text-foreground'>Vocal Preference</Label>
            <RadioGroup
              value={vocalPreference}
              onValueChange={(v) => setValue('vocalPreference', v as any, { shouldValidate: true })}
              className='flex flex-col gap-2'
            >
              {VOCAL_PREFERENCES.map((vocal) => (
                <div
                  key={vocal}
                  className={cn('flex items-center space-x-3 rounded-xl border p-3 transition-all cursor-pointer', vocalPreference === vocal ? 'border-primary bg-background ring-1 ring-primary/20' : 'border-border bg-background/60 hover:bg-background')}
                >
                  <RadioGroupItem value={vocal} id={`vocal-${vocal}`} />
                  <Label htmlFor={`vocal-${vocal}`} className='flex-1 cursor-pointer font-medium text-sm font-sans text-foreground'>
                    {vocal}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <FormErrorMessage message={errors.vocalPreference?.message} trigger={validationTrigger} />
          </div>
        </div>
      </div>
    </div>
  )
}
