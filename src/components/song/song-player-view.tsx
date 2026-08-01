'use client'

import { useState } from 'react'
import { Check, Download, Heart, Music, Pause, Play, Share2, Sparkles, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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
  orderId = 'ord_98231',
  recipientName = 'Thùy Chi',
  occasion = 'Anniversary',
  genre = 'Acoustic Pop',
  tempo = 'Warm & Cozy',
  buyerName = 'Minh Tuấn',
  audioUrl = 'https://cdn.suno.com/sample_track.mp3',
  lyrics = `[Verse 1]
Mưa Đà Lạt rơi nhẹ trên phím đàn
Cùng em trú chân nơi quán quen đầu làng
Chiếc chìa khóa nhà em lại lỡ quên
Nhắc anh mở cửa cùng nụ cười rất quen.

[Chorus]
Ba năm trôi qua nhanh như một giấc mơ
Tình yêu đôi ta vẫn đẹp như ý thơ
Cảm ơn em vì đã đến bên đời anh
Cho những ngày mưa cũng trở nên an lành.

[Outro]
Chúc mừng kỷ niệm ngày ta chung đôi
Yêu em nhiều hơn qua mỗi ngày trôi...`
}: Partial<SongPlayerProps>) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  return (
    <div className='min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 font-sans'>
      <div className='mx-auto max-w-2xl space-y-8'>
        {/* Gift Card Header */}
        <div className='text-center space-y-3'>
          <div className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-heading font-semibold text-xs border border-primary/20'>
            <Heart className='h-3.5 w-3.5 fill-current text-primary' />
            Personalized Song Gift
          </div>
          <h1 className='font-bold font-heading text-3xl sm:text-4xl text-foreground leading-snug'>
            A Song for {recipientName}
          </h1>
          <p className='text-sm text-muted-foreground font-sans max-w-md mx-auto'>
            Created with love by <span className='font-semibold text-foreground'>{buyerName}</span> for your {occasion}.
          </p>
        </div>

        {/* Audio Player Card (Stitch Aesthetic) */}
        <Card className='overflow-hidden rounded-3xl border-border/80 bg-card p-6 shadow-md space-y-6 relative'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-md'>
                <Music className='h-6 w-6' />
              </div>
              <div>
                <h3 className='font-bold font-heading text-base text-foreground'>Melody for {recipientName}</h3>
                <p className='text-xs text-muted-foreground font-sans'>{genre} • {tempo}</p>
              </div>
            </div>
            <span className='rounded-full bg-accent/15 px-3 py-1 font-bold text-[10px] text-accent uppercase font-heading tracking-wider'>
              Master Quality
            </span>
          </div>

          {/* Player Waveform Simulation */}
          <div className='space-y-3 bg-background/70 p-5 rounded-2xl border border-border/60'>
            <div className='flex items-center justify-between text-xs text-muted-foreground font-mono'>
              <span>1:24</span>
              <span>3:15</span>
            </div>

            {/* Animated Waveform Bars */}
            <div className='flex items-center justify-between gap-1 h-12 py-1'>
              {[40, 65, 30, 85, 95, 45, 70, 100, 60, 35, 75, 90, 50, 80, 40, 60, 85, 95, 30, 70, 50, 90, 60, 40, 75, 85, 45, 60].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    i < 12 ? 'bg-primary' : 'bg-border/80'
                  }`}
                  style={{ height: `${isPlaying ? Math.max(20, (h + Math.sin(i) * 30)) : h}%` }}
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
                className='h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-[0_4px_0_0_#842504] hover:bg-primary/90 active:translate-y-[2px] transition-all flex items-center justify-center'
              >
                {isPlaying ? <Pause className='h-6 w-6 fill-current' /> : <Play className='h-6 w-6 fill-current ml-0.5' />}
              </Button>

              <Button variant='ghost' size='sm' onClick={handleCopyShareLink} className='text-xs gap-1.5 text-muted-foreground hover:text-foreground'>
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
              className='h-11 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-xs gap-2 shadow-[0_2px_0_0_#842504]'
            >
              <Download className='h-4 w-4' />
              Download MP3
            </Button>

            <Button
              type='button'
              variant='outline'
              onClick={handleCopyShareLink}
              className='h-11 rounded-xl border-border/80 font-heading font-bold text-xs gap-2 bg-background hover:bg-card'
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
        <Card className='rounded-3xl border-border/80 bg-card p-6 shadow-sm space-y-4'>
          <div className='flex items-center gap-2 border-b border-border/40 pb-3'>
            <Sparkles className='h-4 w-4 text-primary' />
            <h2 className='font-bold font-heading text-lg text-foreground'>Song Lyrics</h2>
          </div>
          <pre className='whitespace-pre-wrap font-sans text-sm text-foreground/90 leading-relaxed bg-background/50 p-5 rounded-2xl border border-border/40 font-medium'>
            {lyrics}
          </pre>
        </Card>
      </div>
    </div>
  )
}
