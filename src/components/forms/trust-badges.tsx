import { CheckCircle, Lock, Star } from 'lucide-react'

const badges = [
  { icon: CheckCircle, label: '100% Custom Made' },
  { icon: Star, label: '5-Star Reviews' },
  { icon: Lock, label: 'Secure Payment' }
]

export function TrustBadges() {
  return (
    <div className='flex flex-wrap items-center justify-center gap-8'>
      {badges.map((badge) => (
        <div
          key={badge.label}
          className='flex items-center gap-2 text-muted-foreground'
        >
          <badge.icon className='h-5 w-5 text-accent' />
          <span className='font-medium text-sm'>{badge.label}</span>
        </div>
      ))}
    </div>
  )
}
