'use client'

import { Check, Crown, Globe, Video } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { AuthBannerPrompt } from '@/components/ui/auth-banner-prompt'
import { Card, CardContent } from '@/components/ui/card'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SectionDivider } from '@/components/ui/section-divider'
import { cn } from '@/lib/utils'
import { type PLAN_IDS, PLANS } from '../constants'
import type { OrderFormData } from '../schema'

export function StepCheckout({ validationTrigger }: { validationTrigger: number }) {
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext<OrderFormData>()

  const data = useWatch()
  const currentPlan = PLANS.find((p) => p.id === data.plan) || PLANS[0]
  const isMemoryMaker = data.plan === 'memory_maker'

  // Calculate dynamic total price
  const planPrice = currentPlan.price
  const voiceAddonPrice = !isMemoryMaker && data.hasVoiceCloning ? 5 : 0
  const videoAddonPrice = !isMemoryMaker && data.hasPhotoSlideshow ? 5 : 0
  const websiteAddonPrice = !isMemoryMaker && data.hasCustomWebsite ? 5 : 0
  const totalPrice = planPrice + voiceAddonPrice + videoAddonPrice + websiteAddonPrice

  return (
    <div className='space-y-6 font-sans'>
      <AuthBannerPrompt />

      <div>
        <h1 className='font-bold font-heading text-2xl text-foreground leading-snug sm:text-3xl'>
          Choose Plan & Add-ons
        </h1>
        <p className='mt-1 font-sans text-muted-foreground text-sm'>
          Select your subscription tier and optional A-la-carte add-ons.
        </p>
      </div>

      <div className='space-y-6'>
        {/* Custom Melody Warning Alert for Free Plan */}
        {data.sampleMelodyUrl && data.plan === 'single_gift' && (
          <div className='space-y-2 rounded-2xl border-2 border-amber-500/40 bg-amber-500/15 p-4 font-sans text-amber-900 text-xs shadow-sm'>
            <div className='flex items-center gap-2 font-bold font-heading text-amber-950 text-sm'>
              <Crown className='h-4 w-4 text-[#9A6A1E]' />
              <span>Sample Melody Will Not Be Processed on Free Tier</span>
            </div>
            <p className='text-amber-900/90 leading-relaxed'>
              You provided a reference melody link (
              <span className='font-mono font-semibold text-foreground'>{data.sampleMelodyUrl}</span>), but selected the
              Single Gift (Free) tier. Free tier songs use standard AI melodies.
            </p>
            <button
              type='button'
              onClick={() => setValue('plan', 'family_bond', { shouldValidate: true, shouldDirty: true })}
              className='flex items-center gap-1.5 rounded-lg bg-[#9A6A1E] px-3.5 py-1.5 font-bold font-heading text-white text-xs transition-colors hover:bg-[#835818]'
            >
              Switch to Family Bond ($9.99/mo) to Include Melody
            </button>
          </div>
        )}

        {/* 1. Subscription Tiers Selection (3 Tiers from Spec) */}
        <div className='space-y-3'>
          <Label className='font-heading font-semibold text-foreground text-sm'>Select Subscription Tier</Label>
          <div className='grid gap-4 sm:grid-cols-3'>
            {PLANS.map((plan) => {
              const isSelected = data.plan === plan.id
              return (
                <button
                  key={plan.id}
                  type='button'
                  onClick={() => {
                    setValue('plan', plan.id as (typeof PLAN_IDS)[number], { shouldValidate: true, shouldDirty: true })
                    if (plan.id === 'memory_maker') {
                      setValue('hasVoiceCloning', true, { shouldValidate: true, shouldDirty: true })
                      setValue('hasPhotoSlideshow', true, { shouldValidate: true, shouldDirty: true })
                      setValue('hasCustomWebsite', true, { shouldValidate: true, shouldDirty: true })
                    }
                  }}
                  className={cn(
                    'group relative flex flex-col justify-between rounded-2xl border-2 p-5 text-left transition-all active:scale-[0.98]',
                    isSelected
                      ? 'border-primary bg-card shadow-lg ring-2 ring-primary/20'
                      : 'border-border/60 bg-card/60 hover:border-border hover:bg-card'
                  )}
                >
                  {plan.allAddonsIncluded && (
                    <div className='absolute -top-3 right-3 flex items-center gap-1 rounded-full bg-linear-to-r from-amber-600 to-amber-500 px-3 py-1 font-bold font-heading text-[9px] text-white uppercase tracking-wider shadow-sm'>
                      <Crown className='h-3 w-3 fill-current' />
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <div className='mb-2 flex items-center justify-between'>
                      <span className='font-bold font-heading text-base text-foreground'>{plan.name}</span>
                    </div>
                    <div className='mb-3 flex items-baseline gap-1'>
                      <span className='font-bold font-heading text-2xl text-primary'>${plan.price}</span>
                      <span className='font-sans text-muted-foreground text-xs'>{plan.period}</span>
                    </div>
                    <p className='mb-4 font-sans text-muted-foreground text-xs leading-relaxed'>{plan.description}</p>
                  </div>

                  {/* Add-ons and Features List */}
                  <div className='space-y-2 border-border/40 border-t pt-3 font-sans text-foreground/90 text-xs'>
                    <div className='flex items-center gap-2 font-medium'>
                      <Check className='h-3.5 w-3.5 stroke-3 text-emerald-600' />
                      {plan.quota}
                    </div>
                    <div className='flex items-center gap-2 font-medium'>
                      <Check className='h-3.5 w-3.5 stroke-3 text-emerald-600' />
                      {plan.turnaround}
                    </div>
                    <div className='flex items-center gap-2 font-medium'>
                      <Check className='h-3.5 w-3.5 stroke-3 text-emerald-600' />
                      {plan.storage}
                    </div>

                    {plan.allAddonsIncluded ? (
                      <div className='space-y-1 border-amber-500/20 border-t pt-2 font-semibold text-[11px] text-amber-900'>
                        <div className='flex items-center gap-1.5'>
                          <Check className='h-3 w-3 stroke-3 text-amber-700' />
                          <span>FREE Real Voice Persona ($5 value)</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <Check className='h-3 w-3 stroke-3 text-amber-700' />
                          <span>FREE Photo Video Slideshow ($5 value)</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <Check className='h-3 w-3 stroke-3 text-amber-700' />
                          <span>FREE Custom Song Website ($5 value)</span>
                        </div>
                      </div>
                    ) : (
                      <div className='pt-1 font-medium text-[11px] text-muted-foreground'>
                        • Add-ons available for $5 each
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
          <FormErrorMessage message={errors.plan?.message as string} trigger={validationTrigger} />
        </div>

        {/* Section Divider for Optional Add-ons */}
        <SectionDivider label='Optional Add-ons & Upgrades' />

        {/* 2. A-La-Carte Add-ons List (Unified Styling matching Sample Melody Upload Card) */}
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <Label className='font-heading font-semibold text-base text-foreground'>
              A-La-Carte Add-ons & Customizations
            </Label>
            {isMemoryMaker && (
              <span className='flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 font-bold font-heading text-[10px] text-emerald-800 uppercase tracking-wider'>
                <Crown className='h-3 w-3 fill-current' /> Memory Maker: ALL Add-ons Unlocked
              </span>
            )}
          </div>

          <div className='grid gap-4 sm:grid-cols-3'>
            {/* Add-on 1: Custom Song Website & Digital Keepsake Page */}
            <button
              type='button'
              onClick={() => {
                if (!isMemoryMaker) {
                  setValue('hasCustomWebsite', !data.hasCustomWebsite, { shouldDirty: true })
                }
              }}
              className={cn(
                'relative w-full cursor-pointer select-none space-y-3 overflow-hidden rounded-2xl border p-4 text-left transition-all active:scale-[0.98]',
                isMemoryMaker || data.hasCustomWebsite
                  ? 'border-amber-500/40 bg-amber-500/10 shadow-sm ring-1 ring-amber-500/20'
                  : 'border-border/60 bg-card hover:bg-card/80'
              )}
            >
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-2'>
                  <Globe className='h-4 w-4 text-[#9A6A1E]' />
                  <h4 className='font-bold font-heading text-foreground text-xs'>Custom Song Website</h4>
                </div>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 font-bold font-heading text-[10px] uppercase',
                    isMemoryMaker || data.hasCustomWebsite
                      ? 'bg-amber-500/20 text-[#9A6A1E]'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {isMemoryMaker ? 'Unlocked ✓' : data.hasCustomWebsite ? 'Selected ✓' : '+$5.00 Add-on'}
                </span>
              </div>
              <p className='font-sans text-[11px] text-muted-foreground leading-relaxed'>
                Custom domain/link, interactive waveform player, personalized themes & written letter.
              </p>
              <div className='flex items-center gap-1.5 border-border/40 border-t pt-1 font-sans font-semibold text-primary text-xs'>
                <Check
                  className={cn(
                    'h-3.5 w-3.5',
                    isMemoryMaker || data.hasCustomWebsite ? 'stroke-3 text-emerald-600' : 'text-muted-foreground'
                  )}
                />
                <span>
                  {isMemoryMaker
                    ? 'Included Free with Memory Maker'
                    : data.hasCustomWebsite
                      ? 'Added to order (+$5.00)'
                      : 'Click to add (+$5.00)'}
                </span>
              </div>
            </button>

            {/* Add-on 2: Photo Video Slideshow & Spoken Voice Intro */}
            <button
              type='button'
              onClick={() => {
                if (!isMemoryMaker) {
                  setValue('hasPhotoSlideshow', !data.hasPhotoSlideshow, { shouldDirty: true })
                }
              }}
              className={cn(
                'relative w-full cursor-pointer select-none space-y-3 overflow-hidden rounded-2xl border p-4 text-left transition-all active:scale-[0.98]',
                isMemoryMaker || data.hasPhotoSlideshow
                  ? 'border-amber-500/40 bg-amber-500/10 shadow-sm ring-1 ring-amber-500/20'
                  : 'border-border/60 bg-card hover:bg-card/80'
              )}
            >
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-2'>
                  <Video className='h-4 w-4 text-[#9A6A1E]' />
                  <h4 className='font-bold font-heading text-foreground text-xs'>Video Slideshow & Intro</h4>
                </div>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 font-bold font-heading text-[10px] uppercase',
                    isMemoryMaker || data.hasPhotoSlideshow
                      ? 'bg-amber-500/20 text-[#9A6A1E]'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {isMemoryMaker ? 'Unlocked ✓' : data.hasPhotoSlideshow ? 'Selected ✓' : '+$5.00 Add-on'}
                </span>
              </div>
              <p className='font-sans text-[11px] text-muted-foreground leading-relaxed'>
                Aesthetic photo slideshow video with lyrics background + spoken voice intro message.
              </p>
              <div className='flex items-center gap-1.5 border-border/40 border-t pt-1 font-sans font-semibold text-primary text-xs'>
                <Check
                  className={cn(
                    'h-3.5 w-3.5',
                    isMemoryMaker || data.hasPhotoSlideshow ? 'stroke-3 text-emerald-600' : 'text-muted-foreground'
                  )}
                />
                <span>
                  {isMemoryMaker
                    ? 'Included Free with Memory Maker'
                    : data.hasPhotoSlideshow
                      ? 'Added to order (+$5.00)'
                      : 'Click to add (+$5.00)'}
                </span>
              </div>
            </button>

            {/* Add-on 3: Sample Melody / Audio Reference Upload */}
            <button
              type='button'
              onClick={() => {
                const newPlan = data.plan === 'single_gift' ? 'family_bond' : 'single_gift'
                setValue('plan', newPlan, { shouldDirty: true })
              }}
              className={cn(
                'relative w-full cursor-pointer select-none space-y-3 overflow-hidden rounded-2xl border p-4 text-left transition-all active:scale-[0.98]',
                data.plan !== 'single_gift'
                  ? 'border-amber-500/40 bg-amber-500/10 shadow-sm ring-1 ring-amber-500/20'
                  : 'border-border/60 bg-card hover:bg-card/80'
              )}
            >
              <div className='flex items-start justify-between'>
                <div className='flex items-center gap-2'>
                  <Crown className='h-4 w-4 text-[#9A6A1E]' />
                  <h4 className='font-bold font-heading text-foreground text-xs'>Sample Melody Upload</h4>
                </div>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-0.5 font-bold font-heading text-[10px] uppercase',
                    data.plan !== 'single_gift' ? 'bg-amber-500/20 text-[#9A6A1E]' : 'bg-muted text-muted-foreground'
                  )}
                >
                  {data.plan !== 'single_gift' ? 'Unlocked ✓' : 'Paid Tiers Only'}
                </span>
              </div>
              <p className='font-sans text-[11px] text-muted-foreground leading-relaxed'>
                Hum a melody or upload custom audio file reference for our Song Chef composition.
              </p>
              <div className='flex items-center gap-1.5 border-border/40 border-t pt-1 font-sans font-semibold text-primary text-xs'>
                <Check
                  className={cn(
                    'h-3.5 w-3.5',
                    data.plan !== 'single_gift' ? 'stroke-3 text-emerald-600' : 'text-muted-foreground'
                  )}
                />
                <span>{data.plan !== 'single_gift' ? 'Unlocked on Paid Tiers' : 'Requires Family Bond ($9.99+)'}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Section Divider */}
        <SectionDivider label='Order Summary & Checkout Details' />

        {/* 3. Dynamic Order Summary Card */}
        <Card className='overflow-hidden rounded-2xl border border-foreground/5 bg-card shadow-sm'>
          <div className='flex items-center justify-between border-primary/10 border-b bg-primary/10 px-5 py-3'>
            <h3 className='font-bold font-heading text-primary text-sm'>Order Summary & Total</h3>
            <span className='font-bold font-heading text-lg text-primary'>
              ${totalPrice.toFixed(2)} {currentPlan.price > 0 ? '/mo' : ''}
            </span>
          </div>
          <CardContent className='grid gap-4 p-5 font-sans text-xs sm:grid-cols-2'>
            <div>
              <p className='font-bold font-heading text-[10px] text-muted-foreground uppercase tracking-wider'>
                Recipient & Occasion
              </p>
              <p className='mt-0.5 font-semibold text-foreground text-sm'>
                {data.recipientName || 'Not specified'} ({data.recipient}) • {data.occasion}
              </p>
            </div>
            <div>
              <p className='font-bold font-heading text-[10px] text-muted-foreground uppercase tracking-wider'>
                Selected Plan
              </p>
              <p className='mt-0.5 font-heading font-semibold text-foreground text-sm'>
                {currentPlan.name} ({currentPlan.period})
              </p>
            </div>
            <div className='border-border/40 border-t pt-3 sm:col-span-2'>
              <p className='mb-1.5 font-bold font-heading text-[10px] text-muted-foreground uppercase tracking-wider'>
                Customizations & Add-ons Summary
              </p>
              <div className='flex flex-wrap gap-2 text-xs'>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-1 font-semibold',
                    data.plan !== 'single_gift'
                      ? 'bg-emerald-500/15 text-emerald-800'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  🎵 Sample Melody: {data.plan !== 'single_gift' ? 'Unlocked ✓' : 'Standard AI'}
                </span>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-1 font-semibold',
                    isMemoryMaker || data.hasVoiceCloning
                      ? 'bg-emerald-500/15 text-emerald-800'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  🎙️ Voice Persona: {isMemoryMaker ? 'FREE ✓' : data.hasVoiceCloning ? '+$5' : 'None'}
                </span>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-1 font-semibold',
                    isMemoryMaker || data.hasPhotoSlideshow
                      ? 'bg-emerald-500/15 text-emerald-800'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  🎬 Video Slideshow: {isMemoryMaker ? 'FREE ✓' : data.hasPhotoSlideshow ? '+$5' : 'None'}
                </span>
                <span
                  className={cn(
                    'rounded-full px-2.5 py-1 font-semibold',
                    isMemoryMaker || data.hasCustomWebsite
                      ? 'bg-emerald-500/15 text-emerald-800'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  🌐 Custom Website: {isMemoryMaker ? 'FREE ✓' : data.hasCustomWebsite ? '+$5' : 'None'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Buyer Info Fields */}
        <div className='grid gap-5 rounded-2xl border border-foreground/5 bg-card p-5 shadow-sm sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='buyerName' className='font-heading font-semibold text-foreground text-xs'>
              Your Full Name
            </Label>
            <Input
              id='buyerName'
              placeholder='Full name'
              className='h-11 rounded-xl border-border bg-background px-4 font-sans text-foreground text-xs placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20'
              {...register('buyerName')}
            />
            <FormErrorMessage message={errors.buyerName?.message as string} trigger={validationTrigger} />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='buyerEmail' className='font-heading font-semibold text-foreground text-xs'>
              Your Email Address
            </Label>
            <Input
              id='buyerEmail'
              type='email'
              placeholder='email@example.com'
              className='h-11 rounded-xl border-border bg-background px-4 font-sans text-foreground text-xs placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20'
              {...register('buyerEmail')}
            />
            <FormErrorMessage message={errors.buyerEmail?.message as string} trigger={validationTrigger} />
          </div>
        </div>
      </div>
    </div>
  )
}
