import { useState } from 'react'
import { CalendarOutlined, EnvironmentOutlined, HeartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
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
              <article key={event.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className={styles.image}
                    loading="lazy"
                  />
                  <span className={styles.category}>{event.category}</span>
                  <button
                    className={styles.heartBtn}
                    type="button"
                    aria-label={`Save ${event.title}`}
                  >
                    <HeartOutlined />
                  </button>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.location}>
                    <EnvironmentOutlined className={styles.metaIcon} />
                    {event.location}
                  </p>
                  <p className={styles.date}>
                    <CalendarOutlined className={styles.metaIcon} />
                    {event.date}
                  </p>
                  <div className={styles.footer}>
                    <span className={event.price === 'Free' ? styles.priceFree : styles.price}>
                      {event.price}
                    </span>
                    <button
                      className={styles.bookBtn}
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                    >
                      Book
                    </button>
                  </div>
                </div>
              </article>
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
