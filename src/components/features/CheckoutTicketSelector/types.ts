import type { TicketSelection, TicketTier } from '@/pages/CheckoutPage/types'

export type CheckoutTicketSelectorProps = {
  tiers: TicketTier[]
  selection: TicketSelection
  onQuantityChange: (tierId: string, quantity: number) => void
}
