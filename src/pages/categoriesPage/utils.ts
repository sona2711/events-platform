import { CATEGORY_TAB_ITEMS } from '@/components/features/CategoryTabs/consts'

const labelToTabId = Object.fromEntries(
  CATEGORY_TAB_ITEMS.map((item) => [item.label, item.id]),
) as Record<string, string>

export const getCategoryLabelFromTabId = (tabId: string): string | null => {
  const item = CATEGORY_TAB_ITEMS.find((tab) => tab.id === tabId)
  return item?.label ?? null
}

export const getCategoryTabIdFromLabel = (label: string): string | null => {
  return labelToTabId[label] ?? null
}
