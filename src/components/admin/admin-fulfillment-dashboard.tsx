'use client'

import { useState } from 'react'
import { Check, Clock, Copy, Crown, ExternalLink, Music, Search, Send, Sparkles } from 'lucide-react'
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
    buyerName: 'Minh Tuấn',
    buyerEmail: 'tuan.minh@gmail.com',
    recipientName: 'Thùy Chi',
    recipient: 'Partner',
    occasion: 'Anniversary',
    genre: 'Acoustic Pop',
    tempo: 'Warm & Cozy',
    vocalPreference: 'Male',
    memory: 'Chuyến đi Đà Lạt đầu tiên dưới mưa bão, cùng trú mưa ở quán cà phê nhỏ.',
    jokes: 'Lúc nào cũng quên chìa khóa nhà và bắt Tuấn mở cửa.',
    coreMessage: 'Cảm ơn em vì 3 năm tuyệt vời bên anh. Chúc mừng kỷ niệm ngày cưới!',
    plan: 'premium',
    status: 'pending'
  },
  {
    id: 'ord_98230',
    createdAt: '2026-08-01 17:15',
    buyerName: 'Hoàng Nam',
    buyerEmail: 'nam.hoang@gmail.com',
    recipientName: 'Mẹ Lan',
    recipient: 'Parent',
    occasion: 'Birthday',
    genre: 'Rock Ballad',
    tempo: 'Tear-Jerker',
    vocalPreference: 'Female',
    memory: 'Mẹ luôn dậy từ 5h sáng chuẩn bị cơm hộp cho Nam đi học đại học.',
    jokes: 'Mẹ rất hay than thở nhưng lúc nào cũng mua quà cho con.',
    coreMessage: 'Chúc mừng sinh nhật Mẹ 50 tuổi! Con yêu Mẹ rất nhiều.',
    plan: 'standard',
    status: 'in_production'
  },
  {
    id: 'ord_98229',
    createdAt: '2026-08-01 14:00',
    buyerName: 'Phương Anh',
    buyerEmail: 'anh.phuong@gmail.com',
    recipientName: 'Đức Anh',
    recipient: 'Friend',
    occasion: 'Just Because',
    genre: 'EDM',
    tempo: 'Joyful & Upbeat',
    vocalPreference: 'Surprise Me',
    memory: 'Cùng nhau quẩy ở liveshow âm nhạc năm ngoái.',
    jokes: 'Thánh quẩy nhưng uống 1 lon sài gòn là say khướt.',
    coreMessage: 'Cảm ơn vì luôn là thằng bạn thân nối cống của tớ!',
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
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )
  }

  const handleSaveAudioUrl = (orderId: string) => {
    const url = audioInput[orderId]
    if (!url) return
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, audioUrl: url, status: 'completed' } : o))
    )
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
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6'>
        <div>
          <h1 className='font-bold font-heading text-2xl sm:text-3xl text-foreground'>Suno Fulfillment Dashboard</h1>
          <p className='text-sm text-muted-foreground mt-1'>
            Manage incoming song requests and generate Suno prompts for manual fulfillment.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='rounded-xl gap-2 font-heading font-semibold text-xs' onClick={() => window.open('https://suno.com', '_blank')}>
            <ExternalLink className='h-3.5 w-3.5' />
            Open Suno.com
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <Card className='rounded-2xl border-border/60 bg-card p-4 shadow-sm'>
          <p className='text-xs font-semibold text-muted-foreground uppercase font-heading tracking-wider'>Pending Suno</p>
          <div className='mt-2 flex items-baseline justify-between'>
            <p className='text-2xl font-bold font-heading text-amber-600'>{pendingCount}</p>
            <Clock className='h-4 w-4 text-amber-500' />
          </div>
        </Card>
        <Card className='rounded-2xl border-border/60 bg-card p-4 shadow-sm'>
          <p className='text-xs font-semibold text-muted-foreground uppercase font-heading tracking-wider'>In Production</p>
          <div className='mt-2 flex items-baseline justify-between'>
            <p className='text-2xl font-bold font-heading text-blue-600'>{inProdCount}</p>
            <Sparkles className='h-4 w-4 text-blue-500' />
          </div>
        </Card>
        <Card className='rounded-2xl border-border/60 bg-card p-4 shadow-sm'>
          <p className='text-xs font-semibold text-muted-foreground uppercase font-heading tracking-wider'>Completed</p>
          <div className='mt-2 flex items-baseline justify-between'>
            <p className='text-2xl font-bold font-heading text-emerald-600'>{completedCount}</p>
            <Check className='h-4 w-4 text-emerald-500' />
          </div>
        </Card>
        <Card className='rounded-2xl border-border/60 bg-card p-4 shadow-sm'>
          <p className='text-xs font-semibold text-muted-foreground uppercase font-heading tracking-wider'>Total Revenue</p>
          <div className='mt-2 flex items-baseline justify-between'>
            <p className='text-2xl font-bold font-heading text-primary'>$79.97</p>
            <Crown className='h-4 w-4 text-primary' />
          </div>
        </Card>
      </div>

      {/* Search Bar */}
      <div className='relative max-w-md'>
        <Search className='absolute left-3.5 top-3 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='Search by Order ID, Buyer, or Recipient...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='pl-10 h-10 rounded-xl bg-card border-border/80 text-sm'
        />
      </div>

      {/* Orders List */}
      <div className='space-y-4'>
        {filteredOrders.map((order) => (
          <Card key={order.id} className='overflow-hidden rounded-2xl border-border/80 bg-card shadow-sm'>
            <div className='flex flex-wrap items-center justify-between border-b border-border/60 bg-card/50 px-5 py-3 gap-2'>
              <div className='flex items-center gap-3'>
                <span className='font-bold font-heading text-sm text-foreground'>{order.id}</span>
                <span className='text-xs text-muted-foreground font-sans'>{order.createdAt}</span>
                {order.plan === 'premium' ? (
                  <Badge className='bg-amber-500/15 text-[#9A6A1E] border-amber-500/30 gap-1 font-heading font-semibold text-[10px]'>
                    <Crown className='h-3 w-3 fill-current' /> Premium 24H Queue
                  </Badge>
                ) : (
                  <Badge variant='outline' className='text-xs font-heading'>Standard</Badge>
                )}
              </div>

              <div className='flex items-center gap-3'>
                <Select
                  value={order.status}
                  onValueChange={(val: any) => handleStatusChange(order.id, val)}
                >
                  <SelectTrigger className='h-8 text-xs font-semibold rounded-lg w-36 bg-background'>
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

            <CardContent className='p-5 space-y-4'>
              {/* Recipient & Buyer Meta */}
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans border-b border-border/40 pb-4'>
                <div>
                  <span className='text-muted-foreground uppercase font-heading text-[10px] font-bold block mb-0.5'>Buyer</span>
                  <p className='font-semibold text-foreground text-sm'>{order.buyerName}</p>
                  <p className='text-muted-foreground'>{order.buyerEmail}</p>
                </div>
                <div>
                  <span className='text-muted-foreground uppercase font-heading text-[10px] font-bold block mb-0.5'>Recipient</span>
                  <p className='font-semibold text-foreground text-sm'>{order.recipientName} ({order.recipient})</p>
                  <p className='text-muted-foreground'>Occasion: {order.occasion}</p>
                </div>
                <div>
                  <span className='text-muted-foreground uppercase font-heading text-[10px] font-bold block mb-0.5'>Music Style</span>
                  <p className='font-semibold text-primary text-sm'>{order.genre} • {order.tempo}</p>
                  <p className='text-muted-foreground'>Vocal: {order.vocalPreference}</p>
                </div>
              </div>

              {/* Memory & Core Message */}
              <div className='space-y-2 bg-background/60 p-4 rounded-xl border border-border/50 text-xs font-sans'>
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
              <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2'>
                <Button
                  type='button'
                  onClick={() => handleCopyPrompt(order)}
                  className='rounded-xl bg-primary text-primary-foreground font-heading font-bold text-xs h-9 px-4 gap-2 shadow-[0_2px_0_0_#842504]'
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
                <div className='flex items-center gap-2 flex-1 max-w-md'>
                  <Input
                    placeholder='Paste Suno MP3 / Song URL...'
                    value={audioInput[order.id] || order.audioUrl || ''}
                    onChange={(e) => setAudioInput({ ...audioInput, [order.id]: e.target.value })}
                    className='h-9 rounded-xl text-xs bg-background'
                  />
                  <Button
                    type='button'
                    size='sm'
                    onClick={() => handleSaveAudioUrl(order.id)}
                    className='h-9 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-heading font-semibold text-xs px-3 gap-1'
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
