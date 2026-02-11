'use client'

import { Play, Pause, Music } from 'lucide-react'
import { useState } from 'react'

const samples = [
  {
    title: 'Acoustic Love Song',
    genre: 'Acoustic Pop',
    description: 'Perfect for anniversaries and romantic gestures.',
    duration: '2:45'
  },
  {
    title: 'Uplifting Birthday Anthem',
    genre: 'Bright Pop',
    description: 'Energetic and fun, perfect for celebrating another year.',
    duration: '3:10'
  },
  {
    title: 'Sentimental Folk Ballad',
    genre: 'Contemporary Folk',
    description: 'Deeply emotional, great for tributes and family memories.',
    duration: '3:25'
  }
]

export function SamplesSection() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  return (
    <section id='samples' className='bg-background py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='text-center'>
          <h2 className='font-bold font-heading text-3xl text-foreground md:text-4xl'>
            Listen to our{' '}
            <span className='text-primary italic'>masterpieces</span>
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
            Every song we create is unique, but the quality is always
            consistent. Experience how we transform stories into music.
          </p>
        </div>

        <div className='mt-16 grid gap-6 md:grid-cols-3'>
          {samples.map((sample, index) => (
            <div
              key={sample.title}
              className='group relative flex flex-col overflow-hidden rounded-3xl bg-card border border-border/50 shadow-sm transition-all hover:shadow-md'
            >
              <div className='aspect-video bg-muted flex items-center justify-center overflow-hidden relative'>
                <div className='absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors' />
                <Music className='h-12 w-12 text-primary/20' />

                <button
                  type='button'
                  onClick={() =>
                    setPlayingIndex(playingIndex === index ? null : index)
                  }
                  className='absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-transform group-hover:scale-110 active:scale-95'
                >
                  {playingIndex === index ? (
                    <Pause className='h-5 w-5' />
                  ) : (
                    <Play className='ml-1 h-5 w-5' />
                  )}
                </button>
              </div>

              <div className='p-6'>
                <div className='flex items-center justify-between'>
                  <span className='rounded-full bg-primary/10 px-3 py-1 text-primary text-xs font-semibold'>
                    {sample.genre}
                  </span>
                  <span className='text-muted-foreground text-xs'>
                    {sample.duration}
                  </span>
                </div>
                <h3 className='mt-3 font-semibold text-foreground text-lg group-hover:text-primary transition-colors'>
                  {sample.title}
                </h3>
                <p className='mt-2 text-muted-foreground text-sm line-clamp-2'>
                  {sample.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
