'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { OCCASIONS, RECIPIENT_OPTIONS } from '../constants'
import type { OrderFormData } from '../schema'

export function StepBasics({
  validationTrigger
}: {
  validationTrigger: number
}) {
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext<OrderFormData>()

  const recipient = useWatch({ name: 'recipient' })
  const occasion = useWatch({ name: 'occasion' })

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='font-bold font-serif text-2xl text-foreground leading-tight'>
          Let's start with the basics
        </h2>
        <p className='mt-1 text-base text-foreground/60'>
          Who is this masterpiece for?
        </p>
      </div>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label className='font-semibold'>Who is this song for?</Label>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
            {RECIPIENT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type='button'
                onClick={() =>
                  setValue('recipient', opt.value, {
                    shouldValidate: true,
                    shouldDirty: true
                  })
                }
                className={cn(
                  'group flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all',
                  recipient === opt.value
                    ? 'border-primary bg-white ring-4 ring-primary/10'
                    : 'border-foreground/5 bg-white/50 hover:border-foreground/20'
                )}
              >
                <opt.icon
                  className={cn(
                    'mb-2 h-6 w-6 transition-colors',
                    recipient === opt.value
                      ? 'text-primary'
                      : 'text-foreground/40 group-hover:text-foreground/60'
                  )}
                />
                <span
                  className={cn(
                    'font-medium text-xs',
                    recipient === opt.value
                      ? 'text-foreground'
                      : 'text-foreground/60'
                  )}
                >
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
          <FormErrorMessage
            message={errors.recipient?.message}
            trigger={validationTrigger}
          />
        </div>

        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='recipientName' className='font-semibold'>
              What is their name?
            </Label>
            <Input
              id='recipientName'
              placeholder='e.g. Sarah'
              className='h-10 rounded-xl border-foreground/10 bg-white focus-visible:border-primary focus-visible:ring-primary/20'
              {...register('recipientName')}
            />
            <FormErrorMessage
              message={errors.recipientName?.message}
              trigger={validationTrigger}
            />
          </div>

          <div className='space-y-2'>
            <Label className='font-semibold'>What's the occasion?</Label>
            <Select
              onValueChange={(v) =>
                setValue('occasion', v, { shouldValidate: true })
              }
              value={occasion}
            >
              <SelectTrigger className='h-10 w-full rounded-xl border-foreground/10 bg-white focus-visible:border-primary focus-visible:ring-primary/20'>
                <SelectValue placeholder='Select an occasion' />
              </SelectTrigger>
              <SelectContent>
                {OCCASIONS.map((occ) => (
                  <SelectItem key={occ} value={occ}>
                    {occ}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormErrorMessage
              message={errors.occasion?.message}
              trigger={validationTrigger}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
