import { z } from 'zod'
import {
  RECIPIENTS,
  GENRES,
  TEMPOS,
  VOCAL_PREFERENCES,
  PLAN_IDS
} from './constants'

export const orderSchema = z.object({
  // Plan Selection (often chosen first or at checkout)
  plan: z.enum(PLAN_IDS, {
    error: 'Please select a plan'
  }),

  // Step 1: Basics
  recipient: z.enum(RECIPIENTS, {
    error: 'Please select who this song is for'
  }),
  recipientName: z.string().min(1, "Recipient's name is required"),
  occasion: z.string().min(1, 'Please select an occasion'),

  // Step 2: Vibe
  genre: z.enum(GENRES, {
    error: 'Please select a genre'
  }),
  tempo: z.enum(TEMPOS, {
    error: 'Please select a tempo/mood'
  }),
  vocalPreference: z.enum(VOCAL_PREFERENCES, {
    error: 'Please select a vocal preference'
  }),

  // Step 3: Story
  memory: z
    .string()
    .min(20, 'Please share a bit more about your favorite memory'),
  jokes: z.string().optional(),
  coreMessage: z.string().min(10, 'What is the main thing you want to say?'),

  // Step 4: Final Info
  buyerName: z.string().min(1, 'Your name is required'),
  buyerEmail: z.string().email('Invalid email address')
})

export type OrderFormData = z.infer<typeof orderSchema>
