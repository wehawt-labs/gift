import { Mail, Music, Twitter } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className='border-border border-t bg-card'>
      <div className='mx-auto max-w-7xl px-6 py-12 lg:px-8'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {/* Brand */}
          <div className='col-span-2 md:col-span-1'>
            <Link href='/' className='flex items-center gap-2'>
              <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
                <Music className='h-4 w-4 text-primary-foreground' />
              </div>
              <span className='font-semibold text-foreground text-xl'>GiftOfSong</span>
            </Link>
            <p className='mt-4 text-muted-foreground text-sm'>
              Making memories last forever through the power of music.
            </p>
            <div className='mt-4 flex gap-4'>
              <a
                href='https://mail.google.com/mail/u/0/?view=cm&fs=1&to=abcabcabc@gmail.com'
                className='text-muted-foreground transition-colors hover:text-foreground'
              >
                <Mail className='h-5 w-5' />
              </a>
              <a
                href='https://twitter.com/abcabc'
                className='text-muted-foreground transition-colors hover:text-foreground'
              >
                <Twitter className='h-5 w-5' />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className='font-semibold text-foreground text-sm'>Product</h3>
            <ul className='mt-4 space-y-3'>
              <li>
                <Link
                  href='#how-it-works'
                  className='text-muted-foreground text-sm transition-colors hover:text-foreground'
                >
                  How it Works
                </Link>
              </li>
              <li>
                <Link href='#pricing' className='text-muted-foreground text-sm transition-colors hover:text-foreground'>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href='#samples' className='text-muted-foreground text-sm transition-colors hover:text-foreground'>
                  Samples
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground text-sm transition-colors hover:text-foreground'>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className='font-semibold text-foreground text-sm'>Company</h3>
            <ul className='mt-4 space-y-3'>
              <li>
                <Link href='#' className='text-muted-foreground text-sm transition-colors hover:text-foreground'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground text-sm transition-colors hover:text-foreground'>
                  Careers
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground text-sm transition-colors hover:text-foreground'>
                  Contact
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground text-sm transition-colors hover:text-foreground'>
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className='font-semibold text-foreground text-sm'>Legal</h3>
            <ul className='mt-4 space-y-3'>
              <li>
                <Link href='#' className='text-muted-foreground text-sm transition-colors hover:text-foreground'>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href='#' className='text-muted-foreground text-sm transition-colors hover:text-foreground'>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-12 flex flex-col items-center justify-between border-border border-t pt-8 md:flex-row'>
          <p className='text-muted-foreground text-xs'>© 2024 GiftOfSong Inc. All rights reserved.</p>
          <p className='mt-4 text-muted-foreground text-xs md:mt-0'>Made with ❤️ in Nashville, TN</p>
        </div>
      </div>
    </footer>
  )
}
