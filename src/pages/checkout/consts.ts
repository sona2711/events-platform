import jazzNightImage from '@/assets/images/simon-english-48nerZQCHgo-unsplash.jpg'
import type { CheckoutEvent, TicketSelection, TicketTier } from './types'

export const CHECKOUT_EVENT_ID = 'jazz-night-yerevan'

export const CHECKOUT_EVENTS: CheckoutEvent[] = [
  {
    id: CHECKOUT_EVENT_ID,
    titleKey: 'event.jazzNight.title',
    locationKey: 'event.jazzNight.location',
    imageUrl: jazzNightImage,
  },
]

export const CHECKOUT_TICKET_TIERS: TicketTier[] = [
  {
    id: 'general-admission',
    nameKey: 'tickets.generalAdmission.name',
    descriptionKey: 'tickets.generalAdmission.description',
    priceAmd: 15_000,
    maxQuantity: 10,
  },
  {
    id: 'vip-backstage',
    nameKey: 'tickets.vipBackstage.name',
    descriptionKey: 'tickets.vipBackstage.description',
    priceAmd: 40_000,
    maxQuantity: 4,
  },
]

export const DEFAULT_TICKET_SELECTION: TicketSelection = {
  'general-admission': 2,
  'vip-backstage': 0,
}

export const MIN_TICKET_QUANTITY = 0

export const SERVICE_FEE_RATE = 2800 / 30_000
export const PROCESSING_FEE_AMD = 800

export const CHECKOUT_SUBMIT_DELAY_MS = 1200

export const getCheckoutEventById = (eventId: string): CheckoutEvent | undefined =>
  CHECKOUT_EVENTS.find((event) => event.id === eventId)
