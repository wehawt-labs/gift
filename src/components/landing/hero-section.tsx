'use client'

import { ArrowRight, Headphones, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

export function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className='relative overflow-hidden bg-background pt-32 pb-20 lg:pt-40 lg:pb-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          {/* Left content */}
          <div className='flex flex-col items-center text-center lg:items-start lg:text-left'>
            {/* Badge */}
            <div className='mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary'>
              🎁 THE MOST PERSONAL GIFT
            </div>

            {/* Title */}
            <h1 className='font-heading text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl'>
              Turn your <span className='italic text-primary'>memories</span>
              <br />
              into a melody.
            </h1>

            {/* Description */}
            <p className='mt-6 max-w-lg text-lg text-muted-foreground'>
              The perfect gift for the people who mean the world to you. Custom
              songs written and recorded by professional artists, just for them.
            </p>

            {/* CTAs */}
            <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
              <Button
                href='/order/new'
                size='lg'
                className='rounded-full px-8 shadow-lg shadow-primary/20'
              >
                Start Your Song
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='rounded-full px-8'
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <Headphones className='mr-2 h-4 w-4' />
                Listen to Samples
              </Button>
            </div>
          </div>

          {/* Right content - Image with audio player */}
          <div className='relative'>
            {/* Main image */}
            <div className='relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted'>
              <Image
                src='/hero-couple.jpg'
                alt='Happy couple'
                fill
                className='object-cover'
                priority
              />
            </div>

            {/* Floating audio player card */}
            <div className='absolute -bottom-6 left-4 right-4 rounded-2xl bg-card p-4 shadow-xl sm:left-8 sm:right-8'>
              <div className='flex items-center gap-4'>
                <button
                  type='button'
                  onClick={() => setIsPlaying(!isPlaying)}
                  className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                >
                  {isPlaying ? (
                    <Pause className='h-5 w-5' />
                  ) : (
                    <Play className='ml-1 h-5 w-5' />
                  )}
                </button>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium text-foreground'>
                    Our First Anniversary
                  </p>
                  {/* Waveform placeholder */}
                  <div className='mt-2 flex h-8 items-center gap-0.5'>
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: pure visual elements
                        key={`waveform-bar-${i}`}
                        className='w-1 rounded-full bg-primary/30'
                        style={{
                          height: `${Math.random() * 100}%`,
                          minHeight: '4px'
                        }}
                      />
                    ))}
                  </div>
                </div>
                <span className='text-sm text-muted-foreground'>2:45</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
