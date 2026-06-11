import { MAX_PRICE, MIN_PRICE } from '@/components/EventFiltersSidebar/consts'
import type { FilterState } from '@/components/EventFiltersSidebar/types'
import { CATEGORY_TAB_ITEMS } from '@/components/features/CategoryTabs/consts'
import type { PaymentEvent } from '@/components/features/TicketPaymentModal/types'
import type { CategoryEvent } from './types'

export const toCategoryPaymentEvent = (event: CategoryEvent): PaymentEvent => ({
  id: event.id,
  title: event.title,
  price: event.priceLabel,
})

const labelToTabId = Object.fromEntries(
  CATEGORY_TAB_ITEMS.map((item) => [item.label, item.id]),
) as Record<string, string>

export const getActiveCategoryTabId = (tabCategory: string | null): string | null => {
  if (!tabCategory) {
    return 'all'
  }

  return labelToTabId[tabCategory] ?? null
}

export const withTabCategoryFilter = (
  filters: FilterState,
  tabCategory: string | null,
): FilterState => {
  if (!tabCategory) {
    return filters
  }

  return { ...filters, categories: [tabCategory] }
}

export const getCategoryLabelFromTabId = (tabId: string): string | null => {
  const item = CATEGORY_TAB_ITEMS.find((tab) => tab.id === tabId)
  return item?.label ?? null
}

export type CatalogCategoryItem = {
  id: string
  label: string
  count: number
}

export const getCategoryEventCounts = (events: CategoryEvent[]): Record<string, number> => {
  const counts: Record<string, number> = {}

  for (const event of events) {
    counts[event.category] = (counts[event.category] ?? 0) + 1
  }

  return counts
}

export const getCatalogCategoryItems = (events: CategoryEvent[]): CatalogCategoryItem[] => {
  const counts = getCategoryEventCounts(events)

  return CATEGORY_TAB_ITEMS.filter((item) => item.id !== 'all').map((item) => ({
    id: item.id,
    label: item.label,
    count: counts[item.label] ?? 0,
  }))
}

export const getCategoryLabelFromSearchParam = (param: string | null): string | null => {
  if (!param) {
    return null
  }

  return getCategoryLabelFromTabId(param)
}

export const getActiveFilterCount = (filters: FilterState, tabCategory: string | null): number => {
  let count = 0

  if (filters.date) {
    count += 1
  }

  if (filters.priceMin !== MIN_PRICE || filters.priceMax !== MAX_PRICE) {
    count += 1
  }

  if (!filters.categories.includes('All')) {
    count += 1
  }

  if (filters.location) {
    count += 1
  }

  if (tabCategory) {
    count += 1
  }

  return count
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
