import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import type { SidebarEventItem } from '@/components/features/homepage/homeContent'
import { getCategoryAccent } from '@/components/features/homepage/categoryAccents'
import styles from './styles.module.css'

const { Text } = Typography

type HomeSidebarCardProps = {
  event: SidebarEventItem
  variant?: 'trending' | 'weekend'
}

export const HomeSidebarCard = ({ event, variant = 'trending' }: HomeSidebarCardProps) => {
  const accent = getCategoryAccent(event.categoryLabel)
  const accentClass = styles[`accent${accent.charAt(0).toUpperCase() + accent.slice(1)}`]

  return (
    <Link
      className={`${styles.card} ${accentClass} ${variant === 'weekend' ? styles.weekend : ''}`}
      to={`/event/${event.id}`}
    >
      <Text className={styles.category}>{event.categoryLabel}</Text>
      <Text className={styles.title}>{event.title}</Text>
      <Text className={styles.date}>{event.date}</Text>
    </Link>
  )
}
