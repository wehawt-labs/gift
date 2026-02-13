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
        <h2 className='font-bold font-serif text-2xl text-foreground'>
          Set the mood
        </h2>
      </div>

      <div className='space-y-6'>
        <div className='space-y-3'>
          <Label className='font-semibold'>Genre</Label>
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
                  'group relative flex items-center justify-between rounded-xl border-2 bg-white p-3 transition-all',
                  genre === g.value
                    ? 'border-primary ring-4 ring-primary/10'
                    : 'border-foreground/5 hover:border-foreground/20'
                )}
              >
                <span className='font-medium text-sm'>{g.label}</span>
                <div className='flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20'>
                  <Play className='h-3 w-3 fill-current text-primary' />
                </div>
              </button>
            ))}
          </div>
          <FormErrorMessage
            message={errors.genre?.message}
            trigger={validationTrigger}
          />
        </div>

        <div className='grid gap-8 sm:grid-cols-2'>
          <div className='space-y-3'>
            <Label className='font-semibold'>Tempo/Mood</Label>
            <RadioGroup
              value={tempo}
              onValueChange={(v) =>
                setValue('tempo', v as any, { shouldValidate: true })
              }
              className='flex flex-col gap-1.5'
            >
              {TEMPOS.map((mood) => (
                <div
                  key={mood}
                  className='flex items-center space-x-3 rounded-xl border border-foreground/5 bg-white p-2.5 shadow-sm'
                >
                  <RadioGroupItem value={mood} id={`mood-${mood}`} />
                  <Label
                    htmlFor={`mood-${mood}`}
                    className='flex-1 cursor-pointer font-medium text-sm'
                  >
                    {mood}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <FormErrorMessage
              message={errors.tempo?.message}
              trigger={validationTrigger}
            />
          </div>

          <div className='space-y-4'>
            <Label className='font-semibold'>Vocal preference</Label>
            <RadioGroup
              value={vocalPreference}
              onValueChange={(v) =>
                setValue('vocalPreference', v as any, { shouldValidate: true })
              }
              className='flex flex-col gap-1.5'
            >
              {VOCAL_PREFERENCES.map((vocal) => (
                <div
                  key={vocal}
                  className='flex items-center space-x-3 rounded-xl border border-foreground/5 bg-white p-2.5 shadow-sm'
                >
                  <RadioGroupItem value={vocal} id={`vocal-${vocal}`} />
                  <Label
                    htmlFor={`vocal-${vocal}`}
                    className='flex-1 cursor-pointer font-medium text-sm'
                  >
                    {vocal}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <FormErrorMessage
              message={errors.vocalPreference?.message}
              trigger={validationTrigger}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
