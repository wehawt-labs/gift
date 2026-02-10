'use client'

import { ArrowLeft, BookOpen, Music, Wand2 } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface StoryFormProps {
  onNext: () => void
  onBack: () => void
}

export function StoryForm({ onNext, onBack }: StoryFormProps) {
  const [prompt, setPrompt] = useState('')

  return (
    <div className='rounded-3xl bg-card p-8 shadow-sm'>
      {/* Header */}
      <div className='flex items-center gap-3 border-border border-b pb-6'>
        <BookOpen className='h-6 w-6 text-primary' />
        <h2 className='font-semibold text-2xl text-foreground'>Your Story</h2>
      </div>

      {/* Form */}
      <div className='mt-8 space-y-6'>
        <div className='space-y-4'>
          <Label htmlFor='story' className='text-lg font-medium'>
            What should the song be about?
          </Label>
          <p className='text-sm text-muted-foreground'>
            Share your favorite memories, inside jokes, or the message you want
            to send. The more details you give, the better the song!
          </p>
          <Textarea
            id='story'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder='e.g., We met at a coffee shop in Paris. He always forgets his keys, but never our anniversary. He loves the way I laugh at his dad jokes...'
            className='min-h-[200px] rounded-2xl p-4 text-base'
          />
        </div>

        {/* AI Assistance Tip */}
        <div className='flex items-start gap-3 rounded-2xl bg-primary/5 p-4 border border-primary/10'>
          <Wand2 className='mt-1 h-5 w-5 text-primary' />
          <div className='text-sm text-foreground/80 leading-relaxed'>
            <span className='font-bold text-primary'>Pro Tip:</span> Mention
            specific names, places, and small details that only the two of you
            know. It makes the song feel truly personal.
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className='mt-12 flex justify-between'>
        <Button
          type='button'
          variant='outline'
          className='rounded-full'
          onClick={onBack}
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back
        </Button>
        <Button
          type='button'
          className='rounded-full px-8 shadow-lg shadow-primary/20'
          onClick={onNext}
          disabled={prompt.length < 20}
        >
          {prompt.length < 20 ? 'Tell us more...' : 'Submit Order'}
          <Music className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
