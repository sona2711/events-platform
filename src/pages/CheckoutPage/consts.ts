import feastImage from '@/assets/images/ArmenianGastroFest.JPG'
import marathonImage from '@/assets/images/HikingToGarniTemple.jpg'
import jazzFestImage from '@/assets/images/ClassicalNightAtOperaHouse.jpg'
import wineTastingImage from '@/assets/images/wine-stain-detail.jpg'
import type { CheckoutEvent, TicketSelection, TicketTier } from './types'

export const EMPTY_TICKET_TIERS: TicketTier[] = []

export const CHECKOUT_EVENTS: CheckoutEvent[] = [
  {
    id: 'event-jazz-fest',
    titleKey: 'event.jazzFest.title',
    locationKey: 'event.jazzFest.location',
    imageUrl: jazzFestImage,
    ticketTiers: [
      {
        id: 'general-admission',
        nameKey: 'tickets.jazzFest.generalAdmission.name',
        descriptionKey: 'tickets.jazzFest.generalAdmission.description',
        priceAmd: 15_000,
        maxQuantity: 10,
      },
      {
        id: 'vip-backstage',
        nameKey: 'tickets.jazzFest.vipBackstage.name',
        descriptionKey: 'tickets.jazzFest.vipBackstage.description',
        priceAmd: 40_000,
        maxQuantity: 4,
      },
    ],
  },
  {
    id: 'event-feast',
    titleKey: 'event.feast.title',
    locationKey: 'event.feast.location',
    imageUrl: feastImage,
    ticketTiers: [
      {
        id: 'standard-seat',
        nameKey: 'tickets.feast.standardSeat.name',
        descriptionKey: 'tickets.feast.standardSeat.description',
        priceAmd: 12_000,
        maxQuantity: 8,
      },
      {
        id: 'premium-table',
        nameKey: 'tickets.feast.premiumTable.name',
        descriptionKey: 'tickets.feast.premiumTable.description',
        priceAmd: 25_000,
        maxQuantity: 4,
      },
    ],
  },
  {
    id: 'event-marathon',
    titleKey: 'event.marathon.title',
    locationKey: 'event.marathon.location',
    imageUrl: marathonImage,
    ticketTiers: [
      {
        id: 'runner',
        nameKey: 'tickets.marathon.runner.name',
        descriptionKey: 'tickets.marathon.runner.description',
        priceAmd: 8_000,
        maxQuantity: 2,
      },
      {
        id: 'spectator',
        nameKey: 'tickets.marathon.spectator.name',
        descriptionKey: 'tickets.marathon.spectator.description',
        priceAmd: 5_000,
        maxQuantity: 6,
      },
    ],
  },
  {
    id: 'event-wine-tasting',
    titleKey: 'event.wineTasting.title',
    locationKey: 'event.wineTasting.location',
    imageUrl: wineTastingImage,
    ticketTiers: [
      {
        id: 'tasting-pass',
        nameKey: 'tickets.wineTasting.tastingPass.name',
        descriptionKey: 'tickets.wineTasting.tastingPass.description',
        priceAmd: 10_000,
        maxQuantity: 6,
      },
      {
        id: 'sommelier',
        nameKey: 'tickets.wineTasting.sommelier.name',
        descriptionKey: 'tickets.wineTasting.sommelier.description',
        priceAmd: 18_000,
        maxQuantity: 2,
      },
    ],
  },
]

export const MIN_TICKET_QUANTITY = 0

export const SERVICE_FEE_RATE = 2800 / 30_000
export const PROCESSING_FEE_AMD = 800

export const CHECKOUT_SUBMIT_DELAY_MS = 1200

export const getCheckoutEventById = (eventId: string): CheckoutEvent | undefined =>
  CHECKOUT_EVENTS.find((event) => event.id === eventId)

export const createDefaultTicketSelection = (
  tiers: TicketTier[],
  defaultFirstTierQuantity = 1,
): TicketSelection =>
  tiers.reduce<TicketSelection>((selection, tier, index) => {
    selection[tier.id] = index === 0 ? defaultFirstTierQuantity : 0
    return selection
  }, {})

/** @deprecated Use event-specific tiers from `getCheckoutEventById`. Kept for unit tests. */
export const CHECKOUT_TICKET_TIERS: TicketTier[] = CHECKOUT_EVENTS[0].ticketTiers

/** @deprecated Use `createDefaultTicketSelection` with event tiers. Kept for unit tests. */
export const DEFAULT_TICKET_SELECTION: TicketSelection = createDefaultTicketSelection(
  CHECKOUT_TICKET_TIERS,
  2,
)
