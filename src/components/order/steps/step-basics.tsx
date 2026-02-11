'use client'

import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { type OrderFormData } from '../schema'
import { RECIPIENT_OPTIONS, OCCASIONS } from '../constants'

export function StepBasics() {
    const {
        register,
        setValue,
        formState: { errors }
    } = useFormContext<OrderFormData>()

    const recipient = useWatch({ name: 'recipient' })
    const occasion = useWatch({ name: 'occasion' })

    return (
        <div className='space-y-6'>
            <div>
                <h2 className='font-serif text-2xl font-bold text-foreground leading-tight'>
                    Let's start with the basics
                </h2>
                <p className='mt-1 text-foreground/60 text-base'>
                    Who is this masterpiece for?
                </p>
            </div>

            <div className='space-y-4'>
                <div className='space-y-2'>
                    <Label className='font-semibold'>Who is this song for?</Label>
                    <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                        {RECIPIENT_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                type='button'
                                onClick={() => setValue('recipient', opt.value, { shouldValidate: true, shouldDirty: true })}
                                className={cn(
                                    'flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all group',
                                    recipient === opt.value
                                        ? 'bg-white border-primary ring-4 ring-primary/10'
                                        : 'bg-white/50 border-foreground/5 hover:border-foreground/20'
                                )}
                            >
                                <opt.icon
                                    className={cn(
                                        'w-6 h-6 mb-2 transition-colors',
                                        recipient === opt.value
                                            ? 'text-primary'
                                            : 'text-foreground/40 group-hover:text-foreground/60'
                                    )}
                                />
                                <span
                                    className={cn(
                                        'font-medium text-xs',
                                        recipient === opt.value
                                            ? 'text-foreground'
                                            : 'text-foreground/60'
                                    )}
                                >
                                    {opt.label}
                                </span>
                            </button>
                        ))}
                    </div>
                    {errors.recipient && (
                        <p className='text-destructive text-xs mt-1'>
                            {errors.recipient.message as string}
                        </p>
                    )}
                </div>

                <div className='grid sm:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='recipientName' className='font-semibold'>What is their name?</Label>
                        <Input
                            id='recipientName'
                            placeholder='e.g. Sarah'
                            className='rounded-xl h-10 bg-white border-foreground/10 focus-visible:ring-primary/20 focus-visible:border-primary'
                            {...register('recipientName')}
                        />
                        {errors.recipientName && (
                            <p className='text-destructive text-xs mt-1'>
                                {errors.recipientName.message as string}
                            </p>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <Label className='font-semibold'>What's the occasion?</Label>
                        <Select
                            onValueChange={(v) => setValue('occasion', v, { shouldValidate: true })}
                            value={occasion}
                        >
                            <SelectTrigger className='w-full rounded-xl h-10 bg-white border-foreground/10 focus-visible:ring-primary/20 focus-visible:border-primary'>
                                <SelectValue placeholder='Select an occasion' />
                            </SelectTrigger>
                            <SelectContent>
                                {OCCASIONS.map((occ) => (
                                    <SelectItem key={occ} value={occ}>
                                        {occ}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.occasion && (
                            <p className='text-destructive text-xs mt-1'>
                                {errors.occasion.message as string}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
