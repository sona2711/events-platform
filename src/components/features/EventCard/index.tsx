import {
  CalendarOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
} from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectIsEventFavorite, toggleFavorite } from '@/store/favorites'
import type { EventCardProps } from './types'
import styles from './styles.module.css'

type EventCardFavoriteButtonProps = {
  eventId: string
  eventTitle: string
  className: string
}

const EventCardFavoriteButton = ({
  eventId,
  eventTitle,
  className,
}: EventCardFavoriteButtonProps) => {
  const dispatch = useAppDispatch()
  const isFavorite = useAppSelector(selectIsEventFavorite(eventId))

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(eventId))
  }

  const favoriteButtonClassName = isFavorite
    ? `${className} ${styles.favoriteButtonActive}`
    : className

  const ariaLabel = isFavorite
    ? `Remove ${eventTitle} from favorites`
    : `Save ${eventTitle} to favorites`

  return (
    <button
      type="button"
      className={favoriteButtonClassName}
      aria-label={ariaLabel}
      aria-pressed={isFavorite}
      onClick={handleToggleFavorite}
    >
      {isFavorite ? <HeartFilled aria-hidden /> : <HeartOutlined aria-hidden />}
    </button>
  )
}

export const EventCard = ({
  event,
  variant = 'default',
  onBook,
  noSwipeClassName,
}: EventCardProps) => {
  const isFreePrice = event.priceLabel === 'Free'
  const priceClassName = isFreePrice ? styles.priceFree : styles.price
  const favoriteButtonClassName = [styles.favoriteButton, noSwipeClassName]
    .filter(Boolean)
    .join(' ')
  const bookButtonClassName = [styles.bookButton, noSwipeClassName].filter(Boolean).join(' ')

  const cardClassName = variant === 'default' ? `${styles.card} ${styles.cardDefault}` : styles.card

  const card = (
    <article className={cardClassName}>
      <div className={styles.imageWrapper}>
        <img src={event.imageUrl} alt={event.title} className={styles.image} loading="lazy" />
        <EventCardFavoriteButton
          eventId={event.id}
          eventTitle={event.title}
          className={favoriteButtonClassName}
        />
      </div>

      <div className={styles.cardBody}>
        <span className={styles.category}>{event.categoryLabel}</span>
        <h3 className={styles.title}>{event.title}</h3>
        <p className={styles.location}>
          <EnvironmentOutlined className={styles.metaIcon} aria-hidden />
          {event.location}
        </p>
        <p className={styles.date}>
          <CalendarOutlined className={styles.metaIcon} aria-hidden />
          {event.date}
        </p>
        <div className={styles.footer}>
          <span className={priceClassName}>{event.priceLabel}</span>
          <button type="button" className={bookButtonClassName} onClick={() => onBook?.(event.id)}>
            Book
          </button>
        </div>
      </div>
    </article>
  )

  if (variant === 'carousel') {
    return <div className={styles.hoverShell}>{card}</div>
  }

  return card
}
