import type { CheckoutPaymentValues } from '@/pages/checkout/types'

export type CheckoutPaymentFormProps = {
  onValidChange: (values: CheckoutPaymentValues | null) => void
}
