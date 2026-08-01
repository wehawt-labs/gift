'use client'

import { Check, Crown, Gift, Globe, Mic, Sparkles, Video } from 'lucide-react'
import { useFormContext, useWatch } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import { FormErrorMessage } from '@/components/ui/form-error-message'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { ADDONS, PLANS } from '../constants'
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
      <div>
        <h1 className='font-bold font-heading text-2xl sm:text-3xl text-foreground leading-snug'>Choose Plan & Add-ons</h1>
        <p className='mt-1 text-sm text-muted-foreground font-sans'>Select your subscription tier and optional A-la-carte add-ons.</p>
      </div>

      <div className='space-y-6'>
        {/* Custom Melody Warning Alert for Free Plan */}
        {data.sampleMelodyUrl && data.plan === 'single_gift' && (
          <div className='p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 text-amber-900 font-sans text-xs space-y-2 shadow-sm'>
            <div className='flex items-center gap-2 font-bold font-heading text-sm text-amber-950'>
              <Crown className='h-4 w-4 text-[#9A6A1E]' />
              <span>Sample Melody Will Not Be Processed on Free Tier</span>
            </div>
            <p className='leading-relaxed text-amber-900/90'>
              You provided a reference melody link (<span className='font-mono font-semibold text-foreground'>{data.sampleMelodyUrl}</span>), but selected the Single Gift (Free) tier. Free tier songs use standard AI melodies.
            </p>
            <button
              type='button'
              onClick={() => setValue('plan', 'family_bond', { shouldValidate: true, shouldDirty: true })}
              className='px-3.5 py-1.5 rounded-lg bg-[#9A6A1E] text-white font-heading font-bold text-xs hover:bg-[#835818] transition-colors flex items-center gap-1.5'
            >
              Switch to Family Bond ($9.99/mo) to Include Melody
            </button>
          </div>
        )}

        {/* 1. Subscription Tiers Selection (3 Tiers from Spec) */}
        <div className='space-y-3'>
          <Label className='font-semibold font-heading text-sm text-foreground'>Select Subscription Tier</Label>
          <div className='grid gap-4 sm:grid-cols-3'>
            {PLANS.map((plan) => {
              const isSelected = data.plan === plan.id
              return (
                <button
                  key={plan.id}
                  type='button'
                  onClick={() => {
                    setValue('plan', plan.id as any, { shouldValidate: true, shouldDirty: true })
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
                      : 'border-border/60 bg-card/60 hover:bg-card hover:border-border'
                  )}
                >
                  {plan.allAddonsIncluded && (
                    <div className='absolute -top-3 right-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-3 py-1 font-bold text-[9px] text-white uppercase tracking-wider font-heading shadow-sm flex items-center gap-1'>
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
                      <span className='text-xs text-muted-foreground font-sans'>{plan.period}</span>
                    </div>
                    <p className='mb-4 text-muted-foreground text-xs font-sans leading-relaxed'>{plan.description}</p>
                  </div>

                  {/* Add-ons and Features List */}
                  <div className='space-y-2 border-t border-border/40 pt-3 text-xs font-sans text-foreground/90'>
                    <div className='flex items-center gap-2 font-medium'>
                      <Check className='h-3.5 w-3.5 text-emerald-600 stroke-[3]' />
                      {plan.quota}
                    </div>
                    <div className='flex items-center gap-2 font-medium'>
                      <Check className='h-3.5 w-3.5 text-emerald-600 stroke-[3]' />
                      {plan.turnaround}
                    </div>
                    <div className='flex items-center gap-2 font-medium'>
                      <Check className='h-3.5 w-3.5 text-emerald-600 stroke-[3]' />
                      {plan.storage}
                    </div>

                    {plan.allAddonsIncluded ? (
                      <div className='space-y-1 pt-2 border-t border-amber-500/20 text-[11px] font-semibold text-amber-900'>
                        <div className='flex items-center gap-1.5'>
                          <Check className='h-3 w-3 text-amber-700 stroke-[3]' />
                          <span>FREE Real Voice Persona ($5 value)</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <Check className='h-3 w-3 text-amber-700 stroke-[3]' />
                          <span>FREE Photo Video Slideshow ($5 value)</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <Check className='h-3 w-3 text-amber-700 stroke-[3]' />
                          <span>FREE Custom Song Website ($5 value)</span>
                        </div>
                      </div>
                    ) : (
                      <div className='pt-1 text-[11px] text-muted-foreground font-medium'>
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

        {/* 2. A-La-Carte Add-ons Grid ($5 Flat Rate per Add-on) */}
        <div className='bg-card rounded-2xl p-5 border border-foreground/5 space-y-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <Label className='font-semibold font-heading text-base text-foreground'>A-La-Carte Add-ons ($5 Each)</Label>
            {isMemoryMaker && (
              <span className='rounded-full bg-emerald-500/20 px-3 py-1 font-bold text-[10px] text-emerald-800 uppercase font-heading tracking-wider flex items-center gap-1'>
                <Crown className='h-3 w-3 fill-current' /> Memory Maker: ALL Add-ons Unlocked
              </span>
            )}
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            {/* Add-on 1: Custom Song Website & Digital Keepsake Page */}
            <button
              type='button'
              onClick={() => {
                if (!isMemoryMaker) {
                  setValue('hasCustomWebsite', !data.hasCustomWebsite, { shouldValidate: true, shouldDirty: true })
                }
              }}
              className={cn(
                'group relative flex flex-col justify-between rounded-xl border-2 p-4 text-left transition-all active:scale-[0.98]',
                isMemoryMaker || data.hasCustomWebsite
                  ? 'border-primary bg-background shadow-sm ring-1 ring-primary/20'
                  : 'border-border/60 bg-background/60 hover:bg-background'
              )}
            >
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <Globe className='h-5 w-5 text-primary' />
                  <span className='font-bold font-heading text-xs text-primary'>
                    {isMemoryMaker ? 'FREE' : '$5 / Custom Link'}
                  </span>
                </div>
                <h4 className='font-bold font-heading text-sm text-foreground mb-1'>Custom Website & Digital Keepsake Page</h4>
                <p className='text-[11px] text-muted-foreground font-sans leading-relaxed'>
                  Hosted custom share link with interactive waveform player, personalized themes & written letter.
                </p>
              </div>

              <div className='mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-foreground font-sans'>
                <span>{isMemoryMaker ? 'Included Free' : data.hasCustomWebsite ? 'Selected ✓' : 'Add +$5'}</span>
                <div className={cn('h-4 w-4 rounded border flex items-center justify-center', (isMemoryMaker || data.hasCustomWebsite) ? 'bg-primary text-white border-primary' : 'border-muted-foreground')}>
                  {(isMemoryMaker || data.hasCustomWebsite) && <Check className='h-3 w-3 stroke-[3]' />}
                </div>
              </div>
            </button>

            {/* Add-on 2: Photo Video Slideshow & Spoken Voice Intro */}
            <button
              type='button'
              onClick={() => {
                if (!isMemoryMaker) {
                  setValue('hasPhotoSlideshow', !data.hasPhotoSlideshow, { shouldValidate: true, shouldDirty: true })
                }
              }}
              className={cn(
                'group relative flex flex-col justify-between rounded-xl border-2 p-4 text-left transition-all active:scale-[0.98]',
                isMemoryMaker || data.hasPhotoSlideshow
                  ? 'border-primary bg-background shadow-sm ring-1 ring-primary/20'
                  : 'border-border/60 bg-background/60 hover:bg-background'
              )}
            >
              <div>
                <div className='flex items-center justify-between mb-2'>
                  <Video className='h-5 w-5 text-primary' />
                  <span className='font-bold font-heading text-xs text-primary'>
                    {isMemoryMaker ? 'FREE' : '$5 / Video'}
                  </span>
                </div>
                <h4 className='font-bold font-heading text-sm text-foreground mb-1'>Photo Video Slideshow & Voice Intro</h4>
                <p className='text-[11px] text-muted-foreground font-sans leading-relaxed'>
                  Aesthetic photo slideshow video with lyrics background + spoken voice intro message.
                </p>
              </div>

              <div className='mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-foreground font-sans'>
                <span>{isMemoryMaker ? 'Included Free' : data.hasPhotoSlideshow ? 'Selected ✓' : 'Add +$5'}</span>
                <div className={cn('h-4 w-4 rounded border flex items-center justify-center', (isMemoryMaker || data.hasPhotoSlideshow) ? 'bg-primary text-white border-primary' : 'border-muted-foreground')}>
                  {(isMemoryMaker || data.hasPhotoSlideshow) && <Check className='h-3 w-3 stroke-[3]' />}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* 3. Dynamic Order Summary Card */}
        <Card className='overflow-hidden rounded-2xl border border-foreground/5 bg-card shadow-sm'>
          <div className='bg-primary/10 px-5 py-3 border-b border-primary/10 flex items-center justify-between'>
            <h3 className='font-bold font-heading text-sm text-primary'>Order Summary & Total</h3>
            <span className='font-bold font-heading text-lg text-primary'>
              ${totalPrice.toFixed(2)} {currentPlan.price > 0 ? '/mo' : ''}
            </span>
          </div>
          <CardContent className='grid gap-4 p-5 sm:grid-cols-2 text-xs font-sans'>
            <div>
              <p className='font-bold text-[10px] text-muted-foreground uppercase tracking-wider font-heading'>Recipient & Occasion</p>
              <p className='font-semibold text-sm text-foreground mt-0.5'>
                {data.recipientName || 'Not specified'} ({data.recipient}) • {data.occasion}
              </p>
            </div>
            <div>
              <p className='font-bold text-[10px] text-muted-foreground uppercase tracking-wider font-heading'>Selected Plan</p>
              <p className='font-semibold text-sm text-foreground mt-0.5 font-heading'>
                {currentPlan.name} ({currentPlan.period})
              </p>
            </div>
            <div className='sm:col-span-2 border-t border-border/40 pt-3'>
              <p className='font-bold text-[10px] text-muted-foreground uppercase tracking-wider font-heading mb-1'>Add-ons Summary</p>
              <div className='flex flex-wrap gap-2 text-xs'>
                <span className={cn('px-2.5 py-1 rounded-full font-semibold', isMemoryMaker || data.hasVoiceCloning ? 'bg-emerald-500/15 text-emerald-800' : 'bg-muted text-muted-foreground')}>
                  🎙️ Voice Persona: {isMemoryMaker ? 'FREE ✓' : data.hasVoiceCloning ? '+$5' : 'None'}
                </span>
                <span className={cn('px-2.5 py-1 rounded-full font-semibold', isMemoryMaker || data.hasPhotoSlideshow ? 'bg-emerald-500/15 text-emerald-800' : 'bg-muted text-muted-foreground')}>
                  🎬 Video Slideshow: {isMemoryMaker ? 'FREE ✓' : data.hasPhotoSlideshow ? '+$5' : 'None'}
                </span>
                <span className={cn('px-2.5 py-1 rounded-full font-semibold', isMemoryMaker || data.hasCustomWebsite ? 'bg-emerald-500/15 text-emerald-800' : 'bg-muted text-muted-foreground')}>
                  🌐 Custom Website: {isMemoryMaker ? 'FREE ✓' : data.hasCustomWebsite ? '+$5' : 'None'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Buyer Info Fields */}
        <div className='bg-card rounded-2xl p-5 border border-foreground/5 grid gap-5 sm:grid-cols-2 shadow-sm'>
          <div className='space-y-2'>
            <Label htmlFor='buyerName' className='font-semibold font-heading text-foreground text-xs'>
              Your Full Name
            </Label>
            <Input
              id='buyerName'
              placeholder='Full name'
              className='h-11 rounded-xl border-border bg-background px-4 font-sans text-xs text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20'
              {...register('buyerName')}
            />
            <FormErrorMessage message={errors.buyerName?.message as string} trigger={validationTrigger} />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='buyerEmail' className='font-semibold font-heading text-foreground text-xs'>
              Your Email Address
            </Label>
            <Input
              id='buyerEmail'
              type='email'
              placeholder='email@example.com'
              className='h-11 rounded-xl border-border bg-background px-4 font-sans text-xs text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20'
              {...register('buyerEmail')}
            />
            <FormErrorMessage message={errors.buyerEmail?.message as string} trigger={validationTrigger} />
          </div>
        </div>
      </div>
    </div>
  )
}

