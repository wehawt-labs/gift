'use client'

import { Sparkles } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function StepStory({
  validationTrigger
}: {
  validationTrigger: number
}) {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='font-bold font-serif text-2xl text-foreground'>
          Tell their story
        </h2>
        <p className='mt-1 text-base text-foreground/60'>
          Give us the details, our AI will handle the rhymes.
        </p>
      </div>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='memory' className='font-semibold'>
            What's your favorite memory together?
          </Label>
          <Textarea
            id='memory'
            placeholder='Tell us about a specific trip, a quiet moment, or a big celebration...'
            className='min-h-[80px] rounded-xl border-foreground/10 bg-white focus-visible:border-primary focus-visible:ring-primary/20'
            {...register('memory')}
          />
          <FormErrorMessage
            message={errors.memory?.message as string}
            trigger={validationTrigger}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='jokes' className='font-semibold'>
            Any inside jokes, quirks, or specific details?
          </Label>
          <Textarea
            id='jokes'
            placeholder='Those little things that only they would understand...'
            className='min-h-[80px] rounded-xl border-foreground/10 bg-white focus-visible:border-primary focus-visible:ring-primary/20'
            {...register('jokes')}
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='coreMessage' className='font-semibold'>
            What is the core message you want to say?
          </Label>
          <Textarea
            id='coreMessage'
            placeholder='I love you because... / Thank you for... / Happy birthday because...'
            className='min-h-[80px] rounded-xl border-foreground/10 bg-white focus-visible:border-primary focus-visible:ring-primary/20'
            {...register('coreMessage')}
          />
          <FormErrorMessage
            message={errors.coreMessage?.message as string}
            trigger={validationTrigger}
          />
        </div>

        <Button
          type='button'
          variant='outline'
          size='sm'
          className='rounded-full border-primary/30 px-5 text-primary hover:bg-primary/5'
        >
          <Sparkles className='mr-2 h-3.5 w-3.5' />
          Help me write this with AI
        </Button>
      </div>
    </div>
  )
}
