import { Heart, Music, Newspaper, Star } from 'lucide-react'

const trustLogos = [
  { name: 'MelodyPress', icon: Music },
  { name: 'GiftGuide', icon: Heart },
  { name: 'SoundWeekly', icon: Star },
  { name: 'TheGoldenBow', icon: Newspaper }
]

export function TrustSection() {
  return (
    <section className='border-y border-border bg-card py-12'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <p className='text-center text-sm font-medium tracking-widest text-muted-foreground'>
          TRUSTED BY 10,000+ HAPPY GIFTERS
        </p>
        <div className='mt-8 flex flex-wrap items-center justify-center gap-8 md:gap-16'>
          {trustLogos.map((logo) => (
            <div
              key={logo.name}
              className='flex items-center gap-2 text-muted-foreground'
            >
              <logo.icon className='h-5 w-5' />
              <span className='font-medium'>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
