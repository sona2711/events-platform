import { memo, useCallback } from 'react'
import {
  CalendarOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
} from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectIsEventFavorite, toggleFavorite } from '@/store/favorites'
import { areEventCardPropsEqual, joinClassNames } from './utils'
import type { EventCardProps } from './types'
import styles from './styles.module.css'

type EventCardFavoriteButtonProps = {
  eventId: string
  eventTitle: string
  className: string
}

const EventCardFavoriteButton = memo(
  ({ eventId, eventTitle, className }: EventCardFavoriteButtonProps) => {
    const dispatch = useAppDispatch()
    const isFavorite = useAppSelector(selectIsEventFavorite(eventId))

    const handleToggleFavorite = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation()
        dispatch(toggleFavorite(eventId))
      },
      [dispatch, eventId],
    )

    const favoriteButtonClassName = isFavorite
      ? joinClassNames(className, styles.favoriteButtonActive)
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
  },
)

EventCardFavoriteButton.displayName = 'EventCardFavoriteButton'

export const EventCard = memo(
  ({ event, variant = 'default', onBook, onNavigate, noSwipeClassName }: EventCardProps) => {
    const isFreePrice = event.priceLabel === 'Free'
    const priceClassName = isFreePrice ? styles.priceFree : styles.price
    const favoriteButtonClassName = joinClassNames(styles.favoriteButton, noSwipeClassName)
    const bookButtonClassName = joinClassNames(styles.bookButton, noSwipeClassName)
    const cardClassName = joinClassNames(
      styles.card,
      variant === 'default' ? styles.cardDefault : undefined,
      variant === 'editorial' ? styles.cardEditorial : undefined,
    )

    const handleCardClick = useCallback(() => {
      onNavigate?.(event.id)
    }, [onNavigate, event.id])

    const handleBookClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onBook?.(event.id)
      },
      [onBook, event.id],
    )

    const card = (
      <article className={cardClassName} onClick={handleCardClick}>
        <div className={styles.imageWrapper}>
          <img
            src={event.imageUrl}
            alt={event.title}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
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
            <button type="button" className={bookButtonClassName} onClick={handleBookClick}>
              Book
            </button>
          </div>
        </div>
      </article>
    )

    if (variant === 'carousel' || (variant === 'editorial' && noSwipeClassName)) {
      return <div className={styles.hoverShell}>{card}</div>
    }

    return card
  },
  areEventCardPropsEqual,
)

EventCard.displayName = 'EventCard'
