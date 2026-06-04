import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EventCard } from '@/components/features/EventCard'
import { toEventCardData } from '@/components/features/EventCard/utils'
import { TicketPaymentModal } from '@/components/features/TicketPaymentModal'
import { EXPLORE_EVENTS } from './consts'
import styles from './styles.module.css'
import type { ExploreEventItem } from './consts'

export function ExploreAllEvents() {
  const [selectedEvent, setSelectedEvent] = useState<ExploreEventItem | null>(null)

  return (
    <>
      <section className={styles.section} aria-labelledby="explore-events-title">
        <div className={styles.layout}>
          <h2 className={styles.title} id="explore-events-title">
            Explore All Events
          </h2>

          <div className={styles.grid}>
            {EXPLORE_EVENTS.map((event) => (
              <EventCard
                key={event.id}
                event={toEventCardData(event)}
                onBook={() => setSelectedEvent(event)}
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

      <TicketPaymentModal
        event={selectedEvent}
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  )
}
