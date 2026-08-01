'use client'
/// <reference path="../../types/lemonsqueezy.d.ts" />

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { Check, ChevronLeft, ChevronRight, Loader2, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createCheckoutSession } from '@/actions/checkout'
import { Button } from '@/components/ui/button'
import { LemonSqueezyPlan } from '@/lib/lemonsqueezy/constants'
import { cn } from '@/lib/utils'
import { PLANS, STAGES } from './constants'
import { OrderSummary } from './order-summary'
import { type OrderFormData, orderSchema } from './schema'
// Component imports
import { StepBasics } from './steps/step-basics'
import { StepCheckout } from './steps/step-checkout'
import { StepStory } from './steps/step-story'
import { StepVibe } from './steps/step-vibe'

export function OrderWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(0)
  const [validationTrigger, setValidationTrigger] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const methods = useForm<OrderFormData>({
    resolver: standardSchemaResolver(orderSchema),
    defaultValues: {
      recipient: 'Partner',
      recipientName: '',
      occasion: 'Birthday',
      genre: 'Acoustic Pop',
      tempo: 'Warm & Cozy',
      vocalPreference: 'Male',
      memory: '',
      jokes: '',
      coreMessage: '',
      buyerName: '',
      buyerEmail: '',
      plan: 'single_gift',
      hasVoiceCloning: false,
      hasPhotoSlideshow: false,
      hasCustomWebsite: false,
      sampleMelodyUrl: '',
      selectedVoicePersona: 'none'
    },
    mode: 'onBlur'
  })

  const {
    watch,
    trigger,
    handleSubmit,
    formState: { isDirty }
  } = methods
  const formData = watch()

  // Prevent accidental navigation/closure when form is dirty
  useEffect(() => {
    if (!isDirty) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
      return ''
    }

    const handlePopState = () => {
      if (isDirty) {
        // Prevent immediate navigation
        window.history.pushState(null, '', window.location.href)

        toast('Unsaved Changes', {
          description: 'Your song progress will be lost if you leave now.',
          action: {
            label: 'Leave Anyway',
            onClick: () => {
              // Reset dirty state so we can actually leave
              methods.reset(formData)
              window.history.back()
            }
          },
          cancel: {
            label: 'Stay',
            onClick: () => {}
          },
          duration: 10000 // Long duration for confirmation
        })
      }
    }

    // Capture browser back button in SPA
    window.history.pushState(null, '', window.location.href)
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isDirty, formData, methods])

  const nextStep = async () => {
    let fieldsToValidate: (keyof OrderFormData)[] = []
    if (currentStep === 1) fieldsToValidate = ['recipient', 'recipientName', 'occasion']
    if (currentStep === 2) fieldsToValidate = ['genre', 'tempo', 'vocalPreference']
    if (currentStep === 3) fieldsToValidate = ['memory', 'coreMessage']

    const isValid = await trigger(fieldsToValidate)
    if (!isValid) {
      setValidationTrigger((prev) => prev + 1)
      return
    }

    setDirection(1)
    setCurrentStep((prev) => Math.min(prev + 1, STAGES.length))
  }

  const prevStep = () => {
    setDirection(-1)
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const goToStep = async (stepId: number) => {
    if (stepId === currentStep) return

    // If jumping forward, validate current step fields
    if (stepId > currentStep) {
      let fieldsToValidate: (keyof OrderFormData)[] = []
      if (currentStep === 1) fieldsToValidate = ['recipient', 'recipientName', 'occasion']
      if (currentStep === 2) fieldsToValidate = ['genre', 'tempo', 'vocalPreference']
      if (currentStep === 3) fieldsToValidate = ['memory', 'coreMessage']

      const isValid = await trigger(fieldsToValidate)
      if (!isValid) {
        setValidationTrigger((prev) => prev + 1)
        return
      }
    }

    setDirection(stepId > currentStep ? 1 : -1)
    setCurrentStep(stepId)
  }

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true)
    try {
      const result = await createCheckoutSession({
        plan: data.plan as LemonSqueezyPlan,
        recipientName: data.recipientName,
        recipientRelationship: data.recipient,
        occasion: data.occasion,
        storyPrompt: [data.memory, data.jokes, data.coreMessage].filter(Boolean).join('\n\n'),
        genre: data.genre,
        vibe: data.tempo,
        buyerName: data.buyerName,
        buyerEmail: data.buyerEmail
      })

      if (!result.success || !result.checkoutUrl) {
        toast.error('Checkout Error', {
          description: result.error ?? 'Failed to create checkout. Please try again.'
        })
        return
      }

      // Reset dirty state so navigation guard doesn't block
      methods.reset(data)

      // Open LS checkout overlay
      if (window.LemonSqueezy) {
        window.LemonSqueezy.Url.Open(result.checkoutUrl)

        // Listen for checkout close/complete — redirect to confirmation page
        window.addEventListener(
          'message',
          (event: MessageEvent) => {
            if (typeof event.data === 'string' && event.data === 'close') {
              // Overlay closed — redirect to confirmation with orderId for polling
              const successUrl = `/order/success${result.orderId ? `?orderId=${result.orderId}` : ''}`
              window.location.href = successUrl
            }
          },
          { once: true }
        )
      } else {
        // Fallback: redirect to checkout URL directly
        window.location.href = result.checkoutUrl
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Something went wrong', {
        description: 'Please try again or contact support.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-background text-foreground pb-32 pt-6 font-sans'>
      <div className='mx-auto max-w-xl px-4 sm:px-6'>
        {/* Step Indicator Header */}
        <div className='mb-8 space-y-2'>
          <div className='flex items-center justify-between font-sans text-xs'>
            <span className='font-bold font-heading text-primary uppercase tracking-wider'>
              Step {currentStep} of {STAGES.length}
            </span>
            <span className='font-medium text-muted-foreground'>
              {STAGES[currentStep - 1]?.name}
            </span>
          </div>
          <div className='h-1.5 w-full bg-border/60 rounded-full overflow-hidden'>
            <motion.div
              className='h-full bg-primary rounded-full'
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStep / STAGES.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Main Form Content */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            <AnimatePresence mode='wait' initial={false} custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={{
                  enter: (direction: number) => ({
                    x: direction > 0 ? 15 : -15,
                    opacity: 0
                  }),
                  center: { x: 0, opacity: 1 },
                  exit: (direction: number) => ({
                    x: direction < 0 ? 15 : -15,
                    opacity: 0
                  })
                }}
                initial='enter'
                animate='center'
                exit='exit'
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {currentStep === 1 && <StepBasics validationTrigger={validationTrigger} />}
                {currentStep === 2 && <StepVibe validationTrigger={validationTrigger} />}
                {currentStep === 3 && <StepStory validationTrigger={validationTrigger} />}
                {currentStep === 4 && <StepCheckout validationTrigger={validationTrigger} />}
              </motion.div>
            </AnimatePresence>

            {/* Option 2: Desktop Inline Form Footer (Natural Scroll) */}
            <div className='hidden md:flex items-center justify-between border-t border-border/40 pt-6 mt-8'>
              <Button
                type='button'
                variant='ghost'
                size='default'
                onClick={prevStep}
                disabled={currentStep === 1}
                className='rounded-xl font-heading font-semibold text-foreground hover:bg-card px-5'
              >
                <ChevronLeft className='mr-1.5 h-4 w-4' />
                Back
              </Button>

              <div className='text-xs font-semibold font-heading text-muted-foreground'>
                Step {currentStep} of {STAGES.length}
              </div>

              {currentStep < 4 ? (
                <Button
                  type='button'
                  size='default'
                  onClick={nextStep}
                  className='h-11 rounded-xl bg-primary text-primary-foreground font-heading font-bold px-8 shadow-[0_2px_0_0_#842504] hover:bg-primary/90 active:translate-y-[1px] transition-all flex items-center gap-2'
                >
                  Next Step
                  <ChevronRight className='h-4 w-4' />
                </Button>
              ) : (
                <Button
                  type='submit'
                  size='default'
                  disabled={isSubmitting}
                  className='h-11 rounded-xl bg-primary text-primary-foreground font-heading font-bold px-8 shadow-[0_2px_0_0_#842504] hover:bg-primary/90 active:translate-y-[1px] transition-all'
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete & Pay ($
                      {(PLANS.find((p) => p.id === formData.plan) || PLANS[0]).price.toFixed(2)})
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Option 1: Mobile Floating Card Dock (Thumb-friendly floating pill) */}
            <div className='md:hidden fixed bottom-4 left-4 right-4 z-40 max-w-xl mx-auto bg-card/95 backdrop-blur-md rounded-2xl shadow-xl border border-border/80 p-2.5 flex items-center justify-between'>
              <Button
                type='button'
                variant='ghost'
                size='sm'
                onClick={prevStep}
                disabled={currentStep === 1}
                className='rounded-xl font-heading font-semibold text-foreground px-3'
              >
                <ChevronLeft className='h-4 w-4 mr-1' />
                Back
              </Button>

              <span className='font-heading text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full'>
                {currentStep}/{STAGES.length}
              </span>

              {currentStep < 4 ? (
                <Button
                  type='button'
                  size='sm'
                  onClick={nextStep}
                  className='h-9 rounded-xl bg-primary text-primary-foreground font-heading font-bold px-5 shadow-[0_2px_0_0_#842504] active:translate-y-[1px] transition-all flex items-center gap-1'
                >
                  Next
                  <ChevronRight className='h-3.5 w-3.5' />
                </Button>
              ) : (
                <Button
                  type='submit'
                  size='sm'
                  disabled={isSubmitting}
                  className='h-9 rounded-xl bg-primary text-primary-foreground font-heading font-bold px-5 shadow-[0_2px_0_0_#842504] active:translate-y-[1px] transition-all'
                >
                  {isSubmitting ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    `Pay $${(PLANS.find((p) => p.id === formData.plan) || PLANS[0]).price.toFixed(2)}`
                  )}
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
