'use client'

import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'

export enum ErrorAnimationType {
  SHAKING = 'shaking'
}

interface FormErrorMessageProps {
  message?: string
  animationType?: ErrorAnimationType
  trigger?: unknown
  className?: string
}

export function FormErrorMessage({
  message,
  animationType = ErrorAnimationType.SHAKING,
  trigger,
  className
}: FormErrorMessageProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          key={message}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className={cn('mt-1 font-medium text-destructive text-xs', className)}
        >
          <motion.span
            key={trigger ? String(trigger) : 'static'}
            style={{ display: 'block' }}
            animate={
              animationType === ErrorAnimationType.SHAKING
                ? {
                    x: [0, -1, 1, -1, 1, 0],
                    filter: ['blur(1px)', 'blur(0px)'],
                    transition: {
                      duration: 0.4,
                      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                      ease: 'easeInOut'
                    }
                  }
                : {}
            }
          >
            {message}
          </motion.span>
        </motion.p>
      )}
    </AnimatePresence>
  )
}
