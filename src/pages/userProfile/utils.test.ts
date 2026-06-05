import type { UserBooking } from './types'
import { getPastBookings } from './utils'

describe('getPastBookings', () => {
  it('sets status to past for bookings moved to past tab by date', () => {
    const now = new Date('2026-06-10T12:00:00Z')
    const bookings: UserBooking[] = [
      {
        id: 'booking-1',
        eventId: 'event-jazz-fest',
        title: 'Yerevan Jazz Fest 2026',
        category: 'MUSIC',
        dateTime: 'Jun 02, 2026 · 19:30',
        startsAt: '2026-06-02T19:30:00+04:00',
        location: 'Cascade Complex',
        imageUrl: 'data:image/svg+xml,test',
      },
    ]

    const past = getPastBookings(bookings, now)

    expect(past).toHaveLength(1)
    expect(past[0].status).toBe('past')
  })
})
