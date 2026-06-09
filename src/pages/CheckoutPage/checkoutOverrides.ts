import feastImage from '@/assets/images/ArmenianGastroFest.webp'
import marathonImage from '@/assets/images/HikingToGarniTemple.webp'
import jazzFestImage from '@/assets/images/ClassicalNightAtOperaHouse.webp'
import wineTastingImage from '@/assets/images/wine-stain-detail.webp'
import type { CheckoutEvent } from './types'

/** Profile booking events with custom ticket tiers. All other IDs resolve from mock event data. */
export const CHECKOUT_EVENT_OVERRIDES: CheckoutEvent[] = [
  {
    id: 'event-jazz-fest',
    title: 'Yerevan Jazz Fest 2026',
    location: 'Cascade Complex',
    imageUrl: jazzFestImage,
    ticketTiers: [
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
  },
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
  {
    id: 'event-wine-tasting',
    title: 'Armenian Wine Tasting',
    location: 'Saryan Street',
    imageUrl: wineTastingImage,
    ticketTiers: [
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
  },
]

export const CHECKOUT_EVENT_OVERRIDES_BY_ID = new Map(
  CHECKOUT_EVENT_OVERRIDES.map((event) => [event.id, event]),
)
