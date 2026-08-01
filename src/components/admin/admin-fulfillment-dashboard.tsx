'use client'

import { Check, Clock, Copy, Crown, ExternalLink, Search, Send, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface OrderItem {
  id: string
  createdAt: string
  buyerName: string
  buyerEmail: string
  recipientName: string
  recipient: string
  occasion: string
  genre: string
  tempo: string
  vocalPreference: string
  memory: string
  jokes: string
  coreMessage: string
  plan: 'standard' | 'premium'
  status: 'pending' | 'in_production' | 'completed'
  audioUrl?: string
}

// Sample mock order data for Admin Fulfillment
const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord_98231',
    createdAt: '2026-08-01 18:30',
    buyerName: 'Alex Turner',
    buyerEmail: 'alex.turner@gmail.com',
    recipientName: 'Emily',
    recipient: 'Partner',
    occasion: 'Anniversary',
    genre: 'Acoustic Pop',
    tempo: 'Warm & Cozy',
    vocalPreference: 'Male',
    memory: 'Our first rainy road trip to Maine, hiding under a cozy coffee shop porch.',
    jokes: 'Always forgets her apartment keys and calls Alex for help.',
    coreMessage: 'Thank you for 3 wonderful years together. Happy Anniversary my love!',
    plan: 'premium',
    status: 'pending'
  },
  {
    id: 'ord_98230',
    createdAt: '2026-08-01 17:15',
    buyerName: 'David Miller',
    buyerEmail: 'david.miller@gmail.com',
    recipientName: 'Mom (Helen)',
    recipient: 'Parent',
    occasion: 'Birthday',
    genre: 'Rock Ballad',
    tempo: 'Tear-Jerker',
    vocalPreference: 'Female',
    memory: 'Mom waking up early at 5 AM every morning to make breakfast for the family.',
    jokes: 'Loves to complain about loud music but secretly dances in the kitchen.',
    coreMessage: 'Happy 50th Birthday Mom! Thank you for everything you do for us.',
    plan: 'standard',
    status: 'in_production'
  },
  {
    id: 'ord_98229',
    createdAt: '2026-08-01 14:00',
    buyerName: 'Sarah Jenkins',
    buyerEmail: 'sarah.j@gmail.com',
    recipientName: 'Michael',
    recipient: 'Friend',
    occasion: 'Just Because',
    genre: 'EDM',
    tempo: 'Joyful & Upbeat',
    vocalPreference: 'Surprise Me',
    memory: 'Dancing all night at the outdoor music festival last summer.',
    jokes: 'Claims to be a master chef but always burns the popcorn.',
    coreMessage: 'So grateful to have a best friend like you!',
    plan: 'standard',
    status: 'completed',
    audioUrl: 'https://cdn.suno.com/sample_track_1.mp3'
  }
]

export function AdminFulfillmentDashboard() {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [audioInput, setAudioInput] = useState<Record<string, string>>({})

  // Generate Suno Prompt
  const generateSunoPrompt = (order: OrderItem) => {
    return `[Style Prompt for Suno.com]
Style: ${order.genre}, ${order.tempo}, ${order.vocalPreference} vocal
Mood: ${order.tempo}
Occasion: ${order.occasion} for ${order.recipientName} (${order.recipient})

[Custom Lyrics Context]
Memory: ${order.memory}
Inside Jokes: ${order.jokes}
Core Message: ${order.coreMessage}`
  }

  const handleCopyPrompt = (order: OrderItem) => {
    const promptText = generateSunoPrompt(order)
    navigator.clipboard.writeText(promptText)
    setCopiedId(order.id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const handleStatusChange = (orderId: string, newStatus: OrderItem['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
  }

  const handleSaveAudioUrl = (orderId: string) => {
    const url = audioInput[orderId]
    if (!url) return
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, audioUrl: url, status: 'completed' } : o)))
  }

  const filteredOrders = orders.filter(
    (o) =>
      o.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const pendingCount = orders.filter((o) => o.status === 'pending').length
  const inProdCount = orders.filter((o) => o.status === 'in_production').length
  const completedCount = orders.filter((o) => o.status === 'completed').length

  return (
    <div className='space-y-8 pb-12 font-sans'>
      {/* Header */}
      <div className='flex flex-col justify-between gap-4 border-border/60 border-b pb-6 sm:flex-row sm:items-center'>
        <div>
          <h1 className='font-bold font-heading text-2xl text-foreground sm:text-3xl'>Suno Fulfillment Dashboard</h1>
          <p className='mt-1 text-muted-foreground text-sm'>
            Manage incoming song requests and generate Suno prompts for manual fulfillment.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            className='gap-2 rounded-xl font-heading font-semibold text-xs'
            onClick={() => window.open('https://suno.com', '_blank')}
          >
            <ExternalLink className='h-3.5 w-3.5' />
            Open Suno.com
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        <Card className='rounded-2xl border-border/60 bg-card p-4 shadow-sm'>
          <p className='font-heading font-semibold text-muted-foreground text-xs uppercase tracking-wider'>
            Pending Suno
          </p>
          <div className='mt-2 flex items-baseline justify-between'>
            <p className='font-bold font-heading text-2xl text-amber-600'>{pendingCount}</p>
            <Clock className='h-4 w-4 text-amber-500' />
          </div>
        </Card>
        <Card className='rounded-2xl border-border/60 bg-card p-4 shadow-sm'>
          <p className='font-heading font-semibold text-muted-foreground text-xs uppercase tracking-wider'>
            In Production
          </p>
          <div className='mt-2 flex items-baseline justify-between'>
            <p className='font-bold font-heading text-2xl text-blue-600'>{inProdCount}</p>
            <Sparkles className='h-4 w-4 text-blue-500' />
          </div>
        </Card>
        <Card className='rounded-2xl border-border/60 bg-card p-4 shadow-sm'>
          <p className='font-heading font-semibold text-muted-foreground text-xs uppercase tracking-wider'>Completed</p>
          <div className='mt-2 flex items-baseline justify-between'>
            <p className='font-bold font-heading text-2xl text-emerald-600'>{completedCount}</p>
            <Check className='h-4 w-4 text-emerald-500' />
          </div>
        </Card>
        <Card className='rounded-2xl border-border/60 bg-card p-4 shadow-sm'>
          <p className='font-heading font-semibold text-muted-foreground text-xs uppercase tracking-wider'>
            Total Revenue
          </p>
          <div className='mt-2 flex items-baseline justify-between'>
            <p className='font-bold font-heading text-2xl text-primary'>$79.97</p>
            <Crown className='h-4 w-4 text-primary' />
          </div>
        </Card>
      </div>

      {/* Search Bar */}
      <div className='relative max-w-md'>
        <Search className='absolute top-3 left-3.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search by Order ID, Buyer, or Recipient...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='h-10 rounded-xl border-border/80 bg-card pl-10 text-sm'
        />
      </div>

      {/* Orders List */}
      <div className='space-y-4'>
        {filteredOrders.map((order) => (
          <Card key={order.id} className='overflow-hidden rounded-2xl border-border/80 bg-card shadow-sm'>
            <div className='flex flex-wrap items-center justify-between gap-2 border-border/60 border-b bg-card/50 px-5 py-3'>
              <div className='flex items-center gap-3'>
                <span className='font-bold font-heading text-foreground text-sm'>{order.id}</span>
                <span className='font-sans text-muted-foreground text-xs'>{order.createdAt}</span>
                {order.plan === 'premium' ? (
                  <Badge className='gap-1 border-amber-500/30 bg-amber-500/15 font-heading font-semibold text-[#9A6A1E] text-[10px]'>
                    <Crown className='h-3 w-3 fill-current' /> Premium 24H Queue
                  </Badge>
                ) : (
                  <Badge variant='outline' className='font-heading text-xs'>
                    Standard
                  </Badge>
                )}
              </div>

              <div className='flex items-center gap-3'>
                <Select
                  value={order.status}
                  onValueChange={(val) => handleStatusChange(order.id, val as OrderItem['status'])}
                >
                  <SelectTrigger className='h-8 w-36 rounded-lg bg-background font-semibold text-xs'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='pending'>⏳ Pending</SelectItem>
                    <SelectItem value='in_production'>⚡ In Production</SelectItem>
                    <SelectItem value='completed'>✅ Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <CardContent className='space-y-4 p-5'>
              {/* Recipient & Buyer Meta */}
              <div className='grid grid-cols-1 gap-4 border-border/40 border-b pb-4 font-sans text-xs sm:grid-cols-4'>
                <div>
                  <span className='mb-0.5 block font-bold font-heading text-[10px] text-muted-foreground uppercase'>
                    Buyer
                  </span>
                  <p className='font-semibold text-foreground text-sm'>{order.buyerName}</p>
                  <p className='text-muted-foreground'>{order.buyerEmail}</p>
                </div>
                <div>
                  <span className='mb-0.5 block font-bold font-heading text-[10px] text-muted-foreground uppercase'>
                    Recipient
                  </span>
                  <p className='font-semibold text-foreground text-sm'>
                    {order.recipientName} ({order.recipient})
                  </p>
                  <p className='text-muted-foreground'>Occasion: {order.occasion}</p>
                </div>
                <div>
                  <span className='mb-0.5 block font-bold font-heading text-[10px] text-muted-foreground uppercase'>
                    Music Style
                  </span>
                  <p className='font-semibold text-primary text-sm'>
                    {order.genre} • {order.tempo}
                  </p>
                  <p className='text-muted-foreground'>Vocal: {order.vocalPreference}</p>
                </div>
                <div>
                  <span className='mb-0.5 block font-bold font-heading text-[10px] text-muted-foreground uppercase'>
                    Web Page Add-on
                  </span>
                  <p className='mt-0.5 font-semibold text-emerald-700 text-xs'>
                    {order.plan === 'premium' ? 'Free (Premium) ✓' : 'Added (+$5)'}
                  </p>
                </div>
              </div>

              {/* Memory & Core Message */}
              <div className='space-y-2 rounded-xl border border-border/50 bg-background/60 p-4 font-sans text-xs'>
                <div>
                  <span className='font-bold font-heading text-foreground'>Memory: </span>
                  <span className='text-muted-foreground'>{order.memory}</span>
                </div>
                {order.jokes && (
                  <div>
                    <span className='font-bold font-heading text-foreground'>Inside Jokes: </span>
                    <span className='text-muted-foreground'>{order.jokes}</span>
                  </div>
                )}
                <div>
                  <span className='font-bold font-heading text-foreground'>Core Message: </span>
                  <span className='text-muted-foreground'>{order.coreMessage}</span>
                </div>
              </div>

              {/* Actions & Suno Fulfillment Box */}
              <div className='flex flex-col items-stretch justify-between gap-3 pt-2 sm:flex-row sm:items-center'>
                <Button
                  type='button'
                  onClick={() => handleCopyPrompt(order)}
                  className='h-9 gap-2 rounded-xl bg-primary px-4 font-bold font-heading text-primary-foreground text-xs shadow-[0_2px_0_0_#842504]'
                >
                  {copiedId === order.id ? (
                    <>
                      <Check className='h-3.5 w-3.5 text-emerald-300' />
                      Copied Suno Prompt!
                    </>
                  ) : (
                    <>
                      <Copy className='h-3.5 w-3.5' />
                      1-Click Copy Suno Prompt 🪄
                    </>
                  )}
                </Button>

                {/* Suno Audio URL Input */}
                <div className='flex max-w-md flex-1 items-center gap-2'>
                  <Input
                    placeholder='Paste Suno MP3 / Song URL...'
                    value={audioInput[order.id] || order.audioUrl || ''}
                    onChange={(e) => setAudioInput({ ...audioInput, [order.id]: e.target.value })}
                    className='h-9 rounded-xl bg-background text-xs'
                  />
                  <Button
                    type='button'
                    size='sm'
                    onClick={() => handleSaveAudioUrl(order.id)}
                    className='h-9 gap-1 rounded-xl bg-emerald-700 px-3 font-heading font-semibold text-white text-xs hover:bg-emerald-800'
                  >
                    <Send className='h-3 w-3' />
                    Save & Notify
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
