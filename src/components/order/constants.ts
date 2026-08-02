import { Heart, Smile, User, Users } from 'lucide-react'

export const RECIPIENTS = ['Partner', 'Parent', 'Friend', 'Myself'] as const
export const GENRES = ['Acoustic Pop', 'Rock Ballad', 'EDM', 'R&B', 'Country', 'Lo-Fi Chill', 'Hip-Hop / Rap', 'Jazz & Blues', 'Cinematic', 'Other'] as const
export const TEMPOS = ['Warm & Cozy', 'Joyful & Upbeat', 'Tear-Jerker', 'Playful', 'Romantic', 'Calming', 'Nostalgic', 'Cinematic / Epic', 'Other'] as const

export const MOOD_OPTIONS = [
  { value: 'Warm & Cozy', emoji: '☕', label: 'Warm & Cozy' },
  { value: 'Joyful & Upbeat', emoji: '☀️', label: 'Joyful & Upbeat' },
  { value: 'Tear-Jerker', emoji: '😭', label: 'Tear-Jerker' },
  { value: 'Playful', emoji: '🤪', label: 'Playful' },
  { value: 'Romantic', emoji: '❤️', label: 'Romantic' },
  { value: 'Calming', emoji: '😌', label: 'Calming' },
  { value: 'Nostalgic', emoji: '🍂', label: 'Nostalgic' },
  { value: 'Cinematic / Epic', emoji: '🎬', label: 'Cinematic / Epic' },
  { value: 'Other', emoji: '✏️', label: 'Other' }
] as const

export const VOCAL_PREFERENCES = ['Male', 'Female', 'Surprise Me', 'Custom Voice (Premium)'] as const
export const OCCASIONS = ['Birthday', 'Anniversary', 'Romance', 'Just Because', 'Other'] as const

export const STAGES = [
  { id: 1, name: 'Basics' },
  { id: 2, name: 'Vibe' },
  { id: 3, name: 'Story' },
  { id: 4, name: 'Checkout' }
] as const

export const RECIPIENT_OPTIONS = [
  { value: 'Partner' as const, icon: Heart, label: 'Partner' },
  { value: 'Parent' as const, icon: Users, label: 'Parent' },
  { value: 'Friend' as const, icon: User, label: 'Friend' },
  { value: 'Myself' as const, icon: Smile, label: 'Myself' }
] as const

export const GENRE_OPTIONS = [
  { value: 'Acoustic Pop' as const, label: 'Acoustic Pop' },
  { value: 'Rock Ballad' as const, label: 'Rock Ballad' },
  { value: 'EDM' as const, label: 'EDM' },
  { value: 'R&B' as const, label: 'R&B' },
  { value: 'Country' as const, label: 'Country' },
  { value: 'Lo-Fi Chill' as const, label: 'Lo-Fi Chill' },
  { value: 'Hip-Hop / Rap' as const, label: 'Hip-Hop / Rap' },
  { value: 'Jazz & Blues' as const, label: 'Jazz & Blues' },
  { value: 'Other' as const, label: 'Other ✏️' }
] as const

export const PLANS = [
  {
    id: 'single_gift',
    name: 'Single Gift',
    price: 0,
    period: 'Free',
    quota: '1 Song / Week',
    turnaround: 'Standard Queue',
    storage: '7-Day Cloud Storage',
    rollover: 'No Rollover',
    description: 'Try it out with a weekly free song gift',
    allAddonsIncluded: false
  },
  {
    id: 'family_bond',
    name: 'Family Bond',
    price: 9.99,
    period: '/ month',
    quota: '3 Songs / Week (12/mo)',
    turnaround: 'Quick Priority (1-2 Days)',
    storage: 'Permanent Storage',
    rollover: 'Max 2 Weeks Rollover (Cap 6)',
    description: 'Perfect for sharing memories with family',
    allAddonsIncluded: false
  },
  {
    id: 'memory_maker',
    name: 'Memory Maker',
    price: 29.99,
    period: '/ month',
    quota: '10 Songs / Week (40/mo)',
    turnaround: 'Same-Day Priority (Fastest)',
    storage: 'Permanent Storage',
    rollover: 'Max 2 Weeks Rollover (Cap 20)',
    description: 'Ultimate value: Unlimited Voice, Video & Websites',
    allAddonsIncluded: true,
    badge: 'ALL ADD-ONS UNLOCKED'
  }
] as const

export const PLAN_IDS = ['single_gift', 'family_bond', 'memory_maker'] as const

export const ADDONS = [
  {
    id: 'voice_cloning',
    name: 'Real Voice Cloning Persona',
    price: 5,
    unit: '/ Persona Slot',
    description: 'Spoken intro + singing voice persona. Unlimited for Memory Maker.',
    icon: 'mic'
  },
  {
    id: 'photo_slideshow',
    name: 'Photo Video Slideshow',
    price: 5,
    unit: '/ Video',
    description: 'Aesthetic photo slideshow video with lyrics background. Unlimited for Memory Maker.',
    icon: 'video'
  },
  {
    id: 'custom_website',
    name: 'Custom Song Website',
    price: 5,
    unit: '/ Custom Link',
    description: 'Custom domain/link, themes, cover photos & letters. Unlimited for Memory Maker.',
    icon: 'globe'
  }
] as const
