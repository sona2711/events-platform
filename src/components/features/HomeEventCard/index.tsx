import { memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
} from '@ant-design/icons'
import { Button, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectIsEventFavorite, toggleFavorite } from '@/store/favorites'
import { getCategoryAccent } from '@/components/features/homepage/categoryAccents'
import type { HomeEventCardProps } from './types'
import styles from './styles.module.css'

const { Text, Title } = Typography

const joinClassNames = (...classes: (string | undefined)[]): string =>
  classes.filter(Boolean).join(' ')

type FavoriteButtonProps = {
  eventId: string
  eventTitle: string
  className: string
}

const FavoriteButton = memo(({ eventId, eventTitle, className }: FavoriteButtonProps) => {
  const dispatch = useAppDispatch()
  const isFavorite = useAppSelector(selectIsEventFavorite(eventId))

  const handleToggleFavorite = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch(toggleFavorite(eventId))
    },
    [dispatch, eventId],
  )

  const ariaLabel = isFavorite
    ? `Remove ${eventTitle} from favorites`
    : `Save ${eventTitle} to favorites`

  return (
    <Button
      type="text"
      className={joinClassNames(className, isFavorite ? styles.favoriteActive : undefined)}
      aria-label={ariaLabel}
      aria-pressed={isFavorite}
      icon={isFavorite ? <HeartFilled aria-hidden /> : <HeartOutlined aria-hidden />}
      onClick={handleToggleFavorite}
    />
  )
})

FavoriteButton.displayName = 'FavoriteButton'

export const HomeEventCard = memo(
  ({ event, onBook, noSwipeClassName, size = 'default' }: HomeEventCardProps) => {
    const { t } = useTranslation('home')
    const accent = getCategoryAccent(event.categoryLabel)
    const isFreePrice = event.priceLabel === 'Free'
    const favoriteClassName = joinClassNames(styles.favoriteButton, noSwipeClassName)
    const bookClassName = joinClassNames(styles.bookButton, noSwipeClassName)
    const eventPath = `/event/${event.id}`

    const handleBookClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        e.stopPropagation()

        onBook?.(event.id)
      },
      [onBook, event.id],
    )

    const bookControl = onBook ? (
      <Button type="primary" className={bookClassName} onClick={handleBookClick}>
        {t('eventsGrid.book')}
      </Button>
    ) : (
      <Link className={bookClassName} to={eventPath}>
        {t('eventsGrid.book')}
      </Link>
    )

    const card = (
      <article
        className={joinClassNames(
          styles.card,
          size === 'compact' ? styles.cardCompact : undefined,
          styles[`accent${accent.charAt(0).toUpperCase() + accent.slice(1)}`],
        )}
      >
        <div className={styles.imageWrapper}>
          <Link
            className={styles.cardLink}
            to={eventPath}
            aria-label={t('eventsGrid.viewEventAria', { title: event.title })}
          >
            <img
              src={event.imageUrl}
              alt=""
              className={styles.image}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.imageOverlay} aria-hidden="true" />
            <span className={styles.category}>{event.categoryLabel}</span>
          </Link>
          <FavoriteButton
            eventId={event.id}
            eventTitle={event.title}
            className={favoriteClassName}
          />
        </div>

        <div className={styles.body}>
          <Link className={styles.titleLink} to={eventPath}>
            <Title className={styles.title} level={3}>
              {event.title}
            </Title>
          </Link>
          <Text className={styles.meta}>
            <EnvironmentOutlined className={styles.metaIcon} aria-hidden />
            {event.location}
          </Text>
          <Text className={styles.meta}>
            <CalendarOutlined className={styles.metaIcon} aria-hidden />
            {event.date}
          </Text>
          <div className={styles.footer}>
            <Text className={isFreePrice ? styles.priceFree : styles.price}>
              {event.priceLabel}
            </Text>
            {bookControl}
          </div>
        </div>
      </article>
    )

    if (noSwipeClassName) {
      return <div className={styles.hoverShell}>{card}</div>
    }

    return card
  },
)

HomeEventCard.displayName = 'HomeEventCard'
