'use client'

import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { type OrderFormData } from '../schema'
import { GENRE_OPTIONS, TEMPOS, VOCAL_PREFERENCES } from '../constants'

export function StepVibe() {
    const {
        setValue,
        register,
        formState: { errors }
    } = useFormContext<OrderFormData>()

    const genre = useWatch({ name: 'genre' })
    const tempo = useWatch({ name: 'tempo' })
    const vocalPreference = useWatch({ name: 'vocalPreference' })

    return (
        <div className='space-y-6'>
            <div>
                <h2 className='font-serif text-2xl font-bold text-foreground'>
                    Set the mood
                </h2>
            </div>

            <div className='space-y-6'>
                <div className='space-y-3'>
                    <Label className='font-semibold'>Genre</Label>
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
                        {GENRE_OPTIONS.map((g) => (
                            <button
                                key={g.value}
                                type='button'
                                onClick={() => setValue('genre', g.value, { shouldValidate: true, shouldDirty: true })}
                                className={cn(
                                    'relative flex items-center justify-between p-3 rounded-xl border-2 bg-white transition-all group',
                                    genre === g.value
                                        ? 'border-primary ring-4 ring-primary/10'
                                        : 'border-foreground/5 hover:border-foreground/20'
                                )}
                            >
                                <span className='font-medium text-sm'>{g.label}</span>
                                <div className='w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                                    <Play className='w-3 h-3 text-primary fill-current' />
                                </div>
                            </button>
                        ))}
                    </div>
                    {errors.genre && (
                        <p className='text-destructive text-xs mt-1'>
                            {errors.genre.message as string}
                        </p>
                    )}
                </div>

                <div className='grid sm:grid-cols-2 gap-8'>
                    <div className='space-y-3'>
                        <Label className='font-semibold'>Tempo/Mood</Label>
                        <RadioGroup
                            value={tempo}
                            onValueChange={(v) => setValue('tempo', v as any, { shouldValidate: true })}
                            className='flex flex-col gap-1.5'
                        >
                            {TEMPOS.map((mood) => (
                                <div
                                    key={mood}
                                    className='flex items-center space-x-3 p-2.5 rounded-xl border border-foreground/5 bg-white shadow-sm'
                                >
                                    <RadioGroupItem value={mood} id={`mood-${mood}`} />
                                    <Label
                                        htmlFor={`mood-${mood}`}
                                        className='font-medium text-sm cursor-pointer flex-1'
                                    >
                                        {mood}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        {errors.tempo && (
                            <p className='text-destructive text-xs mt-1'>
                                {errors.tempo.message as string}
                            </p>
                        )}
                    </div>

                    <div className='space-y-4'>
                        <Label className='font-semibold'>Vocal preference</Label>
                        <RadioGroup
                            value={vocalPreference}
                            onValueChange={(v) => setValue('vocalPreference', v as any, { shouldValidate: true })}
                            className='flex flex-col gap-1.5'
                        >
                            {VOCAL_PREFERENCES.map((vocal) => (
                                <div
                                    key={vocal}
                                    className='flex items-center space-x-3 p-2.5 rounded-xl border border-foreground/5 bg-white shadow-sm'
                                >
                                    <RadioGroupItem value={vocal} id={`vocal-${vocal}`} />
                                    <Label
                                        htmlFor={`vocal-${vocal}`}
                                        className='font-medium text-sm cursor-pointer flex-1'
                                    >
                                        {vocal}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                        {errors.vocalPreference && (
                            <p className='text-destructive text-xs mt-1'>
                                {errors.vocalPreference.message as string}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
