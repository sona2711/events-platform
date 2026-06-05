import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import '@/i18n'
import i18n from '@/i18n'
import profileEn from '@/locales/profile/en.json'
import type { UserBooking } from '@/pages/userProfile/types'
import { UserBookingCard } from './index'

const upcomingBooking: UserBooking = {
  id: 'booking-1',
  eventId: 'event-jazz-fest',
  title: 'Yerevan Jazz Fest 2026',
  category: 'MUSIC',
  dateTime: 'Jun 02, 2026 · 19:30',
  startsAt: '2026-06-02T19:30:00+04:00',
  location: 'Cascade Complex',
  imageUrl: 'data:image/svg+xml,test',
}

const renderCard = (onPayTickets = jest.fn()) =>
  render(
    <I18nextProvider i18n={i18n}>
      <ConfigProvider>
        <UserBookingCard booking={upcomingBooking} onPayTickets={onPayTickets} />
      </ConfigProvider>
    </I18nextProvider>,
  )

describe('UserBookingCard', () => {
  it('calls onPayTickets with booking eventId when pay button is clicked', async () => {
    const user = userEvent.setup()
    const onPayTickets = jest.fn()
    renderCard(onPayTickets)

    await user.click(screen.getByRole('button', { name: profileEn.bookings.actions.payTickets }))

    expect(onPayTickets).toHaveBeenCalledWith('event-jazz-fest')
    expect(onPayTickets).not.toHaveBeenCalledWith('booking-1')
  })
})
