'use client'

import { ArrowRight, Lock } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { GoogleSignInButton } from '@/components/ui/google-sign-in-button'

export default function LoginPage() {
  return (
    <Card className='space-y-6 rounded-3xl border border-border/80 bg-card p-6 shadow-md'>
      <div className='space-y-2 text-center'>
        <h2 className='font-bold font-heading text-foreground text-xl'>Sign In to GiftOfSong</h2>
        <p className='font-sans text-muted-foreground text-xs leading-relaxed'>
          Access your song order dashboard, track delivery status, and manage your voice studio.
        </p>
      </div>

      <CardContent className='space-y-5 p-0'>
        {/* Sole OAuth Provider Button: Google OAuth */}
        <GoogleSignInButton
          label='Continue with Google'
          callbackURL='/orders'
          className='flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-border bg-background font-bold font-heading text-foreground text-sm shadow-xs transition-all hover:border-primary/50 hover:shadow-sm active:scale-[0.99]'
        />

        <div className='flex items-center justify-center gap-2 border-border/40 border-t pt-2 font-sans font-semibold text-muted-foreground text-xs'>
          <Lock className='h-3.5 w-3.5 text-primary' />
          <span>Secure Google OAuth 2.0 Encrypted Login</span>
        </div>

        <div className='space-y-1 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-center font-sans text-xs'>
          <p className='font-bold font-heading text-foreground'>Already placed an order as guest?</p>
          <p className='text-[11px] text-muted-foreground leading-relaxed'>
            Sign in with the same Google email address used during checkout to automatically sync your song orders!
          </p>
        </div>
      </CardContent>

      <div className='border-border/40 border-t pt-2 text-center'>
        <Link
          href='/order/new'
          className='inline-flex items-center gap-1.5 font-bold font-heading text-primary text-xs hover:underline'
        >
          <span>Or Create a New Song Gift Now</span>
          <ArrowRight className='h-3.5 w-3.5' />
        </Link>
      </div>
    </Card>
  )
}
