'use client'

import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  PartyPopper,
  User
} from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

const occasions = [
  'Birthday',
  'Anniversary',
  'Wedding',
  'Just Because',
  'Holiday'
]

const relationships = [
  'Partner/Spouse',
  'Parent',
  'Child',
  'Friend',
  'Sibling',
  'Grandparent',
  'Other'
]

interface OccasionFormProps {
  onNext: () => void
  onBack: () => void
}

export function OccasionForm({ onNext, onBack }: OccasionFormProps) {
  const [selectedOccasion, setSelectedOccasion] = useState('Anniversary')

  return (
    <div className='rounded-3xl bg-card p-8 shadow-sm'>
      {/* Header */}
      <div className='flex items-center gap-3 border-border border-b pb-6'>
        <PartyPopper className='h-6 w-6 text-primary' />
        <h2 className='font-semibold text-2xl text-foreground'>The Occasion</h2>
      </div>

      {/* Form */}
      <div className='mt-8 space-y-6'>
        {/* Row 1: Who and What */}
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='recipient'>Who is this song for?</Label>
            <div className='relative'>
              <Input
                id='recipient'
                placeholder='e.g., My partner, Sarah'
                className='rounded-xl pr-10'
              />
              <User className='absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='occasion'>What is the occasion?</Label>
            <div className='relative'>
              <Input
                id='occasion'
                placeholder='e.g., 5th Anniversary'
                className='rounded-xl pr-10'
              />
              <Calendar className='absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
            </div>
          </div>
        </div>

        {/* Common occasions */}
        <div className='space-y-2'>
          <Label className='text-muted-foreground text-xs uppercase tracking-widest'>
            COMMON OCCASIONS
          </Label>
          <div className='flex flex-wrap gap-2'>
            {occasions.map((occasion) => (
              <button
                key={occasion}
                type='button'
                onClick={() => setSelectedOccasion(occasion)}
                className={`rounded-full border px-4 py-2 font-medium text-sm transition-colors ${
                  selectedOccasion === occasion
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                {occasion}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: When and Relationship */}
        <div className='grid gap-6 md:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='date'>When do you need it?</Label>
            <div className='relative'>
              <Input id='date' type='date' className='rounded-xl' />
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='relationship'>Relationship</Label>
            <Select>
              <SelectTrigger className='rounded-xl'>
                <SelectValue placeholder='Select relationship...' />
              </SelectTrigger>
              <SelectContent>
                {relationships.map((rel) => (
                  <SelectItem key={rel} value={rel.toLowerCase()}>
                    {rel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick details */}
        <div className='space-y-2'>
          <Label htmlFor='details'>Any quick details?</Label>
          <Textarea
            id='details'
            placeholder='Briefly describe the sentiment (e.g., funny, heartfelt, nostalgic)...'
            className='min-h-[100px] resize-none rounded-xl'
          />
        </div>
      </div>

      {/* Actions */}
      <div className='mt-8 flex justify-between'>
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
          Next: The Vibe
          <ArrowRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
