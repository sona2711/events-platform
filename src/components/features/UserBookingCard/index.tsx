import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { Button, Image, Tag } from 'antd'
import { useTranslation } from 'react-i18next'
import type { UserBookingCardProps } from './types'
import styles from './styles.module.css'

export const UserBookingCard = ({
  booking,
  onPayTickets,
  onCancel,
  onViewTicket,
  onLeaveFeedback,
}: UserBookingCardProps) => {
  const { t } = useTranslation('profile')
  const isPastBooking = booking.status === 'past'
  const isCancelledBooking = booking.status === 'cancelled'

  const renderActions = () => {
    if (isCancelledBooking) {
      return null
    }

    if (isPastBooking) {
      return (
        <div className={styles.actions}>
          <Button type="primary" onClick={() => onViewTicket?.(booking.id)}>
            {t('bookings.actions.viewTicket')}
          </Button>
          <Button onClick={() => onLeaveFeedback?.(booking.id)}>
            {t('bookings.actions.leaveFeedback')}
          </Button>
        </div>
      )
    }

    return (
      <div className={styles.actions}>
        <Button type="primary" onClick={() => onPayTickets?.(booking.id)}>
          {t('bookings.actions.payTickets')}
        </Button>
        <Button onClick={() => onCancel?.(booking.id)}>{t('bookings.actions.cancel')}</Button>
      </div>
    )
  }

  return (
    <article
      className={isCancelledBooking ? `${styles.card} ${styles.cardNoActions}` : styles.card}
    >
      <div className={styles.media}>
        <Image
          className={styles.image}
          src={booking.imageUrl}
          alt={booking.title}
          preview={false}
        />
      </div>

      <div className={styles.content}>
        <Tag className={styles.category}>{booking.category}</Tag>
        <h3 className={styles.title}>{booking.title}</h3>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <CalendarOutlined aria-hidden />
            {booking.dateTime}
          </span>
          <span className={styles.metaItem}>
            <EnvironmentOutlined aria-hidden />
            {booking.location}
          </span>
        </div>
      </div>

      {renderActions()}
    </article>
  )
}
