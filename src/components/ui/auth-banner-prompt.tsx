'use client'

import { CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { signIn, useSession } from '@/lib/auth-client'

export function AuthBannerPrompt() {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  if (session?.user) {
    return (
      <div className='mb-6 flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3 px-4 font-sans text-xs'>
        <div className='flex items-center gap-2 text-emerald-900'>
          <CheckCircle2 className='h-4 w-4 shrink-0 text-emerald-600' />
          <span className='font-bold font-heading text-xs'>Signed in as {session.user.name || session.user.email}</span>
          <span className='hidden text-emerald-800/80 sm:inline-block'>
            — Your song draft progress is automatically saved to your account!
          </span>
        </div>
      </div>
    )
  }

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      await signIn.social({
        provider: 'google',
        callbackURL: window.location.href
      })
    } catch (err) {
      console.error('[OAuth Error]', err)
      toast.error('Google Sign In Failed', {
        description: 'Please check your connection and try again.'
      })
      setLoading(false)
    }
  }

  return (
    <div className='mb-6 flex flex-col items-center justify-between gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 font-sans text-xs shadow-2xs sm:flex-row'>
      <div className='flex items-center gap-2.5 text-foreground'>
        <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 font-bold text-[#9A6A1E] text-base'>
          🔐
        </div>
        <div>
          <p className='font-bold font-heading text-foreground text-xs'>Sign in to save your song progress</p>
          <p className='text-[11px] text-muted-foreground leading-tight'>
            Connect your Google account to auto-sync your song inputs & easily manage your orders.
          </p>
        </div>
      </div>

      <Button
        type='button'
        onClick={handleGoogleSignIn}
        disabled={loading}
        className='flex h-8.5 shrink-0 cursor-pointer items-center gap-2 rounded-xl border border-amber-500/40 bg-card px-3.5 font-bold font-heading text-foreground text-xs shadow-2xs transition-all hover:bg-background active:scale-95'
      >
        {loading ? (
          <div className='h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent' />
        ) : (
          <svg className='h-3.5 w-3.5 shrink-0' viewBox='0 0 24 24'>
            <title>Google Logo</title>
            <path
              fill='#4285F4'
              d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
            />
            <path
              fill='#34A853'
              d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
            />
            <path
              fill='#FBBC05'
              d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z'
            />
            <path
              fill='#EA4335'
              d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z'
            />
          </svg>
        )}
        <span>{loading ? 'Connecting...' : 'Sign in with Google'}</span>
      </Button>
    </div>
  )
}
