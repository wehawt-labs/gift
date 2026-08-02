'use client'

import { CheckCircle2 } from 'lucide-react'
import { GoogleSignInButton } from '@/components/ui/google-sign-in-button'
import { useSession } from '@/lib/auth-client'

export function AuthBannerPrompt() {
  const { data: session } = useSession()

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

      <GoogleSignInButton
        label='Sign in with Google'
        className='h-8.5 shrink-0 rounded-xl border-amber-500/40 bg-card px-3.5 font-bold font-heading text-foreground text-xs shadow-2xs transition-all hover:bg-background active:scale-95'
      />
    </div>
  )
}
