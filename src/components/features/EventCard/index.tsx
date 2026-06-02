import {
  CalendarOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
} from '@ant-design/icons'
import { Button, Image } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectIsEventFavorite, toggleFavorite } from '@/store/favorites'
import type { EventCardProps } from './types'
import styles from './styles.module.css'

export const EventCard = ({ event, onBook }: EventCardProps) => {
  const dispatch = useAppDispatch()
  const isFavorite = useAppSelector(selectIsEventFavorite(event.id))

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(event.id))
  }

  const wishlistButtonClassName = isFavorite
    ? `${styles.wishlistButton} ${styles.wishlistButtonActive}`
    : styles.wishlistButton

  const wishlistLabel = isFavorite
    ? `Remove ${event.title} from wishlist`
    : `Save ${event.title} to wishlist`

  return (
    <article className={styles.card}>
      <div className={styles.media}>
        <Image className={styles.image} src={event.imageUrl} alt={event.title} preview={false} />
        <button
          type="button"
          className={wishlistButtonClassName}
          aria-label={wishlistLabel}
          aria-pressed={isFavorite}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? <HeartFilled aria-hidden /> : <HeartOutlined aria-hidden />}
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
