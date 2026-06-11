import type { EventDetail, EventDetailOverrides, EventRecord } from './eventDetailTypes'
import { resolveEventContactPhone } from './eventContacts'
import { resolveEventLocationDetails } from './eventLocationResolver'

const DEFAULT_EVENT_INFO: EventDetail['eventInfo'] = [
  { id: 'age', label: '21+ Event', icon: 'age' },
  { id: 'no-kids', label: 'No kids under 18', icon: 'noKids' },
  { id: 'coat-check', label: 'Coat check available', icon: 'coatCheck' },
]

const EVENT_DETAIL_OVERRIDES: Record<string, EventDetailOverrides> = {
  'event-jazz-fest': {
    organizer: 'Yerevan Jazz Sessions',
    description:
      "Experience an unforgettable evening of world-class jazz at the iconic Cascade stairs, one of Yerevan's most breathtaking architectural landmarks. Our Yerevan Jazz Night brings together a curated selection of exceptional local talent and renowned international performers for a night of musical excellence.",
    highlights: [
      'Complimentary welcome cocktail with every VIP ticket',
      'Curated vinyl selection available for purchase',
      'Doors open at 5:30 PM for social hour',
    ],
    ticket: {
      name: 'General Admission',
      priceAmd: 15000,
      serviceFeeAmd: 1200,
    },
    price: '15,000 AMD',
    eventInfo: DEFAULT_EVENT_INFO,
    tags: ['Jazz', 'Music', 'Nightlife', 'SummerSeries'],
  },
}

export const parsePriceAmd = (price: string): number => {
  if (price === 'Free') return 0

  const digits = price.replace(/[^\d]/g, '')
  return Number(digits) || 0
}

export const formatPriceAmd = (amountAmd: number): string => {
  if (amountAmd === 0) return 'Free'

  return `${amountAmd.toLocaleString('en-US')} AMD`
}

const buildDefaultLocationDetails = (
  eventId: string,
  location: string,
): EventDetail['locationDetails'] => resolveEventLocationDetails(eventId, location)

const buildDefaultTicket = (price: string): EventDetail['ticket'] => {
  const priceAmd = parsePriceAmd(price)

  return {
    name: priceAmd === 0 ? 'Free Entry' : 'General Admission',
    priceAmd,
    serviceFeeAmd: priceAmd === 0 ? 0 : Math.max(500, Math.round(priceAmd * 0.08)),
  }
}

const buildDefaultTags = (event: EventRecord): string[] => {
  const categoryTag = event.category.replace(/\s+/g, '')

  return [categoryTag]
}

export const enrichEventRecord = (event: EventRecord): EventDetail => {
  const overrides = EVENT_DETAIL_OVERRIDES[event.id] ?? {}
  const price = overrides.price ?? event.price
  const locationDetails =
    overrides.locationDetails ?? buildDefaultLocationDetails(event.id, event.location)
  const ticket = overrides.ticket ?? buildDefaultTicket(price)

  return {
    ...event,
    price,
    organizer: overrides.organizer ?? `${event.category} Collective`,
    description: overrides.description ?? event.description,
    highlights: overrides.highlights ?? [],
    locationDetails,
    ticket,
    eventInfo: overrides.eventInfo ?? DEFAULT_EVENT_INFO,
    tags: overrides.tags ?? buildDefaultTags(event),
    contactPhone: overrides.contactPhone ?? resolveEventContactPhone(event.id),
  }
}
