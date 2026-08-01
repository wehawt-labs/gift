'use client'

import { Check, Download, Heart, Music, Pause, Play, Share2, Sparkles, Volume2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export interface SongPlayerProps {
  orderId: string
  recipientName: string
  occasion: string
  genre: string
  tempo: string
  buyerName: string
  audioUrl?: string
  lyrics?: string
}

export function SongPlayerView({
  orderId: _orderId = 'ord_98231',
  recipientName = 'Emily',
  occasion = 'Anniversary',
  genre = 'Acoustic Pop',
  tempo = 'Warm & Cozy',
  buyerName = 'Alex',
  audioUrl = 'https://cdn.suno.com/sample_track.mp3',
  lyrics = `[Verse 1]
Rain falls softly on the Maine coastline
Standing under the porch with your hand in mine
Forgetting your apartment keys once again
A sweet quiet moment I never want to end.

[Chorus]
Three years flew by like a beautiful dream
Every melody brighter than it has ever been
Thank you for bringing your sunshine into my life
Making rainy days feel warm, cozy and bright.

[Outro]
Happy Anniversary my darling, my heart
Here is to forever, never to part...`
}: Partial<SongPlayerProps>) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className='min-h-screen bg-background px-4 py-12 font-sans text-foreground sm:px-6'>
      <div className='mx-auto max-w-2xl space-y-8'>
        {/* Gift Card Header */}
        <div className='space-y-3 text-center'>
          <div className='inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-heading font-semibold text-primary text-xs'>
            <Heart className='h-3.5 w-3.5 fill-current text-primary' />
            Personalized Song Gift
          </div>
          <h1 className='font-bold font-heading text-3xl text-foreground leading-snug sm:text-4xl'>
            A Song for {recipientName}
          </h1>
          <p className='mx-auto max-w-md font-sans text-muted-foreground text-sm'>
            Created with love by <span className='font-semibold text-foreground'>{buyerName}</span> for your {occasion}.
          </p>
        </div>

        {/* Audio Player Card (Stitch Aesthetic) */}
        <Card className='relative space-y-6 overflow-hidden rounded-3xl border-border/80 bg-card p-6 shadow-md'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md'>
                <Music className='h-6 w-6' />
              </div>
              <div>
                <h3 className='font-bold font-heading text-base text-foreground'>Melody for {recipientName}</h3>
                <p className='font-sans text-muted-foreground text-xs'>
                  {genre} • {tempo}
                </p>
              </div>
            </div>
            <span className='rounded-full bg-accent/15 px-3 py-1 font-bold font-heading text-[10px] text-accent uppercase tracking-wider'>
              Master Quality
            </span>
          </div>

          {/* Player Waveform Simulation */}
          <div className='space-y-3 rounded-2xl border border-border/60 bg-background/70 p-5'>
            <div className='flex items-center justify-between font-mono text-muted-foreground text-xs'>
              <span>1:24</span>
              <span>3:15</span>
            </div>

            {/* Animated Waveform Bars */}
            <div className='flex h-12 items-center justify-between gap-1 py-1'>
              {[
                40, 65, 30, 85, 95, 45, 70, 100, 60, 35, 75, 90, 50, 80, 40, 60, 85, 95, 30, 70, 50, 90, 60, 40, 75, 85,
                45, 60
              ].map((h, i) => (
                <div
                  key={`wave-bar-${i * 100 + h}`}
                  className={`w-1.5 rounded-full transition-all duration-300 ${i < 12 ? 'bg-primary' : 'bg-border/80'}`}
                  style={{ height: `${isPlaying ? Math.max(20, h + Math.sin(i) * 30) : h}%` }}
                />
              ))}
            </div>

            {/* Play Button & Volume */}
            <div className='flex items-center justify-between pt-2'>
              <div className='flex items-center gap-2 text-muted-foreground text-xs'>
                <Volume2 className='h-4 w-4' />
                <span>Volume</span>
              </div>

              <Button
                type='button'
                onClick={() => setIsPlaying(!isPlaying)}
                className='flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_4px_0_0_#842504] transition-all hover:bg-primary/90 active:translate-y-[2px]'
              >
                {isPlaying ? (
                  <Pause className='h-6 w-6 fill-current' />
                ) : (
                  <Play className='ml-0.5 h-6 w-6 fill-current' />
                )}
              </Button>

              <Button
                variant='ghost'
                size='sm'
                onClick={handleCopyShareLink}
                className='gap-1.5 text-muted-foreground text-xs hover:text-foreground'
              >
                <Share2 className='h-4 w-4' />
                Share
              </Button>
            </div>
          </div>

          {/* Action Buttons (Download & Share) */}
          <div className='grid grid-cols-2 gap-3 pt-2'>
            <Button
              type='button'
              onClick={() => window.open(audioUrl, '_blank')}
              className='h-11 gap-2 rounded-xl bg-primary font-bold font-heading text-primary-foreground text-xs shadow-[0_2px_0_0_#842504]'
            >
              <Download className='h-4 w-4' />
              Download MP3
            </Button>

            <Button
              type='button'
              variant='outline'
              onClick={handleCopyShareLink}
              className='h-11 gap-2 rounded-xl border-border/80 bg-background font-bold font-heading text-xs hover:bg-card'
            >
              {copiedLink ? (
                <>
                  <Check className='h-4 w-4 text-emerald-600' />
                  Link Copied!
                </>
              ) : (
                <>
                  <Share2 className='h-4 w-4' />
                  Copy Share Link
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Lyrics Section Card */}
        <Card className='space-y-4 rounded-3xl border-border/80 bg-card p-6 shadow-sm'>
          <div className='flex items-center gap-2 border-border/40 border-b pb-3'>
            <Sparkles className='h-4 w-4 text-primary' />
            <h2 className='font-bold font-heading text-foreground text-lg'>Song Lyrics</h2>
          </div>
          <pre className='whitespace-pre-wrap rounded-2xl border border-border/40 bg-background/50 p-5 font-medium font-sans text-foreground/90 text-sm leading-relaxed'>
            {lyrics}
          </pre>
        </Card>
      </div>
    </div>
  )
}
