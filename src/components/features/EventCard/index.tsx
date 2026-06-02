import { CalendarOutlined, EnvironmentOutlined, HeartOutlined } from '@ant-design/icons'
import { Button, Image } from 'antd'
import type { EventCardProps } from './types'
import styles from './styles.module.css'

export const EventCard = ({ event, onBook }: EventCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image className={styles.image} src={event.imageUrl} alt={event.title} preview={false} />
        <button
          type="button"
          className={styles.wishlistButton}
          aria-label={`Save ${event.title} to wishlist`}
        >
          <HeartOutlined aria-hidden />
        </button>
      </div>

      <div className={styles.content}>
        <span className={styles.category}>{event.categoryLabel}</span>
        <h3 className={styles.title}>{event.title}</h3>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <EnvironmentOutlined aria-hidden />
            {event.location}
          </span>
          <span className={styles.metaItem}>
            <CalendarOutlined aria-hidden />
            {event.date}
          </span>
        </div>

        <div className={styles.footer}>
          <span className={styles.price}>{event.priceLabel}</span>
          <Button type="primary" className={styles.bookButton} onClick={() => onBook?.(event.id)}>
            Book
          </Button>
        </div>
      </div>
    </article>
  )
}
