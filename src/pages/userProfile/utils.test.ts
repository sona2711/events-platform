import { fetchEventById, resolveEventByIdSync } from '@/mock-api/resolveEventById'
import { MOCK_HISTORICAL_BOOKING_SNAPSHOTS, MOCK_UPCOMING_BOOKING_SEEDS } from './consts'
import { getPastBookings } from './utils'

describe('resolveEventByIdSync', () => {
  it('resolves shared mock events by id', () => {
    expect(resolveEventByIdSync('1')).toMatchObject({
      title: 'Jazz Night at Cascade',
    })
  })

  it('falls back to checkout overrides for profile booking ids', () => {
    expect(resolveEventByIdSync('event-jazz-fest')).toMatchObject({
      title: 'Yerevan Jazz Fest 2026',
      location: 'Cascade Complex',
    })
  })
})

describe('fetchEventById', () => {
  it('falls back to local mock data when the API is unavailable', async () => {
    await expect(fetchEventById('event-marathon')).resolves.toMatchObject({
      title: 'Yerevan Marathon 2026',
    })
  })
})

describe('profile booking data split', () => {
  it('keeps past and canceled tickets as profile-owned snapshots', () => {
    expect(MOCK_HISTORICAL_BOOKING_SNAPSHOTS).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: 'past',
          title: 'Armenian Wine Tasting',
        }),
        expect.objectContaining({
          status: 'cancelled',
          title: 'Traditional Armenian Feast',
        }),
      ]),
    )
  })

  it('stores only ownership data for upcoming tickets', () => {
    expect(MOCK_UPCOMING_BOOKING_SEEDS[0]).toEqual({
      id: 'booking-1',
      eventId: 'event-jazz-fest',
      startsAt: '2026-06-02T19:30:00+04:00',
    })
  })

  it('moves historical snapshots into the past tab by date', () => {
    const now = new Date('2026-06-10T12:00:00Z')
    const past = getPastBookings(
      MOCK_HISTORICAL_BOOKING_SNAPSHOTS.map((snapshot) => ({
        id: snapshot.id,
        eventId: snapshot.eventId,
        title: snapshot.title,
        category: snapshot.category,
        dateTime: snapshot.dateTime,
        startsAt: snapshot.startsAt,
        location: snapshot.location,
        imageUrl: snapshot.imageUrl,
        status: snapshot.status,
      })),
      now,
    )

    expect(past).toHaveLength(1)
    expect(past[0]).toMatchObject({
      status: 'past',
      title: 'Armenian Wine Tasting',
    })
  })
})
