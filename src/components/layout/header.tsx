'use client'

import { ArrowRight, Menu, Music, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isOrderPage = pathname === '/order/new'

  return (
    <header className='fixed top-0 right-0 left-0 z-50 border-border/50 border-b bg-background/80 backdrop-blur-sm'>
      <nav className='mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-6 py-4 lg:px-8'>
        {/* Left: Logo */}
        <div className='flex flex-1 justify-start'>
          <Link href='/' className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
              <Music className='h-4 w-4 text-primary-foreground' />
            </div>
            <span className='font-semibold text-foreground text-xl'>GiftOfSong</span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <div className='hidden items-center justify-center gap-8 lg:flex'>
          <Link
            href='#how-it-works'
            className='whitespace-nowrap font-medium text-foreground/70 text-sm transition-colors hover:text-foreground'
          >
            How it Works
          </Link>
          <Link
            href='#samples'
            className='whitespace-nowrap font-medium text-foreground/70 text-sm transition-colors hover:text-foreground'
          >
            Samples
          </Link>
          <Link
            href='#pricing'
            className='whitespace-nowrap font-medium text-foreground/70 text-sm transition-colors hover:text-foreground'
          >
            Pricing
          </Link>
        </div>

        {/* Right: Desktop CTA & Mobile Toggle */}
        <div className='flex flex-1 items-center justify-end gap-4'>
          <div className='hidden lg:block'>
            {!isOrderPage && (
              <Button
                size='lg'
                className='rounded-full px-6 shadow-lg shadow-primary/20'
                nativeButton={false}
                render={
                  <Link href='/order/new'>
                    Get Started
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                }
              />
            )}
          </div>

          {/* Mobile menu button */}
          <button type='button' className='lg:hidden' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className='lg:hidden'>
          <div className='space-y-1 px-6 pb-4'>
            <Link href='#how-it-works' className='block py-2 font-medium text-base text-foreground/70'>
              How it Works
            </Link>
            <Link href='#samples' className='block py-2 font-medium text-base text-foreground/70'>
              Samples
            </Link>
            <Link href='#pricing' className='block py-2 font-medium text-base text-foreground/70'>
              Pricing
            </Link>
            {!isOrderPage && (
              <div className='pt-4'>
                <Button
                  size='lg'
                  className='w-full rounded-full shadow-lg shadow-primary/20'
                  nativeButton={false}
                  render={<Link href='/order/new'>Get Started</Link>}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
