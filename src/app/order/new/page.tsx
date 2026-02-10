'use client'

import { Music } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { OccasionForm, StepIndicator, TrustBadges } from '@/components/forms'
import { Button } from '@/components/ui/button'

const steps = [{ label: 'Occasion' }, { label: 'Vibe' }, { label: 'Story' }]

export default function OrderNewPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push('/')
    }
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='border-border border-b bg-card/50 backdrop-blur-sm'>
        <nav className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
          <Link href='/' className='flex items-center gap-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary'>
              <Music className='h-4 w-4 text-primary-foreground' />
            </div>
            <span className='font-semibold text-foreground text-xl'>
              GiftOfSong
            </span>
          </Link>

          <div className='flex items-center gap-4'>
            <Link
              href='#how-it-works'
              className='hidden font-medium text-muted-foreground text-sm transition-colors hover:text-foreground sm:block'
            >
              How it works
            </Link>
            <Button href='/login' variant='outline' className='rounded-full'>
              Sign In
            </Button>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className='mx-auto max-w-3xl px-6 py-12 lg:py-16'>
        {/* Title */}
        <div className='text-center'>
          <h1 className='font-bold font-heading text-4xl text-foreground md:text-5xl'>
            Craft Your Song
          </h1>
          <p className='mt-4 text-lg text-muted-foreground italic'>
            Share your story, and we'll turn it into a timeless melody.
          </p>
        </div>

        {/* Step indicator */}
        <div className='mx-auto mt-12 max-w-xl'>
          <StepIndicator currentStep={currentStep} steps={steps} />
        </div>

        {/* Form content */}
        <div className='mt-12'>
          {currentStep === 1 && (
            <OccasionForm onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 2 && (
            <div className='rounded-3xl bg-card p-8 text-center shadow-sm'>
              <h2 className='font-semibold text-2xl'>Step 2: The Vibe</h2>
              <p className='mt-2 text-muted-foreground'>
                Coming soon - genre and mood selection
              </p>
              <div className='mt-8 flex justify-between'>
                <Button
                  variant='outline'
                  className='rounded-full'
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button className='rounded-full' onClick={handleNext}>
                  Next: Story
                </Button>
              </div>
            </div>
          )}
          {currentStep === 3 && (
            <div className='rounded-3xl bg-card p-8 text-center shadow-sm'>
              <h2 className='font-semibold text-2xl'>Step 3: Your Story</h2>
              <p className='mt-2 text-muted-foreground'>
                Coming soon - story and memories input
              </p>
              <div className='mt-8 flex justify-between'>
                <Button
                  variant='outline'
                  className='rounded-full'
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button className='rounded-full'>Submit Order</Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Trust badges footer */}
      <footer className='border-border border-t bg-card py-8'>
        <div className='mx-auto max-w-7xl px-6'>
          <TrustBadges />
        </div>
      </footer>
    </div>
  )
}
