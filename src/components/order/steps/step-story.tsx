'use client'

import { Sparkles } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function StepStory({ validationTrigger }: { validationTrigger: number }) {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='font-bold font-heading text-2xl text-foreground'>Tell your story</h2>
        <p className='mt-1 text-sm text-muted-foreground font-sans'>Share special memories, inside jokes, or your message to personalize the lyrics.</p>
      </div>

      <div className='space-y-6'>
        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm relative'>
          <div className='flex justify-between items-center'>
            <Label htmlFor='memory' className='font-semibold font-heading text-base text-foreground'>
              What's your favorite memory together?
            </Label>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='rounded-full text-xs font-semibold text-primary hover:bg-primary/10 transition-colors flex items-center gap-1.5'
            >
              <Sparkles className='h-3.5 w-3.5 text-primary' />
              Refine with AI
            </Button>
          </div>
          <Textarea
            id='memory'
            placeholder='Share a special trip, a quiet moment, or a big celebration...'
            className='min-h-[100px] rounded-xl border-border bg-background p-3 font-sans text-sm text-foreground focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground resize-none'
            {...register('memory')}
          />
          <FormErrorMessage message={errors.memory?.message as string} trigger={validationTrigger} />
        </div>

        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm'>
          <Label htmlFor='jokes' className='font-semibold font-heading text-base text-foreground'>
            Any inside jokes, quirks, or specific details?
          </Label>
          <Textarea
            id='jokes'
            placeholder='Those little things that only they would understand...'
            className='min-h-[90px] rounded-xl border-border bg-background p-3 font-sans text-sm text-foreground focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground resize-none'
            {...register('jokes')}
          />
        </div>

        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm'>
          <Label htmlFor='coreMessage' className='font-semibold font-heading text-base text-foreground'>
            What is the core message you want to say?
          </Label>
          <Textarea
            id='coreMessage'
            placeholder='I love you because... / Thank you for... / Happy birthday because...'
            className='min-h-[90px] rounded-xl border-border bg-background p-3 font-sans text-sm text-foreground focus-visible:border-primary focus-visible:ring-primary/20 placeholder:text-muted-foreground resize-none'
            {...register('coreMessage')}
          />
          <FormErrorMessage message={errors.coreMessage?.message as string} trigger={validationTrigger} />
        </div>
      </div>
    </div>
  )
}
