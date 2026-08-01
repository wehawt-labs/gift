'use client'

import React from 'react'

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className='relative my-6 flex items-center justify-center'>
      <div className='absolute inset-0 flex items-center'>
        <div className='w-full border-t border-border/60' />
      </div>
      <span className='relative bg-background px-4 font-heading text-[10px] sm:text-[11px] font-bold text-muted-foreground uppercase tracking-widest'>
        {label}
      </span>
    </div>
  )
}
