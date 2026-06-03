import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EventFiltersSidebar } from '@/components/EventFiltersSidebar'
import type { FilterState } from '@/components/EventFiltersSidebar/types'
import { CategoryTabs } from '@/components/features/CategoryTabs'
import { CategoriesEventsGrid } from '@/components/features/CategoriesEventsGrid'
import { CategoriesPageHeader } from '@/components/features/CategoriesPageHeader'
import { DEFAULT_FILTERS, INITIAL_VISIBLE_COUNT, LOAD_MORE_BATCH } from './consts'
import { MOCK_CATEGORY_EVENTS } from './mockEvents'
import { filterCategoryEvents, getActiveCategoryTabId, getCategoryLabelFromTabId } from './utils'
import styles from './styles.module.css'

export const CategoriesPage = () => {
  const { t } = useTranslation('categories')
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)

  const filteredEvents = useMemo(
    () => filterCategoryEvents(MOCK_CATEGORY_EVENTS, appliedFilters),
    [appliedFilters],
  )

  const displayedEvents = useMemo(
    () => filteredEvents.slice(0, visibleCount),
    [filteredEvents, visibleCount],
  )

  const canLoadMore = visibleCount < filteredEvents.length

  const handleApply = useCallback(
    (override?: FilterState) => {
      setAppliedFilters(override ?? filters)
      setVisibleCount(INITIAL_VISIBLE_COUNT)
    },
    [filters],
  )

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    setAppliedFilters(DEFAULT_FILTERS)
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }, [])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((current) => Math.min(current + LOAD_MORE_BATCH, filteredEvents.length))
  }, [filteredEvents.length])

  const handleCategoryTabSelect = useCallback(
    (tabId: string) => {
      const label = getCategoryLabelFromTabId(tabId)
      if (!label) {
        return
      }

      const isAlreadyActive = filters.categories.length === 1 && filters.categories[0] === label
      const nextFilters: FilterState = {
        ...filters,
        categories: isAlreadyActive ? ['All'] : [label],
      }

      setFilters(nextFilters)
      handleApply(nextFilters)
    },
    [filters, handleApply],
  )

  return (
    <div className={styles.page}>
      <div className={styles.tabsSection}>
        <CategoryTabs
          activeCategoryId={getActiveCategoryTabId(filters)}
          onCategorySelect={handleCategoryTabSelect}
        />
      </div>
      <CategoriesPageHeader />
      <div className={styles.mainContent}>
        <aside className={styles.sidebarColumn}>
          <EventFiltersSidebar
            filters={filters}
            onFiltersChange={setFilters}
            onApply={handleApply}
            onReset={handleReset}
          />
        </aside>
        <div className={styles.resultsColumn}>
          <CategoriesEventsGrid
            events={displayedEvents}
            canLoadMore={canLoadMore}
            onLoadMore={handleLoadMore}
            emptyMessage={t('emptyState')}
            loadMoreLabel={t('loadMore')}
          />
        </div>
      </div>
    </div>
  )
}
