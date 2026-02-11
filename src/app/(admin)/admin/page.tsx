export default function AdminDashboard() {
  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
      <div className='grid gap-6 md:grid-cols-3'>
        <div className='rounded-2xl bg-white p-6 shadow-sm border'>
          <p className='text-muted-foreground text-sm font-medium'>
            Total Orders
          </p>
          <p className='text-3xl font-bold mt-2'>128</p>
        </div>
        <div className='rounded-2xl bg-white p-6 shadow-sm border'>
          <p className='text-muted-foreground text-sm font-medium'>
            Pending Songs
          </p>
          <p className='text-3xl font-bold mt-2'>12</p>
        </div>
        <div className='rounded-2xl bg-white p-6 shadow-sm border'>
          <p className='text-muted-foreground text-sm font-medium'>Revenue</p>
          <p className='text-3xl font-bold mt-2'>$2,540</p>
        </div>
      </div>
    </div>
  )
}
