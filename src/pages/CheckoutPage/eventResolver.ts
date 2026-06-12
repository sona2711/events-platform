import type { EventRecord } from '@/mock-api/eventDetailTypes'
import { MOCK_EVENTS_BY_ID } from '@/mock-api/eventsData'
import {
  CHECKOUT_STANDALONE_EVENTS_BY_ID,
  CHECKOUT_TICKET_TIER_OVERRIDES,
} from './checkoutOverrides'
import type { CheckoutEvent, TicketTier } from './types'

const DEFAULT_TICKET_TIER_ID = 'general-admission'
const DEFAULT_TICKET_NAME = 'General Admission'
const DEFAULT_TICKET_DESCRIPTION = 'Standard entry ticket.'

export const parsePriceAmd = (price: string): number => {
  if (!price || price.toLowerCase() === 'free') {
    return 0
  }

  const digits = price.replace(/[^\d]/g, '')
  return Number(digits) || 0
}

const buildDefaultTicketTier = (priceAmd: number): TicketTier => ({
  id: DEFAULT_TICKET_TIER_ID,
  name: DEFAULT_TICKET_NAME,
  description: DEFAULT_TICKET_DESCRIPTION,
  priceAmd,
  maxQuantity: 10,
})

export const buildCheckoutEventFromMock = (event: EventRecord): CheckoutEvent => ({
  id: event.id,
  title: event.title,
  location: event.location,
  imageUrl: event.imageUrl,
  ticketTiers: [buildDefaultTicketTier(parsePriceAmd(event.price))],
})

export const getCheckoutEventById = (eventId: string): CheckoutEvent | undefined => {
  const mockEvent = MOCK_EVENTS_BY_ID.get(eventId)
  if (mockEvent) {
    const checkoutEvent = buildCheckoutEventFromMock(mockEvent)
    const ticketTiers = CHECKOUT_TICKET_TIER_OVERRIDES[eventId]

    return ticketTiers ? { ...checkoutEvent, ticketTiers } : checkoutEvent
  }

  return CHECKOUT_STANDALONE_EVENTS_BY_ID.get(eventId)
}
