import { useRef, useState } from 'react'
import styles from './styles.module.css'
import { CalendarOutlined, EnvironmentOutlined, HeartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { TicketPaymentModal } from '@/components/features/TicketPaymentModal'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import {
  EVENTS,
  EVENTS_NEXT_BUTTON_CLASS,
  EVENTS_PREV_BUTTON_CLASS,
  SLIDER_BREAKPOINTS,
  SWIPER_NO_SWIPING_CLASS,
} from './consts'
import type { EventCardItem } from './types'

export function EventsGrid() {
  const [selectedEvent, setSelectedEvent] = useState<EventCardItem | null>(null)
  const navigationPrevRef = useRef<HTMLButtonElement>(null)
  const navigationNextRef = useRef<HTMLButtonElement>(null)

  const bindCarouselNavigation = (swiper: SwiperInstance) => {
    const navigation = swiper.params.navigation

    if (!navigation || typeof navigation === 'boolean') {
      return
    }

    navigation.prevEl = navigationPrevRef.current
    navigation.nextEl = navigationNextRef.current

    if (swiper.navigation) {
      swiper.navigation.destroy()
      swiper.navigation.init()
      swiper.navigation.update()
    }
  }

  return (
    <>
      <section className={styles.container} aria-labelledby="events-grid-title">
        <div className={styles.layout}>
          <h2 className={styles.title} id="events-grid-title">
            Upcoming Events in Yerevan
          </h2>

          <div className={styles.subtitleRow}>
            <p className={styles.description}>
              The most anticipated gatherings happening this month.
            </p>

            <div className={styles.navigationButtons} aria-label="Events carousel navigation">
              <button
                ref={navigationPrevRef}
                className={EVENTS_PREV_BUTTON_CLASS}
                type="button"
                aria-label="Previous events"
              />
              <button
                ref={navigationNextRef}
                className={EVENTS_NEXT_BUTTON_CLASS}
                type="button"
                aria-label="Next events"
              />
            </div>
          </div>

          <div className={styles.swiperViewport}>
            <Swiper
              modules={[Navigation]}
              autoHeight
              watchOverflow={false}
              allowTouchMove
              simulateTouch
              grabCursor
              breakpoints={SLIDER_BREAKPOINTS}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onBeforeInit={bindCarouselNavigation}
              onInit={bindCarouselNavigation}
              className={styles.mySwiper}
            >
              {EVENTS.map((event) => (
                <SwiperSlide key={event.id} className={styles.slide}>
                  <div className={styles.cardHoverShell}>
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
                          className={`${styles.heartIcon} ${SWIPER_NO_SWIPING_CLASS}`}
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
                            className={`${styles.bookButton} ${SWIPER_NO_SWIPING_CLASS}`}
                            onClick={() => setSelectedEvent(event)}
                          >
                            Book
                          </Button>
                        </div>
                      </div>
                    </article>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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
