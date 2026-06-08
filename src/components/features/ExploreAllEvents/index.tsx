import { lazy, Suspense, useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EventCard } from '@/components/features/EventCard'
import type { ListingEventInput } from '@/components/features/EventCard/types'
import { EXPLORE_EVENT_BY_ID, EXPLORE_EVENTS_CARD_DATA } from './consts'
import styles from './styles.module.css'

const TicketPaymentModal = lazy(() =>
  import('@/components/features/TicketPaymentModal').then((module) => ({
    default: module.TicketPaymentModal,
  })),
)

export function ExploreAllEvents() {
  const navigate = useNavigate()
  const [selectedEvent, setSelectedEvent] = useState<ListingEventInput | null>(null)

  const handleNavigate = useCallback(
    (eventId: string) => {
      navigate(`/event/${eventId}`)
    },
    [navigate],
  )

  const handleBook = useCallback((eventId: string) => {
    setSelectedEvent(EXPLORE_EVENT_BY_ID.get(eventId) ?? null)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null)
  }, [])

  return (
    <>
      <section className={styles.section} aria-labelledby="explore-events-title">
        <div className={styles.layout}>
          <h2 className={styles.title} id="explore-events-title">
            Explore All Events
          </h2>

          <div className={styles.grid}>
            {EXPLORE_EVENTS_CARD_DATA.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onBook={handleBook}
                onNavigate={handleNavigate}
              />
            ))}
          </div>

          <div className={styles.seeMoreWrapper}>
            <Link className={styles.seeMoreBtn} to="/explore-events">
              See More
            </Link>
          </div>
        </div>
      </section>

      {selectedEvent !== null ? (
        <Suspense fallback={null}>
          <TicketPaymentModal event={selectedEvent} open onClose={handleCloseModal} />
        </Suspense>
      ) : null}
    </>
  )
}
