import type { TicketSelection, TicketTier } from '@/pages/checkout/types'

export type CheckoutTicketSelectorProps = {
  tiers: TicketTier[]
  selection: TicketSelection
  onQuantityChange: (tierId: string, quantity: number) => void
}
