import type { Metadata } from 'next'
import { Fraunces, Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const heading = Fraunces({
  variable: '--font-heading',
  subsets: ['latin']
})

const body = Inter({
  variable: '--font-body',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'GiftOfSong - Personalized Songs as Gifts',
  description: 'Turn your memories into a melody with custom AI-powered songs.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${body.variable} ${heading.variable} font-body text-foreground antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
