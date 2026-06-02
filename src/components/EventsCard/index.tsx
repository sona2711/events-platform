import styles from './styles.module.css'
import { CalendarOutlined, EnvironmentOutlined, HeartOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { EVENTS, SLIDER_BREAKPOINTS } from './consts'

export function EventsGrid() {
  return (
    <section className={styles.container} aria-labelledby="events-grid-title">
      <h2 className={styles.title} id="events-grid-title">
        Upcoming Events in Yerevan
      </h2>

      <p className={styles.description}>
        The most anticipated gatherings happening this month and beyond
      </p>

      <Swiper
        modules={[Navigation]}
        breakpoints={SLIDER_BREAKPOINTS}
        navigation
        className={styles.mySwiper}
      >
        {EVENTS.map((event) => (
          <SwiperSlide key={event.id}>
            <article className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={event.image} alt={event.title} className={styles.image} loading="lazy" />
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
                  <Button type="primary" className={styles.bookButton}>
                    Book
                  </Button>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
