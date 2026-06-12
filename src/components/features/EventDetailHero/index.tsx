import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { Flex, Tag, Typography } from 'antd'
import { getEventBadgeLabel, getEventDateTimeLabel } from './utils'
import type { EventDetailHeroProps } from './types'
import styles from './styles.module.css'

export const EventDetailHero = ({ event }: EventDetailHeroProps) => {
  const dateTimeLabel = getEventDateTimeLabel(event)
  const badgeLabel = getEventBadgeLabel(event)

  return (
    <section className={styles.hero} aria-label={event.title}>
      <img src={event.imageUrl} alt={event.title} className={styles.image} />
      <div className={styles.overlay} aria-hidden />
      <Flex vertical gap={12} className={styles.content}>
        <Tag className={styles.badge}>{badgeLabel}</Tag>
        <Typography.Title level={1} className={styles.title}>
          {event.title}
        </Typography.Title>
        <Flex gap={24} wrap="wrap" className={styles.meta}>
          <Typography.Text className={styles.metaItem}>
            <CalendarOutlined className={styles.metaIcon} aria-hidden />
            {dateTimeLabel}
          </Typography.Text>
          <Typography.Text className={styles.metaItem}>
            <EnvironmentOutlined className={styles.metaIcon} aria-hidden />
            {event.location}
          </Typography.Text>
        </Flex>
      </Flex>
    </section>
  )
}
