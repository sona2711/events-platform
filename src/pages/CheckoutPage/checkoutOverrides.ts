import feastImage from '@/assets/images/ArmenianGastroFest.webp'
import marathonImage from '@/assets/images/HikingToGarniTemple.webp'
import type { CheckoutEvent, TicketTier } from './types'

/** Custom ticket tiers for mock events that exist on detail pages. Display fields come from mock data. */
export const CHECKOUT_TICKET_TIER_OVERRIDES: Record<string, TicketTier[]> = {
  'event-jazz-fest': [
    {
      id: 'general-admission',
      name: 'General Admission',
      description: 'Includes standard entry and floor access.',
      priceAmd: 15_000,
      maxQuantity: 10,
    },
    {
      id: 'vip-backstage',
      name: 'VIP Backstage Pass',
      description: 'Meet the band + 2 complimentary drinks.',
      priceAmd: 40_000,
      maxQuantity: 4,
    },
  ],
  'event-wine-tasting': [
    {
      id: 'tasting-pass',
      name: 'Tasting Pass',
      description: 'Sample 6 regional wines with guided notes.',
      priceAmd: 10_000,
      maxQuantity: 6,
    },
    {
      id: 'sommelier',
      name: 'Sommelier Experience',
      description: 'Private tasting session with a certified sommelier.',
      priceAmd: 18_000,
      maxQuantity: 2,
    },
  ],
}

/** Profile-only booking events with no detail page in mock data. */
export const CHECKOUT_STANDALONE_EVENTS: CheckoutEvent[] = [
  {
    id: 'event-feast',
    title: 'Traditional Armenian Feast',
    location: 'Republic Square',
    imageUrl: feastImage,
    ticketTiers: [
      {
        id: 'standard-seat',
        name: 'Standard Seat',
        description: 'Reserved seat with full dinner service.',
        priceAmd: 12_000,
        maxQuantity: 8,
      },
      {
        id: 'premium-table',
        name: 'Premium Table',
        description: 'Front-row table for up to 4 guests.',
        priceAmd: 25_000,
        maxQuantity: 4,
      },
    ],
  },
  {
    id: 'event-marathon',
    title: 'Yerevan Marathon 2026',
    location: 'Northern Avenue',
    imageUrl: marathonImage,
    ticketTiers: [
      {
        id: 'runner',
        name: 'Runner Entry',
        description: 'Official race bib, timing chip, and finisher medal.',
        priceAmd: 8_000,
        maxQuantity: 2,
      },
      {
        id: 'spectator',
        name: 'Spectator Pass',
        description: 'Access to viewing areas along the course.',
        priceAmd: 5_000,
        maxQuantity: 6,
      },
    ],
  },
]

export const CHECKOUT_STANDALONE_EVENTS_BY_ID = new Map(
  CHECKOUT_STANDALONE_EVENTS.map((event) => [event.id, event]),
)

/** @deprecated Use CHECKOUT_STANDALONE_EVENTS_BY_ID — kept for profile event resolution fallback. */
export const CHECKOUT_EVENT_OVERRIDES_BY_ID = CHECKOUT_STANDALONE_EVENTS_BY_ID
