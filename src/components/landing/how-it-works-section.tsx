import { Gift, Music, PenLine } from 'lucide-react'

const steps = [
  {
    number: 1,
    title: 'Tell Us Your Story',
    description:
      'Answer a few simple questions about who this song is for, the occasion, and the memories you want to include.',
    icon: PenLine,
    color: 'bg-primary/10 text-primary'
  },
  {
    number: 2,
    title: 'Artist Selection',
    description:
      "Select your preferred genre and mood. We'll match you with a professional vocalist who fits your story perfectly.",
    icon: Music,
    color: 'bg-accent/10 text-accent'
  },
  {
    number: 3,
    title: 'The Reveal',
    description:
      "Within 5-7 days, you'll receive your custom song along with lyrics, ready to be shared and cherished forever.",
    icon: Gift,
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
