import type { CheckoutPaymentValues } from '@/pages/CheckoutPage/types'

export type CheckoutPaymentFormProps = {
  onValidChange: (values: CheckoutPaymentValues | null) => void
}
