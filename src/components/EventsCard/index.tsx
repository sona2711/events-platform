import { useState } from 'react'
import styles from './styles.module.css'
import { CalendarOutlined, EnvironmentOutlined, HeartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { TicketPaymentModal } from '@/components/features/TicketPaymentModal'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import {
  EVENTS,
  EVENTS_NEXT_BUTTON_CLASS,
  EVENTS_NEXT_BUTTON_SELECTOR,
  EVENTS_PREV_BUTTON_CLASS,
  EVENTS_PREV_BUTTON_SELECTOR,
  SLIDER_BREAKPOINTS,
} from './consts'
import type { EventCardItem } from './types'

export function EventsGrid() {
  const [selectedEvent, setSelectedEvent] = useState<EventCardItem | null>(null)

  return (
    <>
      <section className={styles.container} aria-labelledby="events-grid-title">
        <div className={styles.layout}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.title} id="events-grid-title">
              Upcoming Events in Yerevan
            </h2>

            <div className={styles.navigationButtons} aria-label="Events carousel navigation">
              <button
                className={EVENTS_PREV_BUTTON_CLASS}
                type="button"
                aria-label="Previous events"
              />
              <button className={EVENTS_NEXT_BUTTON_CLASS} type="button" aria-label="Next events" />
            </div>
          </div>

          <p className={styles.description}>
            The most anticipated gatherings happening this month and beyond
          </p>

          <Swiper
            modules={[Navigation]}
            breakpoints={SLIDER_BREAKPOINTS}
            navigation={{
              prevEl: EVENTS_PREV_BUTTON_SELECTOR,
              nextEl: EVENTS_NEXT_BUTTON_SELECTOR,
            }}
            className={styles.mySwiper}
          >
            {EVENTS.map((event) => (
              <SwiperSlide key={event.id}>
                <article className={styles.card}>
                  <div className={styles.imageWrapper}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className={styles.image}
                      loading="lazy"
                    />
                    <span className={styles.category}>{event.category}</span>
                    <button
                      className={styles.heartIcon}
                      type="button"
                      aria-label={`Save ${event.title}`}
                    >
                      <HeartOutlined />
                    </button>
                  </div>

                  <div className={styles.content}>
                    <h3 className={styles.eventTitle}>{event.title}</h3>
                    <p className={styles.location}>
                      <EnvironmentOutlined className={styles.metaIcon} />
                      {event.location}
                    </p>

                    <div className={styles.footer}>
                      <span className={styles.date}>
                        <CalendarOutlined className={styles.metaIcon} />
                        {event.date}
                      </span>
                    </div>

                    <div className={styles.actionSection}>
                      <span className={styles.price}>{event.price}</span>
                      <Button
                        type="primary"
                        className={styles.bookButton}
                        onClick={() => setSelectedEvent(event)}
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
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
