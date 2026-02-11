'use client'

import React from 'react'
import { Heart, Sparkles, Zap } from 'lucide-react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type OrderFormData } from './schema'
import { PLANS } from './constants'

export function OrderSummary({ formData }: { formData: OrderFormData }) {
    const selectedPlan = PLANS.find((p) => p.id === formData.plan) || PLANS[0]

    return (
        <Card className='rounded-xl border-none shadow-lg bg-white overflow-hidden'>
            <CardHeader className='p-6 border-b border-foreground/5'>
                <CardTitle className='font-serif text-xl text-foreground'>
                    Your Song
                </CardTitle>
                <CardDescription className='text-sm'>
                    {selectedPlan.name} Package
                </CardDescription>
            </CardHeader>

            <CardContent className='p-6 space-y-4'>
                <div className='flex items-center justify-between text-sm'>
                    <span className='text-muted-foreground'>14/2 Sale Price</span>
                    <span className='font-medium text-foreground'>
                        ${selectedPlan.price.toFixed(2)}
                    </span>
                </div>

                <div className='flex items-center gap-2 py-2 px-3 rounded-lg bg-accent/10 border border-accent/20'>
                    <Zap className='w-4 h-4 text-accent fill-current' />
                    <span className='text-accent font-semibold text-xs'>
                        Priority Delivery - 24 hours
                    </span>
                </div>

                <div className='space-y-3 py-4 border-y border-foreground/5 text-sm'>
                    <div className='flex items-center gap-2.5'>
                        <div className='w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center'>
                            <Sparkles className='w-3 h-3 text-primary' />
                        </div>
                        <span className='font-medium'>
                            {selectedPlan.revisions} Revision Rounds
                        </span>
                    </div>
                    {formData.recipient && (
                        <div className='flex items-center gap-2.5'>
                            <div className='w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center'>
                                <Heart className='w-3 h-3 text-primary' />
                            </div>
                            <span className='font-medium'>
                                For {formData.recipientName || formData.recipient || 'Someone Special'}
                            </span>
                        </div>
                    )}
                </div>

                <div className='flex items-center justify-between pt-1'>
                    <span className='font-bold text-base'>Total</span>
                    <span className='font-bold text-xl text-primary'>
                        ${selectedPlan.price.toFixed(2)}
                    </span>
                </div>
            </CardContent>

            <CardFooter className='p-6 bg-foreground/5 flex flex-col gap-3'>
                <div className='w-full space-y-2'>
                    <Input
                        placeholder='Save progress email'
                        className='rounded-lg h-9 text-xs bg-white border-transparent focus-visible:ring-primary/20'
                    />
                    <Button
                        variant='ghost'
                        size='sm'
                        className='w-full rounded-full text-xs font-medium text-foreground/70 hover:text-foreground'
                    >
                        Save Progress
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
