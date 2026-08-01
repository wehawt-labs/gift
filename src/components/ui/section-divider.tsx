'use client'

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className='relative my-6 flex items-center justify-center'>
      <div className='absolute inset-0 flex items-center'>
        <div className='w-full border-border/60 border-t' />
      </div>
      <span className='relative bg-background px-4 font-bold font-heading text-[10px] text-muted-foreground uppercase tracking-widest sm:text-[11px]'>
        {label}
      </span>
    </div>
  )
}
