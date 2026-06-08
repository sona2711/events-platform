import { useCallback } from 'react'
import { Button } from 'antd'
import { EventCard } from '@/components/features/EventCard'
import { useEventBookingModal } from '@/hooks/useEventBookingModal'
import { CATEGORY_EVENT_BY_ID } from '@/pages/categoriesPage/mockEvents'
import { toCategoryPaymentEvent } from '@/pages/categoriesPage/utils'
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
  const resolveEvent = useCallback((eventId: string) => {
    const event = CATEGORY_EVENT_BY_ID.get(eventId)
    return event ? toCategoryPaymentEvent(event) : null
  }, [])
  const { handleBook, bookingModal } = useEventBookingModal({ resolveEvent })

  return (
    <>
      <section className={styles.section} aria-label="Category events">
        {hasEvents ? (
          <ul className={styles.grid}>
            {events.map((event) => (
              <li key={event.id}>
                <EventCard event={event} onBook={handleBook} />
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

      {bookingModal}
    </>
  )
}
