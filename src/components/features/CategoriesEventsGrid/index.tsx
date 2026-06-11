import { Button } from 'antd'
import { HomeEventCard } from '@/components/features/HomeEventCard'
import type { CategoriesEventsGridProps } from './types'
import styles from './styles.module.css'

export const CategoriesEventsGrid = ({
  events,
  canLoadMore,
  onLoadMore,
  emptyMessage,
  loadMoreLabel,
}: CategoriesEventsGridProps) => {
  const hasEvents = events.length > 0

  return (
    <section className={styles.section} aria-label="Category events">
      {hasEvents ? (
        <ul className={styles.grid}>
          {events.map((event) => (
            <li key={event.id}>
              <HomeEventCard event={event} size="compact" />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.emptyState} role="status">
          {emptyMessage}
        </p>
      )}

      {canLoadMore && (
        <div className={styles.loadMoreWrap}>
          <Button
            variant="outlined"
            color="primary"
            className={styles.loadMoreButton}
            onClick={onLoadMore}
          >
            {loadMoreLabel}
          </Button>
        </div>
      )}
    </section>
  )
}
