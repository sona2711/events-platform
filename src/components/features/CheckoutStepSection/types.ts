import type { ReactNode } from 'react'

export type CheckoutStepSectionProps = {
  stepNumber: number
  title: string
  ariaLabel: string
  children: ReactNode
}
