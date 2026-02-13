'use client'

import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme='light'
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast font-body group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-xl group-[.toaster]:rounded-2xl',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-full group-[.toast]:font-semibold',
          cancelButton:
            'group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground group-[.toast]:rounded-full'
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
