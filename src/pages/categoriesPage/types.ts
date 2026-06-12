import type { EventCardData } from '@/components/_shared/EventsCard/types'

export type EventCategory = 'Music' | 'Food & Drink' | 'Arts' | 'Nightlife' | 'Health' | 'Business'

export type CategoryEvent = EventCardData & {
  category: EventCategory
  priceAmd: number
  dateIso: string
}
