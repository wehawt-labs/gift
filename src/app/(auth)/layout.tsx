import { Music } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign In — GiftOfSong',
  description: 'Sign in to manage your personalized song orders and voice studio.'
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex min-h-screen flex-col justify-center overflow-hidden bg-background py-12 font-sans text-foreground sm:px-6 lg:px-8'>
      {/* Background Subtle Gradient Blobs */}
      <div className='pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl' />
      <div className='pointer-events-none absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl' />

      <div className='z-10 space-y-3 text-center sm:mx-auto sm:w-full sm:max-w-md'>
        <Link href='/' className='group inline-flex items-center gap-2.5 transition-transform active:scale-95'>
          <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md transition-transform group-hover:scale-105'>
            <Music className='h-6 w-6' />
          </div>
          <span className='font-bold font-heading text-2xl text-foreground tracking-tight'>GiftOfSong</span>
        </Link>
        <p className='mx-auto max-w-xs font-sans text-muted-foreground text-xs'>
          Turn your cherished memories & stories into custom studio-quality keepsake songs.
        </p>
      </div>

      <div className='z-10 mt-8 px-4 sm:mx-auto sm:w-full sm:max-w-md sm:px-0'>{children}</div>
    </div>
  )
}
