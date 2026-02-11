export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex min-h-screen bg-slate-50'>
      <aside className='w-64 border-r bg-white p-6'>
        <div className='flex items-center gap-2 mb-8'>
          <div className='h-8 w-8 rounded-lg bg-primary' />
          <span className='font-bold text-xl'>Admin Panel</span>
        </div>
        <nav className='space-y-1'>
          <div className='rounded-lg bg-primary/10 px-3 py-2 text-primary font-medium'>
            Dashboard
          </div>
          <div className='rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted font-medium cursor-pointer'>
            Orders
          </div>
          <div className='rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted font-medium cursor-pointer'>
            Songs
          </div>
        </nav>
      </aside>
      <main className='flex-1 p-8 text-foreground'>{children}</main>
    </div>
  )
}
