import { CheckCircleFilled } from '@ant-design/icons'
import { Typography } from 'antd'
import type { EventDetailAboutProps } from './types'
import styles from './styles.module.css'

export const EventDetailAbout = ({ description, highlights }: EventDetailAboutProps) => (
  <section className={styles.section} aria-labelledby="event-about-heading">
    <Typography.Title level={2} id="event-about-heading" className={styles.heading}>
      About this event
    </Typography.Title>
    <Typography.Paragraph className={styles.description}>{description}</Typography.Paragraph>

    {highlights.length > 0 && (
      <ul className={styles.highlights}>
        {highlights.map((highlight) => (
          <li key={highlight} className={styles.highlightItem}>
            <CheckCircleFilled className={styles.checkIcon} aria-hidden />
            <Typography.Text className={styles.highlightText}>{highlight}</Typography.Text>
          </li>
        ))}
      </ul>
    )}
  </section>
)
