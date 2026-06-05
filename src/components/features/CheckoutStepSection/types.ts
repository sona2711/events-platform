import type { ReactNode } from 'react'
import type { CheckoutStepStatus } from '@/pages/CheckoutPage/types'

export type CheckoutStepSectionProps = {
  stepNumber: number
  title: string
  ariaLabel: string
  status: CheckoutStepStatus
  children: ReactNode
}
