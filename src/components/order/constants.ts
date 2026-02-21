import { Heart, Smile, User, Users } from 'lucide-react';
import { LemonSqueezyPlan } from '@/lib/lemonsqueezy/constants';

export const RECIPIENTS = ['Partner', 'Parent', 'Friend', 'Myself'] as const;
export const GENRES = [
  'Acoustic Pop',
  'Rock Ballad',
  'EDM',
  'R&B',
  'Country',
] as const;
export const TEMPOS = [
  'Upbeat & Happy',
  'Slow & Emotional',
  'Funny/Joke',
] as const;
export const VOCAL_PREFERENCES = ['Male', 'Female', 'Surprise Me'] as const;
export const OCCASIONS = [
  'Birthday',
  'Anniversary',
  'Romance',
  'Just Because',
  'Other',
] as const;

export const STAGES = [
  { id: 1, name: 'Basics' },
  { id: 2, name: 'Vibe' },
  { id: 3, name: 'Story' },
  { id: 4, name: 'Checkout' },
] as const;

export const RECIPIENT_OPTIONS = [
  { value: 'Partner' as const, icon: Heart, label: 'Partner' },
  { value: 'Parent' as const, icon: Users, label: 'Parent' },
  { value: 'Friend' as const, icon: User, label: 'Friend' },
  { value: 'Myself' as const, icon: Smile, label: 'Myself' },
] as const;

export const GENRE_OPTIONS = [
  { value: 'Acoustic Pop' as const, label: 'Acoustic Pop' },
  { value: 'Rock Ballad' as const, label: 'Rock Ballad' },
  { value: 'EDM' as const, label: 'EDM' },
  { value: 'R&B' as const, label: 'R&B' },
  { value: 'Country' as const, label: 'Country' },
] as const;

export const PLANS = [
  {
    id: LemonSqueezyPlan.STANDARD,
    name: 'Standard',
    price: 19.99,
    revisions: 3,
    description: 'Perfect for a heartfelt gift',
  },
  {
    id: LemonSqueezyPlan.PREMIUM,
    name: 'Premium',
    price: 29.99,
    revisions: 7,
    description: 'Priority queue & more revisions',
  },
] as const;

export const PLAN_IDS = ['standard', 'premium'] as const;
