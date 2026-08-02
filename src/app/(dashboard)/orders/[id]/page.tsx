'use client'

import { ArrowLeft, MessageSquare, Play, Send, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { use, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export interface ChatMessage {
  id: string
  sender: 'user' | 'chef'
  senderName: string
  text: string
  createdAt: string
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const orderId = resolvedParams.id

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'chef',
      senderName: 'Song Chef (Antigravity)',
      text: 'Hi there! I received your order for Emily. I am crafting the acoustic pop melody right now. Feel free to send any extra lyric notes here!',
      createdAt: '18:35'
    },
    {
      id: 'm2',
      sender: 'user',
      senderName: 'You',
      text: 'Could we emphasize the rainy Maine road trip in the chorus? That is her absolute favorite memory!',
      createdAt: '18:42'
    }
  ])
  const [inputText, setInputText] = useState('')

  const handleSendMessage = () => {
    if (!inputText.trim()) return
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: 'You',
      text: inputText.trim(),
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages((prev) => [...prev, newMsg])
    setInputText('')
    toast.success('Note Sent to Song Chef!', {
      description: 'Your Song Chef will incorporate your request into the final mix.'
    })
  }

  return (
    <div className='mx-auto max-w-4xl space-y-6 font-sans'>
      {/* Top Navigation */}
      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          size='sm'
          nativeButton={false}
          render={
            <Link href='/orders'>
              <ArrowLeft className='h-3.5 w-3.5' />
              Back to My Songs
            </Link>
          }
          className='h-8 gap-1.5 px-2 text-muted-foreground text-xs hover:text-foreground'
        />
      </div>

      {/* Order Header Summary Card */}
      <Card className='space-y-4 rounded-3xl border border-border/80 bg-card p-6 shadow-md'>
        <div className='flex flex-col justify-between gap-4 border-border/40 border-b pb-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-3'>
            <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary font-bold text-primary-foreground text-xl shadow-md'>
              🎵
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='font-bold font-heading text-foreground text-xl'>Song for Emily (Anniversary)</h1>
                <Badge className='border-emerald-500/30 bg-emerald-500/15 font-bold text-[10px] text-emerald-800 uppercase'>
                  Ready for Review ✓
                </Badge>
              </div>
              <p className='mt-0.5 font-sans text-muted-foreground text-xs'>
                Order ID: <span className='font-bold font-mono text-foreground'>#{orderId}</span> • Placed on Aug 1,
                2026
              </p>
            </div>
          </div>

          <Button
            type='button'
            nativeButton={false}
            render={
              <Link href={`/song/${orderId}`}>
                <Play className='h-4 w-4 fill-current' />
                Open Player & Lyrics
              </Link>
            }
            className='h-10 gap-2 rounded-xl bg-primary px-4 font-bold font-heading text-primary-foreground text-xs shadow-sm'
          />
        </div>

        {/* Order Details Grid */}
        <div className='grid grid-cols-2 gap-3 pt-1 font-sans text-xs sm:grid-cols-4'>
          <div className='rounded-xl border border-border/40 bg-background p-3'>
            <p className='font-heading font-semibold text-[11px] text-muted-foreground'>Genre</p>
            <p className='mt-0.5 font-bold text-foreground'>Acoustic Pop</p>
          </div>
          <div className='rounded-xl border border-border/40 bg-background p-3'>
            <p className='font-heading font-semibold text-[11px] text-muted-foreground'>Mood / Style</p>
            <p className='mt-0.5 font-bold text-foreground'>Warm & Cozy</p>
          </div>
          <div className='rounded-xl border border-border/40 bg-background p-3'>
            <p className='font-heading font-semibold text-[11px] text-muted-foreground'>Vocal Tone</p>
            <p className='mt-0.5 font-bold text-foreground'>Male Vocal</p>
          </div>
          <div className='rounded-xl border border-border/40 bg-background p-3'>
            <p className='font-heading font-semibold text-[11px] text-muted-foreground'>Subscription Tier</p>
            <p className='mt-0.5 font-bold text-primary'>Memory Maker</p>
          </div>
        </div>
      </Card>

      {/* Refinement Chat & Chef Communication Card */}
      <Card className='space-y-4 rounded-3xl border border-border/80 bg-card p-6 shadow-md'>
        <div className='flex items-center justify-between border-border/40 border-b pb-3'>
          <div className='flex items-center gap-2'>
            <MessageSquare className='h-5 w-5 text-primary' />
            <h2 className='font-bold font-heading text-base text-foreground'>Chef Refinement & Chat</h2>
          </div>
          <span className='flex items-center gap-1 font-sans text-muted-foreground text-xs'>
            <ShieldCheck className='h-3.5 w-3.5 text-emerald-600' />
            Human-in-the-loop Assistant
          </span>
        </div>

        {/* Chat Messages Stream */}
        <div className='max-h-[300px] min-h-[180px] space-y-3 overflow-y-auto rounded-2xl border border-border/40 bg-background p-4'>
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
              <div className='mb-1 flex items-center gap-2 font-sans text-[11px] text-muted-foreground'>
                <span className='font-bold text-foreground'>{msg.senderName}</span>
                <span>• {msg.createdAt}</span>
              </div>
              <div
                className={`max-w-sm rounded-2xl p-3 font-sans text-xs leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'rounded-tr-none bg-primary text-primary-foreground'
                    : 'rounded-tl-none border border-border bg-card text-foreground'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Send Input Message Box */}
        <div className='flex items-center gap-2 pt-1'>
          <Input
            placeholder='Ask Song Chef to tweak lyrics, adjust tempo, or add details...'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage()
            }}
            className='h-11 rounded-xl border-border bg-background px-4 font-sans text-foreground text-xs placeholder:text-muted-foreground focus-visible:ring-primary/20'
          />
          <Button
            type='button'
            onClick={handleSendMessage}
            className='h-11 shrink-0 gap-1.5 rounded-xl bg-primary px-4 font-bold font-heading text-primary-foreground text-xs shadow-sm'
          >
            <Send className='h-4 w-4' />
            <span>Send</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}
