'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { OCCASIONS, RECIPIENT_OPTIONS } from '../constants'
import type { OrderFormData } from '../schema'

function RequiredBadge() {
  return (
    <span className='ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 font-bold font-heading text-[10px] text-primary tracking-wide shadow-2xs'>
      <span>❤️</span> required
    </span>
  )
}

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
        <h1 className='font-bold font-heading text-2xl text-foreground leading-snug sm:text-3xl'>Who is this for?</h1>
        <p className='mt-1 font-sans text-muted-foreground text-sm'>
          Select the recipient for your personalized song gift.
        </p>
      </div>

      <div className='space-y-6'>
        {/* Relationship Bento Grid */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <Label className='flex items-center font-heading font-semibold text-foreground text-sm'>
              Who is this song for?
              <RequiredBadge />
            </Label>
          </div>

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
                  'group flex flex-col items-center justify-center rounded-xl border p-3.5 transition-all active:scale-95',
                  recipient === opt.value
                    ? 'border-primary bg-card text-primary shadow-[0_2px_0_0_#c1502e]'
                    : 'border-border/60 bg-card/60 text-muted-foreground hover:border-border hover:bg-card'
                )}
              >
                <opt.icon
                  className={cn(
                    'mb-1.5 h-6 w-6 transition-colors',
                    recipient === opt.value ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                />
                <span
                  className={cn(
                    'font-sans font-semibold text-xs',
                    recipient === opt.value ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {opt.label}
                </span>
              </button>
            ))}
          </div>

          {/* Custom Recipient Text Input */}
          <div className='pt-1'>
            <Input
              placeholder='Or type custom recipient (e.g. Colleague, Boss, My Cat...)'
              value={recipient && !['Partner', 'Parent', 'Friend', 'Myself'].includes(recipient) ? recipient : ''}
              onChange={(e) => setValue('recipient', e.target.value, { shouldValidate: true, shouldDirty: true })}
              className='h-10 rounded-xl border-border bg-card px-3 font-sans text-foreground text-xs placeholder:text-muted-foreground'
            />
          </div>
          <div className='min-h-5'>
            <FormErrorMessage message={errors.recipient?.message} trigger={validationTrigger} />
          </div>
        </div>

        {/* Symmetrical 2-Column Inputs Grid (Zero-Jump Error Containers) */}
        <div className='grid gap-4 pt-1 sm:grid-cols-2'>
          {/* Left Column: Recipient Name & Nickname/Alias */}
          <div className='space-y-2'>
            <Label
              htmlFor='recipientName'
              className='flex items-center font-heading font-semibold text-foreground text-sm'
            >
              What is their name?
              <RequiredBadge />
            </Label>
            <Input
              id='recipientName'
              placeholder='Full name, e.g. Sarah Jenkins'
              className={cn(
                'h-11 rounded-xl border-border/80 bg-card px-4 font-sans text-foreground text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20',
                errors.recipientName && 'border-destructive focus-visible:ring-destructive/20'
              )}
              {...register('recipientName')}
            />

            <Input
              id='recipientNickname'
              placeholder='Nickname, title or alias (e.g. Honey, Boss, Big Bro...)'
              className='mt-2 h-10 rounded-xl border-border bg-card px-3 font-sans text-foreground text-xs placeholder:text-muted-foreground'
              {...register('recipientNickname')}
            />

            {/* Reserved Error Slot (Prevents Layout Jump for Input 2) */}
            <div className='min-h-5 pt-0.5'>
              <FormErrorMessage message={errors.recipientName?.message} trigger={validationTrigger} />
            </div>
          </div>

          {/* Right Column: Occasion Select & Custom Occasion */}
          <div className='space-y-2'>
            <Label className='flex items-center font-heading font-semibold text-foreground text-sm'>
              What's the occasion?
              <RequiredBadge />
            </Label>
            <Select
              onValueChange={(v) => setValue('occasion', v, { shouldValidate: true, shouldDirty: true })}
              value={(OCCASIONS as readonly string[]).includes(occasion ?? '') ? occasion : 'Other'}
            >
              <SelectTrigger className='h-11 w-full rounded-xl border-border/80 bg-card px-4 font-sans text-foreground text-sm focus-visible:border-primary focus-visible:ring-primary/20'>
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

            <Input
              placeholder='Or type custom occasion (e.g. Graduation, Promotion...)'
              value={
                occasion && !['Birthday', 'Anniversary', 'Romance', 'Just Because'].includes(occasion) ? occasion : ''
              }
              onChange={(e) => setValue('occasion', e.target.value, { shouldValidate: true, shouldDirty: true })}
              className='mt-2 h-10 rounded-xl border-border bg-card px-3 font-sans text-foreground text-xs placeholder:text-muted-foreground'
            />

            {/* Reserved Error Slot (Prevents Layout Jump) */}
            <div className='min-h-5 pt-0.5'>
              <FormErrorMessage message={errors.occasion?.message} trigger={validationTrigger} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
