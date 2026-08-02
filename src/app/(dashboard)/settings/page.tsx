'use client'

import { Calendar, Crown, ExternalLink, Mic, ShieldCheck, Sparkles, Trash2, Upload, User } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSession } from '@/lib/auth-client'

export interface VoicePersona {
  id: string
  name: string
  audioSampleName: string
  status: 'Trained & Ready' | 'Processing'
  createdAt: string
}

export default function SettingsPage() {
  const { data: session } = useSession()

  const [name, setName] = useState(session?.user?.name || 'Alex Turner')
  const [email] = useState(session?.user?.email || 'alex.turner@gmail.com')

  const [voicePersonas, setVoicePersonas] = useState<VoicePersona[]>([
    {
      id: 'vp_1',
      name: "Sarah's Singing Voice",
      audioSampleName: 'sarah_warm_vocal.mp3',
      status: 'Trained & Ready',
      createdAt: '2026-07-28'
    },
    {
      id: 'vp_2',
      name: 'Alex Soft Acoustic Voice',
      audioSampleName: 'alex_voice_intro.wav',
      status: 'Trained & Ready',
      createdAt: '2026-07-30'
    }
  ])

  const [newPersonaName, setNewPersonaName] = useState('')

  const handleSaveProfile = () => {
    toast.success('Account Details Saved', {
      description: 'Your profile settings have been updated successfully.'
    })
  }

  const handleUploadNewVoice = () => {
    if (!newPersonaName.trim()) {
      toast.error('Voice Name Required', {
        description: 'Please enter a name for your Voice Profile (e.g. "My Warm Acoustic Voice").'
      })
      return
    }

    const newPersona: VoicePersona = {
      id: `vp_${Date.now()}`,
      name: newPersonaName.trim(),
      audioSampleName: 'custom_voice_sample.mp3',
      status: 'Trained & Ready',
      createdAt: new Date().toISOString().split('T')[0]
    }

    setVoicePersonas((prev) => [...prev, newPersona])
    setNewPersonaName('')
    toast.success('Voice Profile Created', {
      description: `Saved "${newPersona.name}" to your profile studio!`
    })
  }

  const handleDeletePersona = (id: string) => {
    setVoicePersonas((prev) => prev.filter((p) => p.id !== id))
    toast.info('Voice Profile Removed')
  }

  return (
    <div className='mx-auto max-w-5xl space-y-8 font-sans'>
      {/* Header Section */}
      <div className='border-border/40 border-b pb-5'>
        <h1 className='font-bold font-heading text-2xl text-foreground leading-snug sm:text-3xl'>Account Settings</h1>
        <p className='mt-1 font-sans text-muted-foreground text-sm'>
          Manage your subscription plan, billing details, and familiar voice profiles.
        </p>
      </div>

      {/* 2-Column Main Content Grid (Stitch Screen eacb7d6d829f4719b2d198b438ea4c7a) */}
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
        {/* Section 1: Active Subscription Plan (lg:col-span-5) */}
        <div className='space-y-6 lg:col-span-5'>
          <Card className='relative space-y-5 overflow-hidden rounded-3xl border border-amber-500/30 bg-card p-6 shadow-md'>
            {/* Ambient Background Blur Glow */}
            <div className='pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-amber-500/10 blur-2xl' />

            <div className='relative z-10 flex items-start justify-between'>
              <div>
                <h3 className='flex items-center gap-2 font-bold font-heading text-foreground text-lg'>
                  <Crown className='h-5 w-5 text-[#9A6A1E]' />
                  Artisan Plan
                </h3>
                <p className='mt-0.5 text-muted-foreground text-xs'>Premium digital gift box subscription</p>
              </div>
              <Badge className='border-emerald-500/30 bg-emerald-500/15 font-bold text-[10px] text-emerald-800 uppercase'>
                Active
              </Badge>
            </div>

            <div className='relative z-10 space-y-4 border-border/40 border-t pt-4 font-sans text-xs'>
              <div className='flex items-end justify-between border-border/30 border-b pb-3'>
                <div>
                  <p className='font-heading font-semibold text-[11px] text-muted-foreground'>Billing Cycle</p>
                  <p className='mt-0.5 font-bold text-foreground'>Monthly</p>
                </div>
                <div className='text-right'>
                  <p className='font-bold font-heading text-foreground text-lg'>
                    $29.99<span className='font-normal text-muted-foreground text-xs'>/mo</span>
                  </p>
                </div>
              </div>

              <div>
                <p className='mb-1 font-heading font-semibold text-[11px] text-muted-foreground'>Next Renewal</p>
                <p className='flex items-center gap-1.5 font-medium text-foreground'>
                  <Calendar className='h-4 w-4 text-muted-foreground' />
                  October 24, 2026
                </p>
              </div>

              {/* Quota Tracker Bar */}
              <div className='space-y-1.5 pt-2'>
                <div className='flex justify-between font-heading font-semibold text-[11px]'>
                  <span className='text-muted-foreground'>Songs Generated</span>
                  <span className='font-bold text-primary'>3 / 5 Songs</span>
                </div>
                <div className='h-2 w-full overflow-hidden rounded-full bg-border/60'>
                  <div className='h-full w-[60%] rounded-full bg-primary' />
                </div>
              </div>
            </div>

            <div className='relative z-10 space-y-2 pt-2'>
              <Button
                type='button'
                onClick={() => toast.info('Billing Portal', { description: 'Opening LemonSqueezy customer portal...' })}
                className='h-10 w-full gap-2 rounded-xl bg-primary font-bold font-heading text-primary-foreground text-xs shadow-sm'
              >
                <span>Manage Billing</span>
                <ExternalLink className='h-3.5 w-3.5' />
              </Button>
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  toast.warning('Cancel Subscription', {
                    description: 'Your plan will remain active until October 24.'
                  })
                }
                className='h-9 w-full rounded-xl border-border bg-background font-heading font-semibold text-muted-foreground text-xs hover:text-foreground'
              >
                Cancel Subscription
              </Button>
            </div>
          </Card>

          {/* Account Profile Form */}
          <Card className='space-y-4 rounded-3xl border border-border/80 bg-card p-6 shadow-md'>
            <div className='flex items-center gap-2 border-border/40 border-b pb-3'>
              <User className='h-4 w-4 text-primary' />
              <h2 className='font-bold font-heading text-base text-foreground'>Account Information</h2>
            </div>

            <div className='space-y-3.5 font-sans text-xs'>
              <div className='space-y-1.5'>
                <Label className='font-heading font-semibold text-foreground text-xs'>Full Name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='h-10 rounded-xl border-border bg-background px-3 text-foreground text-xs'
                />
              </div>

              <div className='space-y-1.5'>
                <Label className='font-heading font-semibold text-foreground text-xs'>Email Address</Label>
                <Input
                  value={email}
                  disabled
                  className='h-10 cursor-not-allowed rounded-xl border-border bg-background/60 px-3 text-muted-foreground text-xs'
                />
                <p className='flex items-center gap-1 text-[10px] text-muted-foreground'>
                  <ShieldCheck className='h-3 w-3 text-emerald-600' /> Verified via Google OAuth 2.0
                </p>
              </div>

              <Button
                type='button'
                onClick={handleSaveProfile}
                className='mt-1 h-9 w-full rounded-xl bg-primary font-bold font-heading text-primary-foreground text-xs shadow-xs'
              >
                Save Changes
              </Button>
            </div>
          </Card>
        </div>

        {/* Section 2: Familiar Voices Studio (lg:col-span-7) */}
        <div className='space-y-6 lg:col-span-7'>
          <Card className='space-y-5 rounded-3xl border border-border/80 bg-card p-6 shadow-md'>
            <div className='flex items-center justify-between border-border/40 border-b pb-4'>
              <div>
                <h3 className='flex items-center gap-2 font-bold font-heading text-base text-foreground'>
                  <Mic className='h-5 w-5 text-primary' />
                  Familiar Voices Studio
                </h3>
                <p className='mt-0.5 text-muted-foreground text-xs'>Profiles used for custom singing song vocals.</p>
              </div>
              <Badge className='bg-primary/10 font-bold font-heading text-[10px] text-primary uppercase'>
                {voicePersonas.length} / 3 Profiles
              </Badge>
            </div>

            {/* Voice Profiles List */}
            <div className='space-y-3'>
              {voicePersonas.map((vp) => (
                <div
                  key={vp.id}
                  className='group flex items-center justify-between rounded-2xl border border-border/60 bg-background p-4 shadow-2xs transition-colors hover:border-primary/40'
                >
                  <div className='flex items-center gap-3.5'>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-bold text-lg text-primary'>
                      🎙️
                    </div>
                    <div>
                      <h4 className='font-bold font-heading text-foreground text-xs'>{vp.name}</h4>
                      <p className='mt-0.5 flex items-center gap-1.5 font-sans text-[11px] text-muted-foreground'>
                        <span className='h-2 w-2 rounded-full bg-emerald-600' />
                        <span className='font-semibold text-emerald-800'>{vp.status}</span>
                        <span>• {vp.createdAt}</span>
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-1'>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      onClick={() => handleDeletePersona(vp.id)}
                      className='h-8 w-8 rounded-lg p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive'
                      title='Delete Profile'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Create New Voice Profile Box */}
            <div className='space-y-3.5 rounded-2xl border-2 border-primary/30 border-dashed bg-primary/5 p-5 pt-4'>
              <h4 className='flex items-center gap-1.5 font-bold font-heading text-foreground text-xs'>
                <Sparkles className='h-4 w-4 text-primary' />
                Add New Voice Profile
              </h4>

              <div className='space-y-3 font-sans text-xs'>
                <Input
                  placeholder='Name your voice profile (e.g. "Sarah Soft Vocal")...'
                  value={newPersonaName}
                  onChange={(e) => setNewPersonaName(e.target.value)}
                  className='h-10 rounded-xl border-border bg-background px-3 text-xs'
                />

                <div className='flex flex-col items-center gap-3 pt-1 sm:flex-row'>
                  <Button
                    type='button'
                    onClick={handleUploadNewVoice}
                    className='h-10 w-full gap-2 rounded-xl bg-primary px-5 font-bold font-heading text-primary-foreground text-xs shadow-xs sm:w-auto'
                  >
                    <Upload className='h-4 w-4' />
                    Upload Audio Sample (.mp3, .wav)
                  </Button>

                  <span className='font-sans text-[11px] text-muted-foreground'>Recommended 10–30s spoken intro</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
