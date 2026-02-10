'use client'

import { ArrowLeft, ArrowRight, Heart, Music2, Sparkles } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

const genres = [
  { id: 'pop', name: 'Pop', description: 'Modern, catchy, and polished' },
  {
    id: 'acoustic',
    name: 'Acoustic',
    description: 'Raw, intimate, and stripped-back'
  },
  { id: 'folk', name: 'Folk', description: 'Story-driven, warm, and organic' },
  {
    id: 'rnb',
    name: 'R&B / Soul',
    description: 'Smooth, emotional, and groovy'
  },
  { id: 'rock', name: 'Rock', description: 'High energy, anthemic, and bold' },
  {
    id: 'country',
    name: 'Country',
    description: 'Nostalgic, twangy, and heartfelt'
  }
]

const moods = [
  'Romantic',
  'Emotional',
  'Upbeat',
  'Nostalgic',
  'Funny',
  'Heartfelt',
  'Inspirational',
  'Relaxed'
]

interface VibeFormProps {
  onNext: () => void
  onBack: () => void
}

export function VibeForm({ onNext, onBack }: VibeFormProps) {
  const [selectedGenre, setSelectedGenre] = useState('pop')
  const [selectedMoods, setSelectedMoods] = useState<string[]>(['Heartfelt'])

  const toggleMood = (mood: string) => {
    setSelectedMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood]
    )
  }

  return (
    <div className='rounded-3xl bg-card p-8 shadow-sm'>
      {/* Header */}
      <div className='flex items-center gap-3 border-border border-b pb-6'>
        <Music2 className='h-6 w-6 text-primary' />
        <h2 className='font-semibold text-2xl text-foreground'>The Vibe</h2>
      </div>

      {/* Form */}
      <div className='mt-8 space-y-10'>
        {/* Genre Selection */}
        <div className='space-y-4'>
          <div className='flex items-center gap-2'>
            <Sparkles className='h-4 w-4 text-primary' />
            <Label className='font-semibold text-lg'>Select Genre</Label>
          </div>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {genres.map((genre) => (
              <button
                key={genre.id}
                type='button'
                onClick={() => setSelectedGenre(genre.id)}
                className={`flex flex-col items-start rounded-2xl border p-4 text-left transition-all ${
                  selectedGenre === genre.id
                    ? 'border-primary bg-primary/5 ring-2 ring-primary'
                    : 'border-border bg-background hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <span className='font-bold text-foreground'>{genre.name}</span>
                <span className='mt-1 text-muted-foreground text-xs font-normal'>
                  {genre.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Mood/Vibe Selection */}
        <div className='space-y-4'>
          <div className='flex items-center gap-2'>
            <Heart className='h-4 w-4 text-primary' />
            <Label className='font-semibold text-lg'>What's the energy?</Label>
          </div>
          <div className='flex flex-wrap gap-2'>
            {moods.map((mood) => (
              <button
                key={mood}
                type='button'
                onClick={() => toggleMood(mood)}
                className={`rounded-full border px-4 py-2 font-medium text-sm transition-colors ${
                  selectedMoods.includes(mood)
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
          <p className='text-muted-foreground text-xs'>
            Pick as many as you'd like to help the artist capture the right
            feel.
          </p>
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
        >
          Next: Your Story
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
