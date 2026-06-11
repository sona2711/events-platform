import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { EventCard } from '@/components/features/EventCard'
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
  const hasEvents = events.length > 0
  const handleBook = useCallback(
    (eventId: string) => {
      navigate(`/checkout/${eventId}`)
    },
    [navigate],
  )

  const handleNavigate = useCallback(
    (eventId: string) => {
      navigate(`/event/${eventId}`)
    },
    [navigate],
  )

  return (
    <>
      <section className={styles.section} aria-label="Category events">
        {hasEvents ? (
          <ul className={styles.grid}>
            {events.map((event) => (
              <li key={event.id}>
                <EventCard event={event} onBook={handleBook} onNavigate={handleNavigate} />
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
    </>
  )
}
