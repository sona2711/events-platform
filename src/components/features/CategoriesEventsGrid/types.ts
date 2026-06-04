import type { CategoryEvent } from '@/pages/categoriesPage/types'

export type CategoriesEventsGridProps = {
  events: CategoryEvent[]
  canLoadMore: boolean
  onLoadMore: () => void
  emptyMessage: string
  loadMoreLabel: string
}
