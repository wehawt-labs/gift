'use client'

import { Lock } from 'lucide-react'
import type React from 'react'

interface PaywallOverlayProps {
  title: string
  description: string
  children: React.ReactNode
}

export function PaywallOverlay({ title, description, children }: PaywallOverlayProps) {
  return (
    <div className='absolute -inset-px z-10 flex flex-col items-center justify-center rounded-2xl bg-card/90 p-5 text-center backdrop-blur-sm'>
      <div className='mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-[#9A6A1E] shadow-xs'>
        <Lock className='h-5 w-5' />
      </div>
      <p className='mb-1 font-bold font-heading text-foreground text-sm'>{title}</p>
      <p className='mb-3.5 max-w-xs font-sans text-muted-foreground text-xs leading-relaxed'>{description}</p>
      <div className='flex flex-col items-center gap-2 sm:flex-row'>{children}</div>
    </div>
  )
}
