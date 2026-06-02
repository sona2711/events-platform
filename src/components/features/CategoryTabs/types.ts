import type { ReactNode } from 'react'

export type CategoryTabItem = {
  id: string
  label: string
  icon: ReactNode
}

export type CategoryTabsProps = {
  activeCategoryId: string | null
  onCategorySelect: (categoryId: string) => void
}
