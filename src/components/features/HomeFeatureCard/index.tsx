import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import type { EventCardData } from '@/components/features/EventCard/types'
import { getCategoryAccent } from '@/components/features/homepage/categoryAccents'
import styles from './styles.module.css'

const { Title, Text } = Typography

type HomeFeatureCardProps = {
  event: EventCardData
  size: 'featured' | 'secondary'
}

export const HomeFeatureCard = ({ event, size }: HomeFeatureCardProps) => {
  const { t } = useTranslation('home')
  const accent = getCategoryAccent(event.categoryLabel)
  const accentClass = styles[`accent${accent.charAt(0).toUpperCase() + accent.slice(1)}`]

  if (size === 'featured') {
    return (
      <Link
        className={`${styles.featuredCard} ${accentClass}`}
        to={`/event/${event.id}`}
        aria-label={t('hero.featuredEventAria', { title: event.title })}
      >
        <img
          className={styles.image}
          src={event.imageUrl}
          alt=""
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className={styles.overlay}>
          <span className={styles.category}>{event.categoryLabel}</span>
          <Title className={styles.title} level={2}>
            {event.title}
          </Title>
          <Text className={styles.meta}>
            {event.date} · {event.location}
          </Text>
        </div>
      </Link>
    )
  }

  return (
    <Link
      className={`${styles.secondaryCard} ${accentClass}`}
      to={`/event/${event.id}`}
      aria-label={t('hero.featuredEventAria', { title: event.title })}
    >
      <img className={styles.image} src={event.imageUrl} alt="" loading="eager" decoding="async" />
      <div className={styles.overlay}>
        <span className={styles.category}>{event.categoryLabel}</span>
        <Title className={styles.title} level={3}>
          {event.title}
        </Title>
      </div>
    </Link>
  )
}
