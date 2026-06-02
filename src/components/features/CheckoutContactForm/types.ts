import type { CheckoutContactValues } from '@/pages/checkout/types'

export type CheckoutContactFormProps = {
  initialValues: CheckoutContactValues
  onValidChange: (values: CheckoutContactValues | null) => void
}
