import { CATEGORY_TAB_ITEMS } from '@/components/features/CategoryTabs/consts'
import type { FilterState } from '@/components/EventFiltersSidebar/types'

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
