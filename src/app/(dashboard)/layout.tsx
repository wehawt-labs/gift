import { Header } from '@/components/layout'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-background font-sans text-foreground'>
      <Header />
      <main className='mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8'>{children}</main>
    </div>
  )
}
