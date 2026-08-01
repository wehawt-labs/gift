import { Header } from '@/components/layout'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col pt-[72px]'>
      <Header />
      <main className='flex-1'>{children}</main>
    </div>
  )
}
