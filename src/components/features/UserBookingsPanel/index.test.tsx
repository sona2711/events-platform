import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import { UserBookingsPanel } from '@/components/features/UserBookingsPanel'
import '@/i18n'
import i18n from '@/i18n'
import profileEn from '@/locales/profile/en.json'
import type { UserBooking } from '@/pages/userProfile/types'

const upcomingBookings: UserBooking[] = [
  {
    id: 'upcoming-1',
    eventId: 'event-jazz-fest',
    title: 'Yerevan Jazz Fest 2026',
    category: 'MUSIC',
    dateTime: 'Jun 02, 2026 · 19:30',
    startsAt: '2026-06-02T19:30:00+04:00',
    location: 'Cascade Complex',
    imageUrl: 'data:image/svg+xml,test',
  },
]

const pastBookings: UserBooking[] = [
  {
    id: 'past-1',
    eventId: 'event-wine-tasting',
    title: 'Armenian Wine Tasting',
    category: 'CULINARY',
    dateTime: 'Mar 10, 2026 · 17:00',
    startsAt: '2026-03-10T17:00:00+04:00',
    location: 'Saryan Street',
    imageUrl: 'data:image/svg+xml,test',
    status: 'past',
  },
]

const cancelledBookings: UserBooking[] = [
  {
    id: 'cancelled-1',
    eventId: 'event-feast',
    title: 'Traditional Armenian Feast',
    category: 'CULINARY',
    dateTime: 'Jul 14, 2026 · 18:00',
    startsAt: '2026-07-14T18:00:00+04:00',
    location: 'Republic Square',
    imageUrl: 'data:image/svg+xml,test',
    status: 'cancelled',
  },
]

const renderPanel = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <ConfigProvider>
        <UserBookingsPanel
          upcomingBookings={upcomingBookings}
          pastBookings={pastBookings}
          cancelledBookings={cancelledBookings}
        />
      </ConfigProvider>
    </I18nextProvider>,
  )

describe('UserBookingsPanel', () => {
  it('shows upcoming bookings by default with pay and cancel actions', () => {
    renderPanel()

    expect(screen.getByText('Yerevan Jazz Fest 2026')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: profileEn.bookings.actions.payTickets }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: profileEn.bookings.actions.cancel }),
    ).toBeInTheDocument()
    expect(screen.queryByText('Armenian Wine Tasting')).not.toBeInTheDocument()
  })

  it('shows past booking actions when the past tab is selected', async () => {
    const user = userEvent.setup()
    renderPanel()

    await user.click(screen.getByRole('tab', { name: profileEn.bookings.tabs.past }))

    expect(screen.getByText('Armenian Wine Tasting')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: profileEn.bookings.actions.viewTicket }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: profileEn.bookings.actions.leaveFeedback }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: profileEn.bookings.actions.payTickets }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: profileEn.bookings.actions.cancel }),
    ).not.toBeInTheDocument()
  })

  it('shows cancelled bookings without action buttons', async () => {
    const user = userEvent.setup()
    renderPanel()

    await user.click(screen.getByRole('tab', { name: profileEn.bookings.tabs.cancelled }))

    expect(screen.getByText('Traditional Armenian Feast')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: profileEn.bookings.actions.payTickets }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: profileEn.bookings.actions.cancel }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: profileEn.bookings.actions.viewTicket }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: profileEn.bookings.actions.leaveFeedback }),
    ).not.toBeInTheDocument()
  })
})
