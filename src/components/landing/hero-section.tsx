'use client'

import { useWavesurfer } from '@wavesurfer/react'
import { ArrowRight, Headphones, Pause, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [url] = useState(
    'https://www.sandvik.com/globalassets/media/sample-audio.mp3'
  )

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 32,
    waveColor: 'rgba(224, 122, 95, 0.3)', // primary/30
    progressColor: '#E07A5F', // primary
    url,
    barWidth: 2,
    barGap: 3,
    barRadius: 2,
    cursorWidth: 0
  })

  const onPlayPause = useCallback(() => {
    wavesurfer?.playPause()
  }, [wavesurfer])

  // Format time (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secondsLeft = Math.floor(seconds % 60)
    return `${minutes}:${secondsLeft.toString().padStart(2, '0')}`
  }

  return (
    <section className='relative overflow-hidden bg-background pt-32 pb-20 lg:pt-40 lg:pb-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          {/* Left content */}
          <div className='flex flex-col items-center text-center lg:items-start lg:text-left'>
            {/* Badge */}
            <div className='mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 font-bold text-primary text-sm animate-bounce'>
              💝 14/2 SALE: STARTING AT $19 • 24H DELIVERY
            </div>

            {/* Title */}
            <h1 className='font-bold font-heading text-4xl text-foreground leading-tight tracking-tight md:text-5xl lg:text-6xl'>
              Turn your <span className='text-primary italic'>memories</span>
              <br />
              into a melody.
            </h1>

            {/* Description */}
            <p className='mt-6 max-w-lg text-lg text-muted-foreground'>
              The perfect gift for the people who mean the world to you. We
              create meaningful, personalized songs inspired by your unique
              stories and memories.
            </p>

            {/* CTAs */}
            <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
              <Button
                size='lg'
                className='rounded-full px-8 shadow-lg shadow-primary/20'
                nativeButton={false}
                render={
                  <Link href='/order/new'>
                    Start Your Song
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                }
              />
              <Button
                variant='outline'
                size='lg'
                className='rounded-full px-8'
                onClick={onPlayPause}
              >
                <Headphones className='mr-2 h-4 w-4' />
                Listen to Samples
              </Button>
            </div>
          </div>

          {/* Right content - Image with audio player */}
          <div className='relative'>
            {/* Main image */}
            <div className='relative aspect-4/3 overflow-hidden rounded-3xl bg-muted'>
              <Image
                src='/hero-couple.jpg'
                alt='Happy couple'
                fill
                className='object-cover'
                priority
              />
            </div>

            {/* Floating audio player card */}
            <div className='absolute right-4 -bottom-6 left-4 rounded-2xl bg-card p-4 shadow-xl sm:right-8 sm:left-8'>
              <div className='flex items-center gap-4'>
                <button
                  type='button'
                  onClick={onPlayPause}
                  className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                >
                  {isPlaying ? (
                    <Pause className='h-5 w-5' />
                  ) : (
                    <Play className='ml-1 h-5 w-5' />
                  )}
                </button>
                <div className='min-w-0 flex-1'>
                  <p className='truncate font-medium text-foreground text-sm'>
                    Our First Anniversary
                  </p>
                  {/* Waveform container */}
                  <div className='mt-2 h-8' ref={containerRef} />
                </div>
                <span className='text-muted-foreground text-sm'>
                  {formatTime(currentTime)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
