import type { ExploreEvent } from '@/components/features/ExploreEventsMainContent/types'

export type CategoriesEventsGridProps = {
  events: ExploreEvent[]
  canLoadMore: boolean
  onLoadMore: () => void
  emptyMessage: string
  loadMoreLabel: string
}
