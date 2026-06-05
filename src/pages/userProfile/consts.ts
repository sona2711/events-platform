import type { ProfileNavItem, UserBookingSeed } from './types'
import avatar from '@/assets/images/avatar.svg'
import jazzFestImage from '@/assets/images/ClassicalNightAtOperaHouse.jpg'
import feastImage from '@/assets/images/caroline-attwood-z38uTGNpNnA-unsplash.jpg'
import marathonImage from '@/assets/images/HikingToGarniTemple.jpg'
import wineTastingImage from '@/assets/images/wine-stain-detail.jpg'

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

export const MOCK_BOOKING_SEEDS: UserBookingSeed[] = [
  {
    id: 'booking-1',
    eventId: 'event-jazz-fest',
    itemKey: 'jazzFest',
    categoryKey: 'music',
    imageUrl: jazzFestImage,
    startsAt: '2026-06-02T19:30:00+04:00',
  },
  {
    id: 'booking-2',
    eventId: 'event-feast',
    itemKey: 'feast',
    categoryKey: 'culinary',
    imageUrl: feastImage,
    startsAt: '2026-07-14T18:00:00+04:00',
    status: 'cancelled',
  },
  {
    id: 'booking-3',
    eventId: 'event-marathon',
    itemKey: 'marathon',
    categoryKey: 'sports',
    imageUrl: marathonImage,
    startsAt: '2026-08-20T09:00:00+04:00',
  },
  {
    id: 'booking-4',
    eventId: 'event-wine-tasting',
    itemKey: 'wineTasting',
    categoryKey: 'culinary',
    imageUrl: wineTastingImage,
    startsAt: '2026-03-10T17:00:00+04:00',
    status: 'past',
  },
]
