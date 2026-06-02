import { Button } from 'antd'
import { EventFiltersSidebar } from '@/components/EventFiltersSidebar'
import { EventCard } from '@/components/features/EventCard'
import { EMPTY_STATE_MESSAGE, LOAD_MORE_BUTTON_LABEL } from './consts'
import type { ExploreEventsMainContentProps } from './types'
import styles from './styles.module.css'

export const ExploreEventsMainContent = ({
  events,
  canLoadMore,
  onLoadMore,
  filters,
  onFiltersChange,
  onApply,
  onReset,
}: ExploreEventsMainContentProps) => {
  const hasEvents = events.length > 0

  return (
    <section className={styles.content} aria-label="Explore events listings">
      <div className={styles.sidebarColumn}>
        <EventFiltersSidebar
          filters={filters}
          onFiltersChange={onFiltersChange}
          onApply={onApply}
          onReset={onReset}
        />
      </div>

      <div className={styles.results}>
        {hasEvents ? (
          <ul className={styles.grid}>
            {events.map((event) => (
              <li key={event.id}>
                <EventCard event={event} />
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyState} role="status">
            {EMPTY_STATE_MESSAGE}
          </p>
        )}

        {canLoadMore && (
          <div className={styles.loadMoreWrap}>
            <Button type="primary" className={styles.loadMoreButton} onClick={onLoadMore}>
              {LOAD_MORE_BUTTON_LABEL}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
