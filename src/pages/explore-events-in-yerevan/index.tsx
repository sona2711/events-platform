import { useCallback, useMemo, useState } from 'react'
import { CategoryTabs } from '@/components/features/CategoryTabs'
import { ExploreEventsMainContent } from '@/components/features/ExploreEventsMainContent'
import { MOCK_EXPLORE_EVENTS } from '@/components/features/ExploreEventsMainContent/consts'
import { filterExploreEvents } from '@/components/features/ExploreEventsMainContent/utils'
import { ExploreEventsPageHeader } from '@/components/features/ExploreEventsPageHeader'
import type { FilterState } from '@/components/EventFiltersSidebar/types'
import { DEFAULT_FILTERS, INITIAL_VISIBLE_COUNT, LOAD_MORE_BATCH } from './consts'
import { getActiveCategoryTabId, getCategoryLabelFromTabId } from './utils'
import styles from './styles.module.css'

export const ExploreEventsPage = () => {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)

  const filteredEvents = useMemo(
    () => filterExploreEvents(MOCK_EXPLORE_EVENTS, appliedFilters),
    [appliedFilters],
  )

  const displayedEvents = useMemo(
    () => filteredEvents.slice(0, visibleCount),
    [filteredEvents, visibleCount],
  )

  const canLoadMore = visibleCount < filteredEvents.length

  const handleApply = useCallback(() => {
    setAppliedFilters(filters)
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }, [filters])

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setAppliedFilters(DEFAULT_FILTERS)
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }, [])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((current) => Math.min(current + LOAD_MORE_BATCH, filteredEvents.length))
  }, [filteredEvents.length])

  const handleCategoryTabSelect = useCallback((tabId: string) => {
    const label = getCategoryLabelFromTabId(tabId)
    if (!label) {
      return
    }

    setFilters((current) => {
      const isAlreadyActive = current.categories.length === 1 && current.categories[0] === label
      return {
        ...current,
        categories: isAlreadyActive ? ['All'] : [label],
      }
    })
  }, [])

  return (
    <div className={styles.page}>
      <CategoryTabs
        activeCategoryId={getActiveCategoryTabId(filters)}
        onCategorySelect={handleCategoryTabSelect}
      />
      <ExploreEventsPageHeader />
      <ExploreEventsMainContent
        events={displayedEvents}
        canLoadMore={canLoadMore}
        onLoadMore={handleLoadMore}
        filters={filters}
        onFiltersChange={setFilters}
        onApply={handleApply}
        onReset={handleReset}
      />
    </div>
  )
}
