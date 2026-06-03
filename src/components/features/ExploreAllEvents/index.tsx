import { CalendarOutlined, EnvironmentOutlined, HeartOutlined } from '@ant-design/icons'
import { EXPLORE_EVENTS } from './consts'
import styles from './styles.module.css'

export function ExploreAllEvents() {
  return (
    <section className={styles.section} aria-labelledby="explore-events-title">
      <div className={styles.layout}>
        <h2 className={styles.title} id="explore-events-title">
          Explore All Events
        </h2>

        <div className={styles.grid}>
          {EXPLORE_EVENTS.map((event) => (
            <article key={event.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={event.image} alt={event.title} className={styles.image} loading="lazy" />
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
                  <button className={styles.bookBtn} type="button">
                    Book
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.seeMoreWrapper}>
          <button className={styles.seeMoreBtn} type="button">
            See More
          </button>
        </div>
      </div>
    </section>
  )
}
