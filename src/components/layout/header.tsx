'use client'

import { ArrowRight, ListMusic, LogOut, Menu, Music, PlusCircle, Settings, ShieldCheck, User, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { signIn, signOut, useSession } from '@/lib/auth-client'
import { cn } from '@/lib/utils'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const isLandingPage = pathname === '/'
  const isOrderWizard = pathname === '/order/new'
  const isAdminPage = pathname.startsWith('/admin')
  const isDashboardPage = pathname.startsWith('/orders') || pathname === '/profile' || pathname === '/settings'

  const dashboardLinks = [
    { href: '/orders', label: 'My Songs', icon: ListMusic },
    { href: '/order/new', label: 'Order New Song', icon: PlusCircle },
    { href: '/settings', label: 'Settings', icon: Settings }
  ]

  return (
    <header className='sticky top-0 right-0 left-0 z-50 border-border/60 border-b bg-card/85 shadow-2xs backdrop-blur-md transition-all'>
      <div className='mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8'>
        {/* Left: Brand Logo (Unified Form Style) */}
        <div className='flex items-center gap-3'>
          <Link href='/' className='group flex items-center gap-2.5 transition-transform active:scale-95'>
            <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105'>
              <Music className='h-5 w-5' />
            </div>
            <span className='font-bold font-heading text-foreground text-lg tracking-tight'>GiftOfSong</span>
          </Link>

          {/* Admin Context Badge */}
          {isAdminPage && (
            <span className='hidden items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/15 px-2.5 py-0.5 font-bold font-heading text-[#9A6A1E] text-[10px] uppercase sm:inline-flex'>
              <ShieldCheck className='h-3 w-3' /> Admin Portal
            </span>
          )}
        </div>

        {/* Center/Right: Route-Specific Navigation */}
        {/* Case 1: Landing Page */}
        {isLandingPage && (
          <div className='flex items-center gap-4 sm:gap-6'>
            <nav className='hidden items-center gap-6 font-heading font-semibold text-muted-foreground text-xs md:flex'>
              <Link href='#how-it-works' className='transition-colors hover:text-foreground'>
                How it Works
              </Link>
              <Link href='#samples' className='transition-colors hover:text-foreground'>
                Samples
              </Link>
              <Link href='#pricing' className='transition-colors hover:text-foreground'>
                Pricing
              </Link>
            </nav>

            <div className='flex items-center gap-2.5'>
              {session?.user ? (
                <Button
                  type='button'
                  asChild
                  className='h-9 rounded-xl bg-primary px-4 font-bold font-heading text-primary-foreground text-xs shadow-sm'
                >
                  <Link href='/orders'>My Songs</Link>
                </Button>
              ) : (
                <Button
                  type='button'
                  onClick={() => signIn.social({ provider: 'google', callbackURL: '/orders' })}
                  variant='outline'
                  className='h-9 gap-1.5 rounded-xl border-amber-500/40 bg-card px-3.5 font-bold font-heading text-foreground text-xs shadow-2xs hover:bg-background'
                >
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
                  <span>Sign In</span>
                </Button>
              )}

              <Button
                type='button'
                asChild
                className='h-9 gap-1.5 rounded-xl bg-primary px-4 font-bold font-heading text-primary-foreground text-xs shadow-[0_2px_0_0_#842504]'
              >
                <Link href='/order/new'>
                  <span>Create Song</span>
                  <ArrowRight className='h-3.5 w-3.5' />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Case 2: User Dashboard & Settings Pages (Required: My Songs, Order New Song, Settings) */}
        {(isDashboardPage || isAdminPage) && (
          <div className='flex items-center gap-2 sm:gap-4'>
            <nav className='hidden items-center gap-1.5 sm:flex'>
              {dashboardLinks.map((link) => {
                const Icon = link.icon
                const isActive =
                  pathname === link.href ||
                  (link.href === '/settings' && pathname === '/profile') ||
                  (link.href === '/orders' && pathname.startsWith('/orders'))
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-heading font-semibold text-xs transition-all',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'text-muted-foreground hover:bg-background hover:text-foreground'
                    )}
                  >
                    <Icon className='h-3.5 w-3.5 shrink-0' />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className='flex items-center gap-2 border-border/60 border-l pl-2'>
              {session?.user ? (
                <div className='flex items-center gap-2'>
                  <Link href='/settings' className='flex items-center gap-2 transition-opacity hover:opacity-80'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 font-bold font-heading text-[#9A6A1E] text-xs shadow-2xs'>
                      {session.user.name ? session.user.name.charAt(0).toUpperCase() : <User className='h-4 w-4' />}
                    </div>
                    <span className='hidden max-w-[100px] truncate font-bold font-heading text-foreground text-xs lg:inline-block'>
                      {session.user.name || session.user.email}
                    </span>
                  </Link>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => signOut()}
                    className='h-8 w-8 rounded-lg p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
                    title='Sign Out'
                  >
                    <LogOut className='h-4 w-4' />
                  </Button>
                </div>
              ) : (
                <Button
                  type='button'
                  onClick={() => signIn.social({ provider: 'google', callbackURL: window.location.href })}
                  className='flex h-8.5 items-center gap-1.5 rounded-full border border-amber-500/40 bg-background px-3 font-bold font-heading text-foreground text-xs shadow-2xs'
                >
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
                  <span>Sign In 🔐</span>
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type='button'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='p-1.5 text-muted-foreground hover:text-foreground sm:hidden'
            >
              {mobileMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
            </button>
          </div>
        )}

        {/* Case 3: Order Wizard Form Page Header Right Option */}
        {isOrderWizard && (
          <div className='flex items-center gap-3'>
            {session?.user ? (
              <Link
                href='/orders'
                className='flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-bold font-heading text-emerald-900 text-xs shadow-2xs transition-all hover:bg-emerald-500/20'
              >
                <div className='flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 font-bold text-[10px] text-white'>
                  {session.user.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className='hidden max-w-[100px] truncate sm:inline-block'>
                  {session.user.name || session.user.email}
                </span>
                <span className='rounded-full bg-emerald-500/20 px-1.5 py-0.2 font-sans text-[10px] text-emerald-700'>
                  My Songs
                </span>
              </Link>
            ) : (
              <Button
                type='button'
                onClick={() => signIn.social({ provider: 'google', callbackURL: window.location.href })}
                className='flex h-8.5 cursor-pointer items-center gap-1.5 rounded-full border border-amber-500/40 bg-background px-3 font-bold font-heading text-foreground text-xs shadow-2xs hover:bg-amber-500/10'
              >
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
                <span>Sign in to save 🔐</span>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Mobile Dropdown Menu for Dashboard */}
      {mobileMenuOpen && (isDashboardPage || isAdminPage) && (
        <div className='space-y-2 border-border/40 border-t bg-card px-4 py-3 font-heading text-xs sm:hidden'>
          {dashboardLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className='flex items-center gap-2 rounded-xl p-2 text-foreground hover:bg-background'
              >
                <Icon className='h-4 w-4 text-primary' />
                <span>{link.label}</span>
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
