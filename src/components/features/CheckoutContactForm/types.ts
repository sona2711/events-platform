import type { CheckoutContactValues } from '@/pages/CheckoutPage/types'

export type CheckoutContactFormProps = {
  initialValues: CheckoutContactValues
  onValidChange: (values: CheckoutContactValues | null) => void
}
