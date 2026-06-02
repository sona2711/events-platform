import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CategoryTabs } from '@/components/features/CategoryTabs'
import { CategoriesEventsGrid } from '@/components/features/CategoriesEventsGrid'
import { CategoriesPageHeader } from '@/components/features/CategoriesPageHeader'
import { MOCK_EXPLORE_EVENTS } from '@/components/features/ExploreEventsMainContent/consts'
import type { EventCategory } from '@/components/features/ExploreEventsMainContent/types'
import { INITIAL_VISIBLE_COUNT, LOAD_MORE_BATCH } from './consts'
import { getCategoryLabelFromTabId } from './utils'
import styles from './styles.module.css'

export const CategoriesPage = () => {
  const { t } = useTranslation('categories')
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)

  const activeCategoryLabel = useMemo(
    () => (activeCategoryId ? getCategoryLabelFromTabId(activeCategoryId) : null),
    [activeCategoryId],
  )

  const filteredEvents = useMemo(() => {
    if (!activeCategoryLabel) {
      return MOCK_EXPLORE_EVENTS
    }

    return MOCK_EXPLORE_EVENTS.filter(
      (event) => event.category === (activeCategoryLabel as EventCategory),
    )
  }, [activeCategoryLabel])

  const displayedEvents = useMemo(
    () => filteredEvents.slice(0, visibleCount),
    [filteredEvents, visibleCount],
  )

  const canLoadMore = visibleCount < filteredEvents.length

  const handleCategorySelect = useCallback((tabId: string) => {
    setActiveCategoryId((current) => (current === tabId ? null : tabId))
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }, [])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((current) => Math.min(current + LOAD_MORE_BATCH, filteredEvents.length))
  }, [filteredEvents.length])

  return (
    <div className={styles.page}>
      <div className={styles.tabsSection}>
        <CategoryTabs activeCategoryId={activeCategoryId} onCategorySelect={handleCategorySelect} />
      </div>
      <CategoriesPageHeader />
      <CategoriesEventsGrid
        events={displayedEvents}
        canLoadMore={canLoadMore}
        onLoadMore={handleLoadMore}
        emptyMessage={t('emptyState')}
        loadMoreLabel={t('loadMore')}
      />
    </div>
  )
}
