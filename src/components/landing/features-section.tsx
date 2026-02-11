import { Check, Mic, Music, Sparkles } from 'lucide-react'
import Image from 'next/image'

const features = [
  {
    icon: Mic,
    title: 'High-Fidelity Audio',
    description:
      'Polished, high-quality audio production ready for any speaker.'
  },
  {
    icon: Sparkles,
    title: '100% Personalization',
    description: 'Every word is inspired by the memories you share with us.'
  },
  {
    icon: Music,
    title: 'Listen Everywhere',
    description: 'Download your song and play it on any device, anytime.'
  }
]

export function FeaturesSection() {
  return (
    <section className='overflow-hidden bg-card py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='grid items-center gap-16 lg:grid-cols-2'>
          {/* Left - Images */}
          <div className='relative'>
            <div className='grid grid-cols-2 gap-4'>
              {/* Main image */}
              <div className='col-span-2 aspect-[4/3] overflow-hidden rounded-3xl bg-muted'>
                <Image
                  src='/studio-recording.jpg'
                  alt='Recording studio'
                  width={600}
                  height={450}
                  className='h-full w-full object-cover'
                />
              </div>
              {/* Secondary image */}
              <div className='aspect-square overflow-hidden rounded-3xl bg-muted'>
                <Image
                  src='/microphone.jpg'
                  alt='Microphone'
                  width={300}
                  height={300}
                  className='h-full w-full object-cover'
                />
              </div>
              {/* Testimonial card */}
              <div className='flex flex-col justify-center rounded-3xl bg-background p-6'>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className='text-yellow-500'>
                      ★
                    </span>
                  ))}
                </div>
                <p className='mt-3 text-muted-foreground text-sm italic'>
                  "My wife cried happy tears. Best anniversary gift ever."
                </p>
                <p className='mt-2 font-medium text-foreground text-sm'>
                  — Michael
                </p>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <h2 className='font-bold font-heading text-3xl text-foreground md:text-4xl'>
              More than just a song. It's a{' '}
              <span className='text-primary italic'>moment.</span>
            </h2>
            <p className='mt-6 text-lg text-muted-foreground'>
              Music has the power to bring back memories more vividly than any
              photo. We don't just put words to music; we capture the essence of
              your story in a unique composition.
            </p>

            {/* Feature list */}
            <div className='mt-10 space-y-6'>
              {features.map((feature) => (
                <div key={feature.title} className='flex gap-4'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/20'>
                    <Check className='h-5 w-5 text-accent' />
                  </div>
                  <div>
                    <h3 className='font-semibold text-foreground'>
                      {feature.title}
                    </h3>
                    <p className='text-muted-foreground text-sm'>
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
