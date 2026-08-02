'use client'

import { CheckCircle2, ChevronRight, Clock, MessageSquare, Play, PlusCircle, RefreshCw, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export interface UserOrder {
  id: string
  createdAt: string
  recipientName: string
  occasion: string
  genre: string
  tempo: string
  planName: string
  status: 'pending_payment' | 'cooking' | 'completed'
  audioUrl?: string
  messagesCount: number
}

const MOCK_USER_ORDERS: UserOrder[] = [
  {
    id: 'ord_98231',
    createdAt: '2026-08-01 18:30',
    recipientName: 'Emily',
    occasion: 'Anniversary',
    genre: 'Acoustic Pop',
    tempo: 'Warm & Cozy',
    planName: 'Memory Maker ($29.99/mo)',
    status: 'completed',
    audioUrl: 'https://cdn.suno.com/sample_track.mp3',
    messagesCount: 2
  },
  {
    id: 'ord_98235',
    createdAt: '2026-08-01 20:15',
    recipientName: 'Mom (Helen)',
    occasion: 'Birthday',
    genre: 'Rock Ballad',
    tempo: 'Tear-Jerker',
    planName: 'Family Bond ($9.99/mo)',
    status: 'cooking',
    messagesCount: 1
  },
  {
    id: 'ord_98240',
    createdAt: '2026-08-01 22:00',
    recipientName: 'Michael',
    occasion: 'Just Because',
    genre: 'EDM',
    tempo: 'Joyful & Upbeat',
    planName: 'Single Gift (Free)',
    status: 'pending_payment',
    messagesCount: 0
  }
]

export default function UserOrdersPage() {
  const [orders] = useState<UserOrder[]>(MOCK_USER_ORDERS)

  const getStatusBadge = (status: UserOrder['status']) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className='gap-1 border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 font-bold font-heading text-emerald-800 text-xs'>
            <CheckCircle2 className='h-3.5 w-3.5 text-emerald-600' />
            Ready for Review & Listen
          </Badge>
        )
      case 'cooking':
        return (
          <Badge className='animate-pulse gap-1.5 border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 font-bold font-heading text-[#9A6A1E] text-xs'>
            <Sparkles className='h-3.5 w-3.5 text-[#9A6A1E]' />
            Song Chef Cooking 👨‍🍳
          </Badge>
        )
      case 'pending_payment':
        return (
          <Badge className='gap-1 border-rose-500/30 bg-rose-500/15 px-2.5 py-0.5 font-bold font-heading text-rose-800 text-xs'>
            <Clock className='h-3.5 w-3.5 text-rose-600' />
            Pending Payment
          </Badge>
        )
    }
  }

  return (
    <div className='space-y-8 font-sans'>
      {/* Header Banner */}
      <div className='flex flex-col justify-between gap-4 border-border/40 border-b pb-6 sm:flex-row sm:items-center'>
        <div>
          <h1 className='font-bold font-heading text-2xl text-foreground leading-snug sm:text-3xl'>My Custom Songs</h1>
          <p className='mt-1 font-sans text-muted-foreground text-sm'>
            Track song creation progress, listen to finished tracks, and talk with your Song Chef.
          </p>
        </div>

        <Button
          type='button'
          asChild
          className='h-10 shrink-0 gap-2 rounded-xl bg-primary px-4 font-bold font-heading text-primary-foreground text-xs shadow-[0_2px_0_0_#842504]'
        >
          <Link href='/order/new'>
            <PlusCircle className='h-4 w-4' />
            Create Another Song
          </Link>
        </Button>
      </div>

      {/* Orders List */}
      <div className='space-y-4'>
        {orders.map((order) => (
          <Card
            key={order.id}
            className='relative overflow-hidden rounded-2xl border border-border/70 bg-card p-5 shadow-xs transition-all hover:shadow-md'
          >
            <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
              {/* Order Info Left */}
              <div className='max-w-xl space-y-2'>
                <div className='flex flex-wrap items-center gap-2.5'>
                  <span className='font-bold font-mono text-muted-foreground text-xs'>#{order.id}</span>
                  {getStatusBadge(order.status)}
                  <span className='font-sans text-muted-foreground text-xs'>• {order.createdAt}</span>
                </div>

                <div className='flex items-center gap-2.5'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-bold text-base text-primary'>
                    🎵
                  </div>
                  <div>
                    <h3 className='font-bold font-heading text-base text-foreground'>
                      Song for {order.recipientName} ({order.occasion})
                    </h3>
                    <p className='font-sans text-muted-foreground text-xs'>
                      {order.genre} • {order.tempo} •{' '}
                      <span className='font-medium text-foreground'>{order.planName}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons Right */}
              <div className='flex flex-wrap items-center gap-2 border-border/40 border-t pt-2 md:border-t-0 md:pt-0'>
                {order.status === 'completed' && (
                  <Button
                    type='button'
                    asChild
                    className='h-9 gap-1.5 rounded-xl bg-primary px-3.5 font-bold font-heading text-primary-foreground text-xs shadow-sm'
                  >
                    <Link href={`/song/${order.id}`}>
                      <Play className='h-3.5 w-3.5 fill-current' />
                      Listen & Share
                    </Link>
                  </Button>
                )}

                {order.status === 'pending_payment' && (
                  <Button
                    type='button'
                    onClick={() => alert('Opening Lemon Squeezy payment popup...')}
                    className='h-9 gap-1.5 rounded-xl bg-rose-600 px-3.5 font-bold font-heading text-white text-xs shadow-sm hover:bg-rose-700'
                  >
                    <RefreshCw className='h-3.5 w-3.5' />
                    Complete Payment
                  </Button>
                )}

                <Button
                  type='button'
                  variant='outline'
                  asChild
                  className='h-9 gap-1.5 rounded-xl border-border bg-background font-heading font-semibold text-xs hover:bg-card'
                >
                  <Link href={`/orders/${order.id}`}>
                    <MessageSquare className='h-3.5 w-3.5 text-primary' />
                    <span>Chat / Refine</span>
                    {order.messagesCount > 0 && (
                      <span className='ml-1 rounded-full bg-primary/10 px-1.5 py-0.2 font-bold text-[10px] text-primary'>
                        {order.messagesCount}
                      </span>
                    )}
                  </Link>
                </Button>

                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  asChild
                  className='h-9 rounded-xl px-2 text-muted-foreground hover:text-foreground'
                >
                  <Link href={`/orders/${order.id}`}>
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
