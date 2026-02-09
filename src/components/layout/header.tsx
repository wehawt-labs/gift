'use client'

import { ArrowRight, Menu, Music, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border/50'>
      <nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
            <Music className='h-4 w-4 text-primary-foreground' />
          </div>
          <span className='text-xl font-semibold text-foreground'>
            GiftOfSong
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden items-center gap-8 lg:flex'>
          <Link
            href='#how-it-works'
            className='text-sm font-medium text-foreground/70 transition-colors hover:text-foreground'
          >
            How it Works
          </Link>
          <Link
            href='#samples'
            className='text-sm font-medium text-foreground/70 transition-colors hover:text-foreground'
          >
            Samples
          </Link>
          <Link
            href='#pricing'
            className='text-sm font-medium text-foreground/70 transition-colors hover:text-foreground'
          >
            Pricing
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className='hidden items-center gap-4 lg:flex'>
          <Link
            href='/login'
            className='text-sm font-medium text-foreground/70 transition-colors hover:text-foreground'
          >
            Login
          </Link>
          <Button href='/order/new' className='rounded-full'>
            Get Started
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type='button'
          className='lg:hidden'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className='lg:hidden'>
          <div className='space-y-1 px-6 pb-4'>
            <Link
              href='#how-it-works'
              className='block py-2 text-base font-medium text-foreground/70'
            >
              How it Works
            </Link>
            <Link
              href='#samples'
              className='block py-2 text-base font-medium text-foreground/70'
            >
              Samples
            </Link>
            <Link
              href='#pricing'
              className='block py-2 text-base font-medium text-foreground/70'
            >
              Pricing
            </Link>
            <div className='pt-4'>
              <Button href='/order/new' className='w-full rounded-full'>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
