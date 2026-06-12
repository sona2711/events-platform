import { FilterOutlined } from '@ant-design/icons'
import { Button, Drawer } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { EventFiltersSidebar } from '@/components/EventFiltersSidebar'
import type { FilterState } from '@/components/EventFiltersSidebar/types'
import { CategoryTabs } from '@/components/features/CategoryTabs'
import { CategoriesEventsGrid } from '@/components/features/CategoriesEventsGrid'
import { CategoriesPageHeader } from '@/components/features/CategoriesPageHeader'
import buttonStyles from '@/components/_shared/TemplateButtons/styles.module.css'
import { DEFAULT_FILTERS, INITIAL_VISIBLE_COUNT, LOAD_MORE_BATCH } from './consts'
import { MOCK_CATEGORY_EVENTS } from './mockEvents'
import {
  filterCategoryEvents,
  getActiveCategoryTabId,
  getActiveFilterCount,
  getCategoryLabelFromSearchParam,
  getCategoryLabelFromTabId,
  withTabCategoryFilter,
} from './utils'
import styles from './styles.module.css'

export const CategoriesPage = () => {
  const { t } = useTranslation('categories')
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(DEFAULT_FILTERS)
  const [activeTabCategory, setActiveTabCategory] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const effectiveFilters = useMemo(
    () => withTabCategoryFilter(appliedFilters, activeTabCategory),
    [appliedFilters, activeTabCategory],
  )

  const filteredEvents = useMemo(
    () => filterCategoryEvents(MOCK_CATEGORY_EVENTS, effectiveFilters),
    [effectiveFilters],
  )

  const displayedEvents = useMemo(
    () => filteredEvents.slice(0, visibleCount),
    [filteredEvents, visibleCount],
  )

  const activeFilterCount = useMemo(
    () => getActiveFilterCount(appliedFilters, activeTabCategory),
    [appliedFilters, activeTabCategory],
  )

  const canLoadMore = visibleCount < filteredEvents.length

  useEffect(() => {
    const label = getCategoryLabelFromSearchParam(searchParams.get('category'))
    setActiveTabCategory(label)
    setVisibleCount(INITIAL_VISIBLE_COUNT)
  }, [searchParams])

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
    setSearchParams((current) => {
      const next = new URLSearchParams(current)
      next.delete('category')
      return next
    })
  }, [setSearchParams])

  const handleMobileApply = useCallback(
    (override?: FilterState) => {
      handleApply(override)
      setFiltersOpen(false)
    },
    [handleApply],
  )

  const handleMobileReset = useCallback(() => {
    handleReset()
    setFiltersOpen(false)
  }, [handleReset])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((current) => Math.min(current + LOAD_MORE_BATCH, filteredEvents.length))
  }, [filteredEvents.length])

  const handleCategoryTabSelect = useCallback(
    (tabId: string) => {
      if (tabId === 'all') {
        setSearchParams((current) => {
          const next = new URLSearchParams(current)
          next.delete('category')
          return next
        })
        return
      }

      if (!getCategoryLabelFromTabId(tabId)) {
        return
      }

      const currentParam = searchParams.get('category')
      setSearchParams((current) => {
        const next = new URLSearchParams(current)

        if (currentParam === tabId) {
          next.delete('category')
        } else {
          next.set('category', tabId)
        }

        return next
      })
    },
    [searchParams, setSearchParams],
  )

  return (
    <div className={styles.page}>
      <div className={styles.tabsSection}>
        <CategoryTabs
          activeCategoryId={getActiveCategoryTabId(activeTabCategory)}
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
          <div className={styles.mobileFilterBar}>
            <Button
              variant="outlined"
              color="primary"
              className={`${buttonStyles.secondaryButton} ${buttonStyles.compactButton} ${styles.mobileFilterButton}`}
              icon={<FilterOutlined aria-hidden="true" />}
              aria-label={t('filtersAriaLabel')}
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen(true)}
            >
              {t('filters')}
              {activeFilterCount > 0 && (
                <span
                  className={styles.activeFilterCount}
                  aria-label={t('activeFilters', { count: activeFilterCount })}
                >
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>
          <CategoriesEventsGrid
            events={displayedEvents}
            canLoadMore={canLoadMore}
            onLoadMore={handleLoadMore}
            emptyMessage={t('emptyState')}
            loadMoreLabel={t('loadMore')}
          />
        </div>
      </div>

      <Drawer
        title={t('filters')}
        placement="bottom"
        height="auto"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        rootClassName={styles.filtersDrawerRoot}
        className={styles.filtersDrawer}
        destroyOnClose={false}
      >
        <EventFiltersSidebar
          filters={filters}
          onFiltersChange={setFilters}
          onApply={handleMobileApply}
          onReset={handleMobileReset}
          className={styles.drawerSidebar}
        />
      </Drawer>
    </div>
  )
}
