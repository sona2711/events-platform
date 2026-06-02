import { MAX_PRICE, MIN_PRICE } from '@/components/EventFiltersSidebar/consts'
import type { FilterState } from '@/components/EventFiltersSidebar/types'

export const DEFAULT_FILTERS: FilterState = {
  date: '',
  priceMin: MIN_PRICE,
  priceMax: MAX_PRICE,
  categories: ['All'],
  location: '',
}

export const INITIAL_VISIBLE_COUNT = 6
export const LOAD_MORE_BATCH = 6
