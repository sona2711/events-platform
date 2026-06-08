import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { EventCard } from '@/components/features/EventCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperInstance } from 'swiper'
import type { ListingEventInput } from '@/components/features/EventCard/types'
import 'swiper/css'
import 'swiper/css/navigation'
import {
  EVENTS_CARD_DATA,
  EVENT_BY_ID,
  EVENTS_NEXT_BUTTON_CLASS,
  EVENTS_PREV_BUTTON_CLASS,
  SLIDER_BREAKPOINTS,
  SWIPER_NO_SWIPING_CLASS,
} from './consts'

const TicketPaymentModal = lazy(() =>
  import('@/components/features/TicketPaymentModal').then((module) => ({
    default: module.TicketPaymentModal,
  })),
)

export function EventsGrid() {
  const navigate = useNavigate()
  const [selectedEvent, setSelectedEvent] = useState<ListingEventInput | null>(null)
  const navigationPrevRef = useRef<HTMLButtonElement>(null)
  const navigationNextRef = useRef<HTMLButtonElement>(null)

  const handleNavigate = useCallback(
    (eventId: string) => {
      navigate(`/event/${eventId}`)
    },
    [navigate],
  )

  const handleBook = useCallback((eventId: string) => {
    setSelectedEvent(EVENT_BY_ID.get(eventId) ?? null)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null)
  }, [])

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
              {EVENTS_CARD_DATA.map((event) => (
                <SwiperSlide key={event.id} className={styles.slide}>
                  <EventCard
                    event={event}
                    variant="carousel"
                    noSwipeClassName={SWIPER_NO_SWIPING_CLASS}
                    onBook={handleBook}
                    onNavigate={handleNavigate}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
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
