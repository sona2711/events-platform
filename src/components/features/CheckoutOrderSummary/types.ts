import type { CheckoutEvent, OrderTotals } from '@/pages/CheckoutPage/types'

export type CheckoutOrderSummaryProps = {
  event: CheckoutEvent
  totals: OrderTotals
  isFreeCheckout?: boolean
  isReady: boolean
  isSubmitting: boolean
  onPlaceOrder: () => void
}
