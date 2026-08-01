'use client'

import React from 'react'
import { Lock } from 'lucide-react'

interface PaywallOverlayProps {
  title: string
  description: string
  children: React.ReactNode
}

export function PaywallOverlay({ title, description, children }: PaywallOverlayProps) {
  return (
    <div className='absolute -inset-px rounded-2xl bg-card/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-5 text-center'>
      <div className='h-10 w-10 rounded-full bg-amber-500/10 text-[#9A6A1E] shadow-xs flex items-center justify-center mb-2'>
        <Lock className='h-5 w-5' />
      </div>
      <p className='font-bold font-heading text-sm text-foreground mb-1'>{title}</p>
      <p className='text-xs text-muted-foreground font-sans max-w-xs mb-3.5 leading-relaxed'>
        {description}
      </p>
      <div className='flex flex-col sm:flex-row items-center gap-2'>
        {children}
      </div>
    </div>
  )
}
