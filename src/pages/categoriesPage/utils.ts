import { MAX_PRICE } from '@/components/EventFiltersSidebar/consts'
import type { FilterState } from '@/components/EventFiltersSidebar/types'
import { CATEGORY_TAB_ITEMS } from '@/components/features/CategoryTabs/consts'
import type { CategoryEvent } from './types'

const labelToTabId = Object.fromEntries(
  CATEGORY_TAB_ITEMS.map((item) => [item.label, item.id]),
) as Record<string, string>

export const getActiveCategoryTabId = (filters: FilterState): string | null => {
  if (filters.categories.length !== 1) {
    return null
  }

  const [category] = filters.categories
  if (category === 'All') {
    return null
  }

  return labelToTabId[category] ?? null
}

export const getCategoryLabelFromTabId = (tabId: string): string | null => {
  const item = CATEGORY_TAB_ITEMS.find((tab) => tab.id === tabId)
  return item?.label ?? null
}

export const filterCategoryEvents = (
  events: CategoryEvent[],
  filters: FilterState,
): CategoryEvent[] => {
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
