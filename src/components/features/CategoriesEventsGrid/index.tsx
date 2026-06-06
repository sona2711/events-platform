import { lazy, Suspense, useCallback, useState } from 'react'
import { Button } from 'antd'
import { EventCard } from '@/components/features/EventCard'
import type { PaymentEvent } from '@/components/features/TicketPaymentModal/types'
import { CATEGORY_EVENT_BY_ID } from '@/pages/categoriesPage/mockEvents'
import { toCategoryPaymentEvent } from '@/pages/categoriesPage/utils'
import type { CategoriesEventsGridProps } from './types'
import styles from './styles.module.css'

const TicketPaymentModal = lazy(() =>
  import('@/components/features/TicketPaymentModal').then((module) => ({
    default: module.TicketPaymentModal,
  })),
)

export const CategoriesEventsGrid = ({
  events,
  canLoadMore,
  onLoadMore,
  emptyMessage,
  loadMoreLabel,
}: CategoriesEventsGridProps) => {
  const [selectedEvent, setSelectedEvent] = useState<PaymentEvent | null>(null)
  const hasEvents = events.length > 0

  const handleBook = useCallback((eventId: string) => {
    const event = CATEGORY_EVENT_BY_ID.get(eventId)
    if (!event) {
      return
    }

    setSelectedEvent(toCategoryPaymentEvent(event))
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null)
  }, [])

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

      {selectedEvent !== null ? (
        <Suspense fallback={null}>
          <TicketPaymentModal event={selectedEvent} open onClose={handleCloseModal} />
        </Suspense>
      ) : null}
    </>
  )
}
