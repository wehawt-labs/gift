'use client'

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
      tempo: 'Upbeat & Happy',
      vocalPreference: 'Male',
      memory: '',
      jokes: '',
      coreMessage: '',
      buyerName: '',
      buyerEmail: '',
      plan: LemonSqueezyPlan.STANDARD
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
    if (currentStep === 1)
      fieldsToValidate = ['recipient', 'recipientName', 'occasion']
    if (currentStep === 2)
      fieldsToValidate = ['genre', 'tempo', 'vocalPreference']
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
      if (currentStep === 1)
        fieldsToValidate = ['recipient', 'recipientName', 'occasion']
      if (currentStep === 2)
        fieldsToValidate = ['genre', 'tempo', 'vocalPreference']
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
        storyPrompt: [data.memory, data.jokes, data.coreMessage]
          .filter(Boolean)
          .join('\n\n'),
        genre: data.genre,
        vibe: data.tempo,
        buyerName: data.buyerName,
        buyerEmail: data.buyerEmail,
      })

      if (!result.success || !result.checkoutUrl) {
        toast.error('Checkout Error', {
          description:
            result.error ?? 'Failed to create checkout. Please try again.',
        })
        return
      }

      // Open LS checkout overlay
      if (window.LemonSqueezy) {
        window.LemonSqueezy.Url.Open(result.checkoutUrl)
      } else {
        // Fallback: redirect to checkout URL
        window.location.href = result.checkoutUrl
      }

      // Reset dirty state so navigation guard doesn't block
      methods.reset(data)
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Something went wrong', {
        description: 'Please try again or contact support.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen px-6 py-8'>
      <div className='mx-auto max-w-7xl'>
        {/* Sale Alert */}
        <div className='mx-auto mb-6 max-w-3xl'>
          <div className='flex animate-pulse items-center gap-3 rounded-xl border border-primary/20 bg-primary/10 p-3'>
            <div className='rounded-full bg-primary p-1.5'>
              <Zap className='h-4 w-4 fill-current text-white' />
            </div>
            <div>
              <p className='font-bold text-primary text-xs leading-none sm:text-sm'>
                💝 14/2 Valentine's Sale ends soon!
              </p>
              <p className='mt-1 font-medium text-[11px] text-foreground/70 sm:text-xs'>
                Order now for **Priority Queue** and results in **24 hours**.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className='mx-auto mb-20 max-w-2xl'>
          <div className='flex items-center justify-between'>
            {STAGES.map((stage, idx) => (
              <React.Fragment key={stage.id}>
                <button
                  type='button'
                  onClick={() => goToStep(stage.id)}
                  className='group relative flex flex-col items-center outline-none'
                >
                  <div
                    className={cn(
                      'z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300',
                      currentStep === stage.id
                        ? 'scale-110 border-primary bg-primary text-white'
                        : currentStep > stage.id
                          ? 'border-primary bg-primary text-white'
                          : 'border-foreground/10 bg-white text-muted-foreground group-hover:border-primary/50'
                    )}
                  >
                    {currentStep > stage.id ? (
                      <Check className='h-4 w-4 stroke-[3px]' />
                    ) : (
                      <span className='font-semibold text-sm'>{stage.id}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      'absolute -bottom-6 whitespace-nowrap font-semibold text-xs transition-colors',
                      currentStep >= stage.id
                        ? 'text-foreground'
                        : 'text-muted-foreground group-hover:text-primary'
                    )}
                  >
                    {stage.name}
                  </span>
                </button>
                {idx < STAGES.length - 1 && (
                  <div className='mx-2 h-[2px] flex-1 bg-foreground/10'>
                    <motion.div
                      className='h-full bg-primary'
                      initial={{ width: '0%' }}
                      animate={{
                        width: currentStep > stage.id ? '100%' : '0%'
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-3'>
          {/* Form Side */}
          <div className='lg:col-span-2'>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode='wait' initial={false} custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={{
                      enter: (direction: number) => ({
                        x: direction > 0 ? 20 : -20,
                        opacity: 0
                      }),
                      center: { x: 0, opacity: 1 },
                      exit: (direction: number) => ({
                        x: direction < 0 ? 20 : -20,
                        opacity: 0
                      })
                    }}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {currentStep === 1 && (
                      <StepBasics validationTrigger={validationTrigger} />
                    )}
                    {currentStep === 2 && (
                      <StepVibe validationTrigger={validationTrigger} />
                    )}
                    {currentStep === 3 && (
                      <StepStory validationTrigger={validationTrigger} />
                    )}
                    {currentStep === 4 && (
                      <StepCheckout validationTrigger={validationTrigger} />
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className='mt-8 flex items-center justify-between border-foreground/5 border-t pt-6'>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className='rounded-full px-6 font-medium text-foreground'
                  >
                    <ChevronLeft className='mr-1.5 h-4 w-4' />
                    Back
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      type='button'
                      size='default'
                      onClick={nextStep}
                      className='h-10 rounded-full bg-primary px-8 font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90'
                    >
                      Next Step
                      <ChevronRight className='ml-1.5 h-4 w-4' />
                    </Button>
                  ) : (
                    <Button
                      type='submit'
                      size='lg'
                      disabled={isSubmitting}
                      className='h-11 rounded-full bg-primary px-10 font-bold text-base text-white shadow-lg shadow-primary/20 hover:bg-primary/90'
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                          Creating Checkout...
                        </>
                      ) : (
                        <>
                          Proceed to Payment ($
                          {(
                            PLANS.find((p) => p.id === formData.plan) ||
                            PLANS[0]
                          ).price.toFixed(2)}
                          )
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </div>

          {/* Sticky Summary Side */}
          <div className='sticky top-24'>
            <OrderSummary formData={formData} />
          </div>
        </div>
      </div>
    </div>
  )
}
