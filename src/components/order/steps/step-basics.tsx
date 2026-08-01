'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { OCCASIONS, RECIPIENT_OPTIONS } from '../constants'
import type { OrderFormData } from '../schema'

export function StepBasics({ validationTrigger }: { validationTrigger: number }) {
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
        <h1 className='font-bold font-heading text-2xl sm:text-3xl text-foreground leading-snug'>Who is this for?</h1>
        <p className='mt-1 text-sm text-muted-foreground font-sans'>Select the recipient for your personalized song gift.</p>
      </div>

      <div className='space-y-6'>
        {/* Relationship Bento Grid (3-column style from Stitch) */}
        <div className='grid grid-cols-3 gap-3'>
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
                'group flex flex-col items-center justify-center p-4 rounded-xl border transition-all active:scale-95',
                recipient === opt.value
                  ? 'border-primary bg-card shadow-[0_2px_0_0_#c1502e] text-primary'
                  : 'border-border/60 bg-card/60 hover:bg-card hover:border-border text-muted-foreground'
              )}
            >
              <opt.icon
                className={cn(
                  'mb-2 h-7 w-7 transition-colors',
                  recipient === opt.value ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                )}
              />
              <span
                className={cn(
                  'font-semibold text-xs font-sans',
                  recipient === opt.value ? 'text-primary' : 'text-foreground'
                )}
              >
                {opt.label}
              </span>
            </button>
          ))}
        </div>
        <FormErrorMessage message={errors.recipient?.message} trigger={validationTrigger} />

        {/* Inputs */}
        <div className='grid gap-4 sm:grid-cols-2 pt-2'>
          <div className='space-y-2'>
            <Label htmlFor='recipientName' className='font-semibold font-heading text-sm text-foreground'>
              What is their name?
            </Label>
            <Input
              id='recipientName'
              placeholder='e.g. Sarah'
              className='h-11 rounded-xl border-border/80 bg-card px-4 font-sans text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20'
              {...register('recipientName')}
            />
            <FormErrorMessage message={errors.recipientName?.message} trigger={validationTrigger} />
          </div>

          <div className='space-y-2'>
            <Label className='font-semibold font-heading text-sm text-foreground'>What's the occasion?</Label>
            <Select onValueChange={(v) => setValue('occasion', v, { shouldValidate: true })} value={occasion}>
              <SelectTrigger className='h-11 w-full rounded-xl border-border/80 bg-card px-4 font-sans text-sm text-foreground focus-visible:border-primary focus-visible:ring-primary/20'>
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
            <FormErrorMessage message={errors.occasion?.message} trigger={validationTrigger} />
          </div>
        </div>
      </div>
    </div>
  )
}
