import { useRef, useState } from 'react'
import styles from './styles.module.css'
import { EventCard } from '@/components/features/EventCard'
import { toEventCardData } from '@/components/features/EventCard/utils'
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
                  <EventCard
                    event={toEventCardData(event)}
                    variant="carousel"
                    noSwipeClassName={SWIPER_NO_SWIPING_CLASS}
                    onBook={() => setSelectedEvent(event)}
                  />
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
