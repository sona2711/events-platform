import type { TicketSelection, TicketTier } from './types'
import { CHECKOUT_EVENT_OVERRIDES } from './checkoutOverrides'

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

/** @deprecated Use event-specific tiers from `getCheckoutEventById`. Kept for unit tests. */
export const CHECKOUT_TICKET_TIERS: TicketTier[] = CHECKOUT_EVENT_OVERRIDES[0].ticketTiers

/** @deprecated Use `createDefaultTicketSelection` with event tiers. Kept for unit tests. */
export const DEFAULT_TICKET_SELECTION: TicketSelection = createDefaultTicketSelection(
  CHECKOUT_TICKET_TIERS,
  2,
)
