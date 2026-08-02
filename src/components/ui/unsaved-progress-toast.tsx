'use client'

import { toast } from 'sonner'
import { GoogleIcon } from '@/components/ui/google-sign-in-button'
import { signIn } from '@/lib/auth-client'

export interface UnsavedProgressToastProps {
  toastId: string | number
  isLoggedIn?: boolean
  title?: string
  description?: string
  onLeaveAnyway: () => void
}

export function UnsavedProgressToast({
  toastId,
  isLoggedIn = false,
  title,
  description,
  onLeaveAnyway
}: UnsavedProgressToastProps) {
  const displayTitle = title || (isLoggedIn ? 'Unsaved Song Details' : 'Unsaved Song Progress!')
  const displayDescription =
    description ||
    (isLoggedIn
      ? 'Your custom song inputs have not been completed or submitted yet.'
      : 'Sign in with Google to save your song progress & sync across devices before leaving.')

  const handleSignIn = () => {
    toast.dismiss(toastId)
    signIn.social({
      provider: 'google',
      callbackURL: typeof window !== 'undefined' ? window.location.href : '/order/new'
    })
  }

  const handleLeave = () => {
    toast.dismiss(toastId)
    onLeaveAnyway()
  }

  return (
    <div className='relative w-full max-w-md space-y-3 rounded-2xl border-2 border-amber-500/40 bg-card p-4 font-sans text-foreground shadow-xl'>
      <div className='flex items-start gap-3'>
        <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/15 font-bold text-[#9A6A1E] text-base'>
          {isLoggedIn ? '🎵' : '🔐'}
        </div>
        <div className='flex-1 space-y-1'>
          <h4 className='font-bold font-heading text-foreground text-sm'>{displayTitle}</h4>
          <p className='text-muted-foreground text-xs leading-relaxed'>{displayDescription}</p>
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-end gap-2 border-border/40 border-t pt-2'>
        <button
          type='button'
          onClick={handleLeave}
          className='rounded-xl border border-border bg-background px-3.5 py-1.5 font-heading font-semibold text-muted-foreground text-xs transition-colors hover:text-foreground'
        >
          Leave Anyway
        </button>

        {!isLoggedIn ? (
          <button
            type='button'
            onClick={handleSignIn}
            className='flex items-center gap-1.5 rounded-xl bg-primary px-4 py-1.5 font-bold font-heading text-primary-foreground text-xs shadow-sm transition-all hover:bg-primary/90 active:scale-95'
          >
            <GoogleIcon />
            <span>Sign in & Save 🔑</span>
          </button>
        ) : (
          <button
            type='button'
            onClick={() => toast.dismiss(toastId)}
            className='rounded-xl bg-primary px-4 py-1.5 font-bold font-heading text-primary-foreground text-xs shadow-sm transition-all hover:bg-primary/90 active:scale-95'
          >
            Stay & Finish
          </button>
        )}
      </div>
    </div>
  )
}
