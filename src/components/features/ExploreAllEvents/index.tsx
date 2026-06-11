import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EventCard } from '@/components/features/EventCard'
import { useBookEvent } from '@/hooks/useBookEvent'
import { EXPLORE_EVENTS_CARD_DATA } from './consts'
import styles from './styles.module.css'

export function ExploreAllEvents() {
  const navigate = useNavigate()
  const handleBook = useBookEvent()

  const handleNavigate = useCallback(
    (eventId: string) => {
      navigate(`/event/${eventId}`)
    },
    [navigate],
  )

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
    </>
  )
}
