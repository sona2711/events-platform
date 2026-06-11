import { CHECKOUT_TICKET_TIER_OVERRIDES } from './checkoutOverrides'
import { getCheckoutEventById } from './eventResolver'
import type { TicketSelection, TicketTier } from './types'

export { getCheckoutEventById }

export const EMPTY_TICKET_TIERS: TicketTier[] = []

export const MIN_TICKET_QUANTITY = 0

export const SERVICE_FEE_RATE = 2800 / 30_000
export const PROCESSING_FEE_AMD = 800

export const CHECKOUT_SUBMIT_DELAY_MS = 1200

export const createDefaultTicketSelection = (
  tiers: TicketTier[],
  defaultFirstTierQuantity = 1,
): TicketSelection =>
  tiers.reduce<TicketSelection>((selection, tier, index) => {
    selection[tier.id] = index === 0 ? defaultFirstTierQuantity : 0
    return selection
  }, {})

export const createInitialTicketSelection = (
  tiers: TicketTier[],
  ticketQuantity?: number,
): TicketSelection => {
  if (tiers.length === 0) {
    return {}
  }

  if (typeof ticketQuantity === 'number' && ticketQuantity > 0) {
    const quantity = Math.min(Math.max(1, ticketQuantity), tiers[0].maxQuantity)

    return tiers.reduce<TicketSelection>((selection, tier, index) => {
      selection[tier.id] = index === 0 ? quantity : 0
      return selection
    }, {})
  }

  return createDefaultTicketSelection(tiers)
}

/** @deprecated Use event-specific tiers from `getCheckoutEventById`. Kept for unit tests. */
export const CHECKOUT_TICKET_TIERS: TicketTier[] = CHECKOUT_TICKET_TIER_OVERRIDES['event-jazz-fest']

/** @deprecated Use `createDefaultTicketSelection` with event tiers. Kept for unit tests. */
export const DEFAULT_TICKET_SELECTION: TicketSelection = createDefaultTicketSelection(
  CHECKOUT_TICKET_TIERS,
  2,
)
