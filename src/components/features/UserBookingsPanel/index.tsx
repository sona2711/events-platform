import { Tabs } from 'antd'
import { useTranslation } from 'react-i18next'
import { UserBookingCard } from '@/components/features/UserBookingCard'
import { BOOKINGS_TAB_KEYS } from './consts'
import type { UserBookingsPanelProps } from './types'
import styles from './styles.module.css'

export const UserBookingsPanel = ({
  upcomingBookings,
  pastBookings,
  cancelledBookings,
  onPayTickets,
  onCancelBooking,
  onViewTicket,
  onLeaveFeedback,
}: UserBookingsPanelProps) => {
  const { t } = useTranslation('profile')

  const renderBookingList = (bookings: UserBookingsPanelProps['upcomingBookings']) => {
    if (bookings.length === 0) {
      return <p className={styles.emptyState}>{t('bookings.empty')}</p>
    }

    return (
      <div className={styles.bookingList}>
        {bookings.map((booking) => (
          <UserBookingCard
            key={booking.id}
            booking={booking}
            onPayTickets={onPayTickets}
            onCancel={onCancelBooking}
            onViewTicket={onViewTicket}
            onLeaveFeedback={onLeaveFeedback}
          />
        ))}
      </div>
    )
  }

  return (
    <section className={styles.panel} aria-label={t('bookings.aria')}>
      <Tabs
        defaultActiveKey={BOOKINGS_TAB_KEYS.upcoming}
        items={[
          {
            key: BOOKINGS_TAB_KEYS.upcoming,
            label: t('bookings.tabs.upcoming'),
            children: renderBookingList(upcomingBookings),
          },
          {
            key: BOOKINGS_TAB_KEYS.past,
            label: t('bookings.tabs.past'),
            children: renderBookingList(pastBookings),
          },
          {
            key: BOOKINGS_TAB_KEYS.cancelled,
            label: t('bookings.tabs.cancelled'),
            children: renderBookingList(cancelledBookings),
          },
        ]}
      />
    </section>
  )
}
