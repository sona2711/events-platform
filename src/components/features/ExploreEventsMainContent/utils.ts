import { MAX_PRICE } from '@/components/EventFiltersSidebar/consts'
import type { FilterState } from '@/components/EventFiltersSidebar/types'
import type { ExploreEvent } from './types'

export const filterExploreEvents = (
  events: ExploreEvent[],
  filters: FilterState,
): ExploreEvent[] => {
  return events.filter((event) => {
    if (filters.date && event.dateIso !== filters.date) {
      return false
    }

    if (event.priceAmd < filters.priceMin) {
      return false
    }

    if (filters.priceMax < MAX_PRICE && event.priceAmd > filters.priceMax) {
      return false
    }

    if (filters.location && event.location !== filters.location) {
      return false
    }

    if (!filters.categories.includes('All') && !filters.categories.includes(event.category)) {
      return false
    }

    return true
  })
}
