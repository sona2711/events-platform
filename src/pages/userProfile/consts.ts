import type {
  ProfileNavItem,
  UserHistoricalBookingSnapshot,
  UserUpcomingBookingSeed,
} from './types'
import avatar from '@/assets/images/avatar.svg'
import feastImage from '@/assets/images/caroline-attwood-z38uTGNpNnA-unsplash.webp'
import wineTastingImage from '@/assets/images/wine-stain-detail.webp'

export const MOCK_USER_AVATAR = avatar

export const MOCK_USER_ID = 'user-1'
export const MOCK_USER_FULL_NAME = 'Aram Khachatryan'
export const MOCK_USER_LOCATION = 'Yerevan, Armenia'
export const MOCK_USER_EMAIL = 'aram.kh@example.am'
export const MOCK_USER_PHONE = '+374 91 123 456'
export const MOCK_USER_PREFERRED_LANGUAGE = 'hy' as const

export const PROFILE_NAV_ITEM_IDS: ProfileNavItem['id'][] = [
  'bookings',
  'saved',
  'feedback',
  'settings',
]

export const MOCK_UPCOMING_BOOKING_SEEDS: UserUpcomingBookingSeed[] = [
  {
    id: 'booking-1',
    eventId: 'event-jazz-fest',
    startsAt: '2026-06-02T19:30:00+04:00',
  },
  {
    id: 'booking-3',
    eventId: 'event-marathon',
    startsAt: '2026-08-20T09:00:00+04:00',
  },
]

export const MOCK_HISTORICAL_BOOKING_SNAPSHOTS: UserHistoricalBookingSnapshot[] = [
  {
    id: 'booking-2',
    eventId: 'event-feast',
    startsAt: '2026-07-14T18:00:00+04:00',
    status: 'cancelled',
    title: 'Traditional Armenian Feast',
    category: 'CULINARY',
    dateTime: 'Jul 14, 2026 · 18:00',
    location: 'Republic Square',
    imageUrl: feastImage,
  },
  {
    id: 'booking-4',
    eventId: 'event-wine-tasting',
    startsAt: '2026-03-10T17:00:00+04:00',
    status: 'past',
    title: 'Armenian Wine Tasting',
    category: 'CULINARY',
    dateTime: 'Mar 10, 2026 · 17:00',
    location: 'Saryan Street',
    imageUrl: wineTastingImage,
  },
]
