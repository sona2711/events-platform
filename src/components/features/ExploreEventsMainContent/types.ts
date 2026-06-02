import type { EventCardData } from '@/components/features/EventCard/types'
import type { FilterState } from '@/components/EventFiltersSidebar/types'

export type EventCategory = 'Music' | 'Food & Drink' | 'Arts' | 'Nightlife' | 'Health' | 'Business'

export type ExploreEvent = EventCardData & {
  category: EventCategory
  priceAmd: number
  dateIso: string
}

export type ExploreEventsMainContentProps = {
  events: ExploreEvent[]
  canLoadMore: boolean
  onLoadMore: () => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onApply: () => void
  onReset: () => void
}
