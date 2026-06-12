import { useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button, Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { EventsCard } from '@/components/_shared/EventsCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import { useEventBookingModal } from '@/hooks/useEventBookingModal'
import 'swiper/css'
import 'swiper/css/navigation'
import {
  EVENT_BY_ID,
  EVENTS_CARD_DATA,
  EVENTS_NEXT_BUTTON_CLASS,
  EVENTS_PREV_BUTTON_CLASS,
  SLIDER_BREAKPOINTS,
  SWIPER_MODULES,
  SWIPER_NO_SWIPING_CLASS,
} from './consts'
import styles from './styles.module.css'

const { Title, Text, Paragraph } = Typography

export const EventsGrid = () => {
  const { t } = useTranslation('home')
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
          <div className={styles.header}>
            <div className={styles.headerCopy}>
              <Text className={styles.eyebrow}>{t('eventsGrid.eyebrow')}</Text>
              <Title className={styles.title} id="events-grid-title" level={2}>
                {t('eventsGrid.title')}
              </Title>
              <Paragraph className={styles.description}>{t('eventsGrid.description')}</Paragraph>
            </div>

            <Flex className={styles.headerActions} align="center" gap={16} wrap="wrap">
              <Link className={styles.viewAllLink} to="/categories">
                {t('eventsGrid.viewAll')}
              </Link>

              <Flex
                className={styles.navigationButtons}
                aria-label={t('eventsGrid.carouselNavAria')}
                gap={8}
              >
                <Button
                  ref={navigationPrevRef}
                  className={EVENTS_PREV_BUTTON_CLASS}
                  type="default"
                  aria-label={t('eventsGrid.previous')}
                />
                <Button
                  ref={navigationNextRef}
                  className={EVENTS_NEXT_BUTTON_CLASS}
                  type="default"
                  aria-label={t('eventsGrid.next')}
                />
              </Flex>
            </Flex>
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
                  <EventsCard
                    event={event}
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
