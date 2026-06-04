import type { EventCardData } from '@/components/features/EventCard/types'

export type EventCategory = 'Music' | 'Food & Drink' | 'Arts' | 'Nightlife' | 'Health' | 'Business'

export type CategoryEvent = EventCardData & {
  category: EventCategory
  priceAmd: number
  dateIso: string
}
