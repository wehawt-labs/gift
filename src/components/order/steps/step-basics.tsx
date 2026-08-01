'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SectionDivider } from '@/components/ui/section-divider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { OCCASIONS, RECIPIENT_OPTIONS } from '../constants'
import type { OrderFormData } from '../schema'

function RequiredBadge() {
  return (
    <span className='ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-2 py-0.5 font-heading text-[10px] font-bold text-primary tracking-wide shadow-2xs'>
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
        <h1 className='font-bold font-heading text-2xl sm:text-3xl text-foreground leading-snug'>Who is this for?</h1>
        <p className='mt-1 text-sm text-muted-foreground font-sans'>Select the recipient for your personalized song gift.</p>
      </div>

      <div className='space-y-6'>
        {/* Relationship Bento Grid */}
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <Label className='font-semibold font-heading text-sm text-foreground flex items-center'>
              Who is this song for?
              <RequiredBadge />
            </Label>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
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
                  'group flex flex-col items-center justify-center p-3.5 rounded-xl border transition-all active:scale-95',
                  recipient === opt.value
                    ? 'border-primary bg-card shadow-[0_2px_0_0_#c1502e] text-primary'
                    : 'border-border/60 bg-card/60 hover:bg-card hover:border-border text-muted-foreground'
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
                    'font-semibold text-xs font-sans',
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
              className='h-10 rounded-xl border-border bg-card px-3 font-sans text-xs text-foreground placeholder:text-muted-foreground'
            />
          </div>
          <div className='min-h-[20px]'>
            <FormErrorMessage message={errors.recipient?.message} trigger={validationTrigger} />
          </div>
        </div>

        {/* Section Divider */}
        <SectionDivider label='Recipient Name & Occasion' />

        {/* Symmetrical 2-Column Inputs Grid (Zero-Jump Error Containers) */}
        <div className='grid gap-4 sm:grid-cols-2 pt-1'>
          {/* Left Column: Recipient Name & Nickname/Alias */}
          <div className='space-y-2'>
            <Label htmlFor='recipientName' className='font-semibold font-heading text-sm text-foreground flex items-center'>
              What is their name?
              <RequiredBadge />
            </Label>
            <Input
              id='recipientName'
              placeholder='Full name, e.g. Sarah Jenkins'
              className={cn(
                'h-11 rounded-xl border-border/80 bg-card px-4 font-sans text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20',
                errors.recipientName && 'border-destructive focus-visible:ring-destructive/20'
              )}
              {...register('recipientName')}
            />

            <Input
              id='recipientNickname'
              placeholder='Nickname, title or alias (e.g. Honey, Boss, Big Bro...)'
              className='h-10 rounded-xl border-border bg-card px-3 font-sans text-xs text-foreground placeholder:text-muted-foreground mt-2'
              {...register('recipientNickname')}
            />

            {/* Reserved Error Slot (Prevents Layout Jump for Input 2) */}
            <div className='min-h-[20px] pt-0.5'>
              <FormErrorMessage message={errors.recipientName?.message} trigger={validationTrigger} />
            </div>
          </div>

          {/* Right Column: Occasion Select & Custom Occasion */}
          <div className='space-y-2'>
            <Label className='font-semibold font-heading text-sm text-foreground flex items-center'>
              What's the occasion?
              <RequiredBadge />
            </Label>
            <Select onValueChange={(v) => setValue('occasion', v, { shouldValidate: true, shouldDirty: true })} value={OCCASIONS.includes(occasion as any) ? occasion : 'Other'}>
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

            <Input
              placeholder='Or type custom occasion (e.g. Graduation, Promotion...)'
              value={occasion && !['Birthday', 'Anniversary', 'Romance', 'Just Because'].includes(occasion) ? occasion : ''}
              onChange={(e) => setValue('occasion', e.target.value, { shouldValidate: true, shouldDirty: true })}
              className='h-10 rounded-xl border-border bg-card px-3 font-sans text-xs text-foreground placeholder:text-muted-foreground mt-2'
            />

            {/* Reserved Error Slot (Prevents Layout Jump) */}
            <div className='min-h-[20px] pt-0.5'>
              <FormErrorMessage message={errors.occasion?.message} trigger={validationTrigger} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
