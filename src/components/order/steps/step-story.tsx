'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Sparkles } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export function StepStory() {
    const {
        register,
        formState: { errors }
    } = useFormContext()

    return (
        <div className='space-y-6'>
            <div>
                <h2 className='font-serif text-2xl font-bold text-foreground'>
                    Tell their story
                </h2>
                <p className='mt-1 text-foreground/60 text-base'>
                    Give us the details, our AI will handle the rhymes.
                </p>
            </div>

            <div className='space-y-4'>
                <div className='space-y-2'>
                    <Label htmlFor='memory' className='font-semibold'>What's your favorite memory together?</Label>
                    <Textarea
                        id='memory'
                        placeholder='Tell us about a specific trip, a quiet moment, or a big celebration...'
                        className='rounded-xl min-h-[80px] bg-white border-foreground/10 focus-visible:ring-primary/20 focus-visible:border-primary'
                        {...register('memory')}
                    />
                    {errors.memory && (
                        <p className='text-destructive text-xs mt-1'>
                            {errors.memory.message as string}
                        </p>
                    )}
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='jokes' className='font-semibold'>Any inside jokes, quirks, or specific details?</Label>
                    <Textarea
                        id='jokes'
                        placeholder='Those little things that only they would understand...'
                        className='rounded-xl min-h-[80px] bg-white border-foreground/10 focus-visible:ring-primary/20 focus-visible:border-primary'
                        {...register('jokes')}
                    />
                </div>

                <div className='space-y-2'>
                    <Label htmlFor='coreMessage' className='font-semibold'>What is the core message you want to say?</Label>
                    <Textarea
                        id='coreMessage'
                        placeholder='I love you because... / Thank you for... / Happy birthday because...'
                        className='rounded-xl min-h-[80px] bg-white border-foreground/10 focus-visible:ring-primary/20 focus-visible:border-primary'
                        {...register('coreMessage')}
                    />
                    {errors.coreMessage && (
                        <p className='text-destructive text-xs mt-1'>
                            {errors.coreMessage.message as string}
                        </p>
                    )}
                </div>

                <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    className='rounded-full px-5 text-primary border-primary/30 hover:bg-primary/5'
                >
                    <Sparkles className='mr-2 w-3.5 h-3.5' />
                    Help me write this with AI
                </Button>
            </div>
        </div>
    )
}
