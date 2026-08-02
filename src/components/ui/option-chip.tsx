'use client'

import type { ComponentType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface OptionChipProps {
  label: string
  isSelected: boolean
  onClick: () => void
  icon?: ComponentType<{ className?: string }>
  emoji?: string
  rightAccessory?: ReactNode
  variant?: 'card' | 'pill'
  className?: string
}

/**
 * Reusable Option Chip / Card selector component
 * Used across order wizard steps for Recipients, Genres, Moods, etc.
 */
export function OptionChip({
  label,
  isSelected,
  onClick,
  icon: Icon,
  emoji,
  rightAccessory,
  variant = 'pill',
  className
}: OptionChipProps) {
  if (variant === 'card') {
    return (
      <button
        type='button'
        onClick={onClick}
        className={cn(
          'group relative flex items-center justify-between rounded-xl border p-3.5 transition-all active:scale-95',
          isSelected
            ? 'border-primary bg-card text-primary shadow-[0_2px_0_0_#c1502e]'
            : 'border-border/60 bg-card/60 text-muted-foreground hover:border-border hover:bg-card',
          className
        )}
      >
        <div className='flex items-center gap-2 truncate'>
          {Icon && <Icon className={cn('h-4 w-4 shrink-0', isSelected ? 'text-primary' : 'text-muted-foreground')} />}
          {emoji && <span className='text-sm'>{emoji}</span>}
          <span
            className={cn('truncate font-sans font-semibold text-xs', isSelected ? 'text-primary' : 'text-foreground')}
          >
            {label}
          </span>
        </div>
        {rightAccessory}
      </button>
    )
  }

  return (
    <button
      type='button'
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 rounded-full border px-4 py-2 font-sans font-semibold text-xs transition-all active:scale-95',
        isSelected
          ? 'border-primary bg-primary text-primary-foreground shadow-sm'
          : 'border-border/80 bg-card text-foreground hover:border-primary/50',
        className
      )}
    >
      {Icon && <Icon className='h-3.5 w-3.5 shrink-0' />}
      {emoji && <span className='text-sm'>{emoji}</span>}
      <span>{label}</span>
      {rightAccessory}
    </button>
  )
}
