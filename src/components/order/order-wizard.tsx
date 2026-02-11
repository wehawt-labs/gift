'use client'

import React, { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { motion, AnimatePresence } from 'motion/react'
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { orderSchema, type OrderFormData } from './schema'
import { STAGES, PLANS } from './constants'

// Component imports
import { StepBasics } from './steps/step-basics'
import { StepVibe } from './steps/step-vibe'
import { StepStory } from './steps/step-story'
import { StepCheckout } from './steps/step-checkout'
import { OrderSummary } from './order-summary'

export function OrderWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(0)

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
      plan: 'standard'
    },
    mode: 'onChange'
  })

  const {
    watch,
    trigger,
    handleSubmit,
    formState: { isValid }
  } = methods
  const formData = watch()

  const nextStep = async () => {
    let fieldsToValidate: (keyof OrderFormData)[] = []
    if (currentStep === 1)
      fieldsToValidate = ['recipient', 'recipientName', 'occasion']
    if (currentStep === 2)
      fieldsToValidate = ['genre', 'tempo', 'vocalPreference']
    if (currentStep === 3) fieldsToValidate = ['memory', 'coreMessage']

    const output = await trigger(fieldsToValidate)
    if (!output) return

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
      if (!isValid) return
    }

    setDirection(stepId > currentStep ? 1 : -1)
    setCurrentStep(stepId)
  }

  const onSubmit = (data: OrderFormData) => {
    console.log('Final Order Data:', data)
    alert('Order Placed! Redirecting to payment...')
  }

  return (
    <div className='min-h-screen py-8 px-6'>
      <div className='mx-auto max-w-7xl'>
        {/* Sale Alert */}
        <div className='mb-6 max-w-3xl mx-auto'>
          <div className='bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center gap-3 animate-pulse'>
            <div className='bg-primary p-1.5 rounded-full'>
              <Zap className='w-4 h-4 text-white fill-current' />
            </div>
            <div>
              <p className='text-primary font-bold text-xs sm:text-sm leading-none'>
                💝 14/2 Valentine's Sale ends soon!
              </p>
              <p className='text-foreground/70 text-[11px] sm:text-xs font-medium mt-1'>
                Order now for **Priority Queue** and results in **24 hours**.
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className='mb-20 max-w-2xl mx-auto'>
          <div className='flex items-center justify-between'>
            {STAGES.map((stage, idx) => (
              <React.Fragment key={stage.id}>
                <button
                  type='button'
                  onClick={() => goToStep(stage.id)}
                  className='relative flex flex-col items-center group outline-none'
                >
                  <div
                    className={cn(
                      'w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-sm z-10',
                      currentStep === stage.id
                        ? 'bg-primary border-primary text-white scale-110'
                        : currentStep > stage.id
                          ? 'bg-primary border-primary text-white'
                          : 'bg-white border-foreground/10 text-muted-foreground group-hover:border-primary/50'
                    )}
                  >
                    {currentStep > stage.id ? (
                      <Check className='w-4 h-4 stroke-[3px]' />
                    ) : (
                      <span className='font-semibold text-sm'>{stage.id}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      'absolute -bottom-6 whitespace-nowrap text-xs font-semibold transition-colors',
                      currentStep >= stage.id
                        ? 'text-foreground'
                        : 'text-muted-foreground group-hover:text-primary'
                    )}
                  >
                    {stage.name}
                  </span>
                </button>
                {idx < STAGES.length - 1 && (
                  <div className='h-[2px] flex-1 mx-2 bg-foreground/10'>
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
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
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
                    {currentStep === 1 && <StepBasics />}
                    {currentStep === 2 && <StepVibe />}
                    {currentStep === 3 && <StepStory />}
                    {currentStep === 4 && <StepCheckout />}
                  </motion.div>
                </AnimatePresence>

                <div className='mt-8 flex items-center justify-between border-t border-foreground/5 pt-6'>
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className='rounded-full px-6 text-foreground font-medium'
                  >
                    <ChevronLeft className='mr-1.5 w-4 h-4' />
                    Back
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      type='button'
                      size='default'
                      onClick={nextStep}
                      className='rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 font-semibold h-10'
                    >
                      Next Step
                      <ChevronRight className='ml-1.5 w-4 h-4' />
                    </Button>
                  ) : (
                    <Button
                      type='submit'
                      size='lg'
                      className='rounded-full px-10 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 font-bold h-11 text-base'
                    >
                      Proceed to Payment (${(PLANS.find(p => p.id === formData.plan) || PLANS[0]).price.toFixed(2)})
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
