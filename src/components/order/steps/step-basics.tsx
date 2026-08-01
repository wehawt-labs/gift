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
        <h2 className='font-bold font-heading text-2xl text-foreground leading-tight'>Who is this gift for?</h2>
        <p className='mt-1 text-sm text-muted-foreground font-sans'>Select the recipient and details for your custom song.</p>
      </div>

      <div className='space-y-6'>
        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm'>
          <Label className='font-semibold font-heading text-base text-foreground'>Who is this song for?</Label>
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
                  'group flex flex-col items-center justify-center rounded-xl border-2 p-4 transition-all active:scale-[0.98]',
                  recipient === opt.value
                    ? 'border-primary bg-background shadow-md ring-2 ring-primary/20'
                    : 'border-transparent bg-background/60 hover:bg-background hover:border-border'
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
        </div>

        <div className='bg-card rounded-2xl p-5 border border-foreground/5 grid gap-5 sm:grid-cols-2 shadow-sm'>
          <div className='space-y-2'>
            <Label htmlFor='recipientName' className='font-semibold font-heading text-foreground'>
              What is their name?
            </Label>
            <Input
              id='recipientName'
              placeholder='e.g. Sarah'
              className='h-11 rounded-xl border-border bg-background px-4 font-sans text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20'
              {...register('recipientName')}
            />
            <FormErrorMessage message={errors.recipientName?.message} trigger={validationTrigger} />
          </div>

          <div className='space-y-2'>
            <Label className='font-semibold font-heading text-foreground'>What's the occasion?</Label>
            <Select onValueChange={(v) => setValue('occasion', v, { shouldValidate: true })} value={occasion}>
              <SelectTrigger className='h-11 w-full rounded-xl border-border bg-background px-4 font-sans text-foreground focus-visible:border-primary focus-visible:ring-primary/20'>
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
