import { Music, Sparkles, Zap } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Customize Your Vibe',
    description:
      'Select your preferred genre, mood, and vocal style. From Acoustic Pop to Rock Ballads, pick the perfect sound for your story.',
    icon: Music,
    color: 'bg-primary/10 text-primary'
  },
  {
    number: 2,
    title: 'Share Your Story',
    description:
      'Tell us about your favorite memories, inside jokes, and the core message you want to send. Our AI helps refine your thoughts into lyrics.',
    icon: Sparkles,
    color: 'bg-accent/10 text-accent'
  },
  {
    number: 3,
    title: '24-Hour Delivery',
    description:
      "For a limited time, receive your studio-quality custom song within just 24 hours. Ready to share, cherish, and gift forever.",
    icon: Zap,
    color: 'bg-primary/10 text-primary'
  }
]

export function HowItWorksSection() {
  return (
    <section id='how-it-works' className='bg-background py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center'>
          <h2 className='font-bold font-heading text-3xl text-foreground md:text-4xl'>
            How it works
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-lg text-muted-foreground'>
            We make it incredibly easy to create a studio-quality song that
            captures your unique story in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className='mt-16 grid gap-8 md:grid-cols-3'>
          {steps.map((step) => (
            <div
              key={step.number}
              className='relative rounded-3xl bg-card p-8 shadow-sm transition-shadow hover:shadow-md'
            >
              {/* Icon */}
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${step.color}`}
              >
                <step.icon className='h-6 w-6' />
              </div>

              {/* Content */}
              <h3 className='mt-6 font-semibold text-foreground text-xl'>
                {step.number}. {step.title}
              </h3>
              <p className='mt-3 text-muted-foreground'>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
