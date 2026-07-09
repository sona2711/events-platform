import { useCallback } from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { EventsCard } from '@/components/_shared/EventsCard'
import buttonStyles from '@/components/_shared/TemplateButtons/styles.module.css'
import { getEventDetailPath } from '@/hooks/useResponsiveEventBooking'
import type { CategoriesEventsGridProps } from './types'
import styles from './styles.module.css'

export const CategoriesEventsGrid = ({
  events,
  canLoadMore,
  onLoadMore,
  emptyMessage,
  loadMoreLabel,
}: CategoriesEventsGridProps) => {
  const navigate = useNavigate()

  const handleBook = useCallback(
    (eventId: string) => {
      navigate(getEventDetailPath(eventId))
    },
    [navigate],
  )

  const hasEvents = events.length > 0

  return (
    <section className={styles.section} aria-label="Category events">
      {hasEvents ? (
        <ul className={styles.grid}>
          {events.map((event) => (
            <li key={event.id}>
              <EventsCard event={event} size="compact" onBook={handleBook} />
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
            className={`${buttonStyles.secondaryButton} ${styles.loadMoreButton}`}
            onClick={onLoadMore}
          >
            {loadMoreLabel}
          </Button>
        </div>
      )}
    </section>
  )
}
