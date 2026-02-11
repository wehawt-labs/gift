'use client'

import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { type OrderFormData } from '../schema'
import { PLANS } from '../constants'

export function StepCheckout() {
    const {
        register,
        setValue,
        formState: { errors }
    } = useFormContext<OrderFormData>()

    const data = useWatch()

    return (
        <div className='space-y-6'>
            <div>
                <h2 className='font-serif text-2xl font-bold text-foreground'>
                    Review & Checkout
                </h2>
                <p className='mt-1 text-foreground/60 text-base'>
                    One last look before we start creating.
                </p>
            </div>

            <div className='space-y-6'>
                {/* Plan Selection */}
                <div className='space-y-3'>
                    <Label className='font-bold'>Choose your package</Label>
                    <div className='grid sm:grid-cols-2 gap-3'>
                        {PLANS.map((plan) => (
                            <button
                                key={plan.id}
                                type='button'
                                onClick={() => setValue('plan', plan.id, { shouldValidate: true, shouldDirty: true })}
                                className={cn(
                                    'flex flex-col p-4 rounded-xl border-2 transition-all text-left group relative overflow-hidden',
                                    data.plan === plan.id
                                        ? 'bg-white border-primary ring-4 ring-primary/10'
                                        : 'bg-white/50 border-foreground/5 hover:border-foreground/20'
                                )}
                            >
                                {plan.id === 'deluxe' && (
                                    <div className='absolute top-0 right-0 bg-primary text-white text-[9px] font-bold px-2.5 py-0.5 rounded-bl-lg uppercase tracking-wider'>
                                        Popular
                                    </div>
                                )}
                                <div className='flex items-center justify-between mb-1'>
                                    <span className='font-bold text-base text-foreground'>
                                        {plan.name}
                                    </span>
                                    <span className='font-bold text-primary text-sm'>
                                        ${plan.price}
                                    </span>
                                </div>
                                <p className='text-xs text-foreground/60 mb-3'>
                                    {plan.description}
                                </p>
                                <div className='flex items-center gap-2 text-[10px] font-semibold text-foreground/80'>
                                    <Check className='w-2.5 h-2.5 text-accent' />
                                    {plan.revisions} Revision Rounds
                                </div>
                                {plan.id === 'deluxe' && (
                                    <div className='flex items-center gap-2 text-[10px] font-semibold text-foreground/80 mt-0.5'>
                                        <Check className='w-2.5 h-2.5 text-accent' />
                                        Priority Delivery
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <Card className='rounded-xl border-none shadow-sm bg-white overflow-hidden'>
                    <div className='bg-foreground py-2 px-4'>
                        <h3 className='text-white text-sm font-medium'>Order Details</h3>
                    </div>
                    <CardContent className='p-4 grid gap-4 sm:grid-cols-2'>
                        <div>
                            <p className='text-[10px] font-bold uppercase tracking-wider text-foreground/40'>
                                For
                            </p>
                            <p className='text-base font-medium'>
                                {data.recipientName} ({data.recipient})
                            </p>
                        </div>
                        <div>
                            <p className='text-[10px] font-bold uppercase tracking-wider text-foreground/40'>
                                Occasion
                            </p>
                            <p className='text-base font-medium'>{data.occasion}</p>
                        </div>
                    </CardContent>
                </Card>

                <div className='grid sm:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='buyerName' className='font-semibold'>Your Name</Label>
                        <Input
                            id='buyerName'
                            placeholder='Full name'
                            className='rounded-xl h-10 bg-white border-foreground/10 focus-visible:ring-primary/20 focus-visible:border-primary'
                            {...register('buyerName')}
                        />
                        {errors.buyerName && (
                            <p className='text-destructive text-xs mt-1'>
                                {errors.buyerName.message as string}
                            </p>
                        )}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='buyerEmail' className='font-semibold'>Your Email</Label>
                        <Input
                            id='buyerEmail'
                            type='email'
                            placeholder='email@example.com'
                            className='rounded-xl h-10 bg-white border-foreground/10 focus-visible:ring-primary/20 focus-visible:border-primary'
                            {...register('buyerEmail')}
                        />
                        {errors.buyerEmail && (
                            <p className='text-destructive text-xs mt-1'>
                                {errors.buyerEmail.message as string}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
