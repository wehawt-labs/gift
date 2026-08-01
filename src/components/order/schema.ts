import { z } from 'zod'
import { PLAN_IDS, VOCAL_PREFERENCES } from './constants'

export const orderSchema = z.object({
  // Plan Selection (often chosen first or at checkout)
  plan: z.enum(PLAN_IDS, {
    error: 'Please select a plan'
  }),

  // Step 1: Basics
  recipient: z.string().min(1, 'Please select or type who this song is for'),
  recipientName: z.string().min(1, "Recipient's name is required"),
  recipientNickname: z.string().optional(),
  occasion: z.string().min(1, 'Please select or type an occasion'),

  // Step 2: Vibe & Voice Persona
  genre: z.string().min(1, 'Please select or type a genre'),
  tempo: z.string().min(1, 'Please select or type a tempo/mood'),
  vocalPreference: z.enum(VOCAL_PREFERENCES, {
    error: 'Please select a vocal preference'
  }),
  sampleMelodyUrl: z.string().optional(),
  selectedVoicePersona: z.string().optional(),

  // Step 3: Story & Lyrics
  memory: z.string().optional(),
  jokes: z.string().optional(),
  coreMessage: z.string().optional(),
  customLyrics: z.string().optional(),
  isFullLyrics: z.boolean().optional(),

  // Step 4: Final Info & Addons
  buyerName: z.string().min(1, 'Your name is required'),
  buyerEmail: z.string().email('Invalid email address'),
  hasVoiceCloning: z.boolean().optional(),
  hasPhotoSlideshow: z.boolean().optional(),
  hasCustomWebsite: z.boolean().optional()
})

export type OrderFormData = z.infer<typeof orderSchema>
