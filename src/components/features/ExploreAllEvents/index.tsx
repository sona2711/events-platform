import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { EventCard } from '@/components/features/EventCard'
import { useEventBookingModal } from '@/hooks/useEventBookingModal'
import { EXPLORE_EVENT_BY_ID, EXPLORE_EVENTS_CARD_DATA } from './consts'
import styles from './styles.module.css'

export function ExploreAllEvents() {
  const resolveEvent = useCallback((eventId: string) => EXPLORE_EVENT_BY_ID.get(eventId), [])
  const { handleBook, bookingModal } = useEventBookingModal({ resolveEvent })

  return (
    <>
      <section className={styles.section} aria-labelledby="explore-events-title">
        <div className={styles.layout}>
          <h2 className={styles.title} id="explore-events-title">
            Explore All Events
          </h2>

          <div className={styles.grid}>
            {EXPLORE_EVENTS_CARD_DATA.map((event) => (
              <EventCard key={event.id} event={event} onBook={handleBook} />
            ))}
          </div>

          <div className={styles.seeMoreWrapper}>
            <Link className={styles.seeMoreBtn} to="/explore-events">
              See More
            </Link>
          </div>
        </div>
      </section>

      {bookingModal}
    </>
  )
}
