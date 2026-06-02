import type { CheckoutEvent, OrderTotals } from '@/pages/checkout/types'

export type CheckoutOrderSummaryProps = {
  event: CheckoutEvent
  totals: OrderTotals
  isReady: boolean
  isSubmitting: boolean
  onPlaceOrder: () => void
}
