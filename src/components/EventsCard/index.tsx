import { useCallback, useRef } from 'react'
import styles from './styles.module.css'
import { EventCard } from '@/components/features/EventCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import { useEventBookingModal } from '@/hooks/useEventBookingModal'
import 'swiper/css'
import 'swiper/css/navigation'
import {
  EVENTS_CARD_DATA,
  EVENT_BY_ID,
  EVENTS_NEXT_BUTTON_CLASS,
  EVENTS_PREV_BUTTON_CLASS,
  SLIDER_BREAKPOINTS,
  SWIPER_MODULES,
  SWIPER_NO_SWIPING_CLASS,
} from './consts'

export function EventsGrid() {
  const resolveEvent = useCallback((eventId: string) => EVENT_BY_ID.get(eventId), [])
  const { handleBook, bookingModal } = useEventBookingModal({ resolveEvent })
  const navigationPrevRef = useRef<HTMLButtonElement>(null)
  const navigationNextRef = useRef<HTMLButtonElement>(null)
  const navigationConfigRef = useRef({
    prevEl: null as HTMLButtonElement | null,
    nextEl: null as HTMLButtonElement | null,
  })

  const bindCarouselNavigation = useCallback((swiper: SwiperInstance) => {
    navigationConfigRef.current.prevEl = navigationPrevRef.current
    navigationConfigRef.current.nextEl = navigationNextRef.current

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
  }, [])

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
              modules={SWIPER_MODULES}
              autoHeight
              watchOverflow={false}
              allowTouchMove
              simulateTouch
              grabCursor
              breakpoints={SLIDER_BREAKPOINTS}
              navigation={navigationConfigRef.current}
              onBeforeInit={bindCarouselNavigation}
              onInit={bindCarouselNavigation}
              className={styles.mySwiper}
            >
              {EVENTS_CARD_DATA.map((event) => (
                <SwiperSlide key={event.id} className={styles.slide}>
                  <EventCard
                    event={event}
                    variant="carousel"
                    noSwipeClassName={SWIPER_NO_SWIPING_CLASS}
                    onBook={handleBook}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {bookingModal}
    </>
  )
}
