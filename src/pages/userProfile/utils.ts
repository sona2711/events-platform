import { useTranslation } from 'react-i18next'
import type { SupportedLanguage } from '@/i18n'
import { MOCK_BOOKING_SEEDS, PROFILE_NAV_ITEM_IDS } from './consts'
import type { LanguageOption, UserBooking, UserBookingSeed } from './types'

const SUPPORTED_LANGUAGE_OPTIONS: SupportedLanguage[] = ['hy', 'en', 'ru']

const mapBookingSeed = (seed: UserBookingSeed, t: (key: string) => string): UserBooking => ({
  id: seed.id,
  eventId: seed.eventId,
  title: t(`bookings.items.${seed.itemKey}.title`),
  category: t(`bookings.categories.${seed.categoryKey}`),
  dateTime: t(`bookings.items.${seed.itemKey}.dateTime`),
  startsAt: seed.startsAt,
  location: t(`bookings.items.${seed.itemKey}.location`),
  imageUrl: seed.imageUrl,
  status: seed.status,
})

const getBookingTime = (booking: UserBooking) => new Date(booking.startsAt).getTime()

const getUpcomingBookings = (bookings: UserBooking[], now = new Date()) =>
  bookings
    .filter(
      (booking) =>
        booking.status !== 'cancelled' &&
        booking.status !== 'past' &&
        getBookingTime(booking) >= now.getTime(),
    )
    .sort((a, b) => getBookingTime(a) - getBookingTime(b))

export const getPastBookings = (bookings: UserBooking[], now = new Date()) =>
  bookings
    .filter(
      (booking) =>
        booking.status !== 'cancelled' &&
        (booking.status === 'past' || getBookingTime(booking) < now.getTime()),
    )
    .map((booking) => ({ ...booking, status: 'past' as const }))
    .sort((a, b) => getBookingTime(b) - getBookingTime(a))

const getCancelledBookings = (bookings: UserBooking[]) =>
  bookings
    .filter((booking) => booking.status === 'cancelled')
    .sort((a, b) => getBookingTime(b) - getBookingTime(a))

export const useProfilePageData = () => {
  const { t } = useTranslation('profile')
  const { t: tCommon } = useTranslation('common')

  const languageOptions: LanguageOption[] = SUPPORTED_LANGUAGE_OPTIONS.map((value) => ({
    value,
    label: tCommon(`languages.${value}`),
  }))

  const bookings = MOCK_BOOKING_SEEDS.map((seed) => mapBookingSeed(seed, t))

  return {
    profileNavItemIds: PROFILE_NAV_ITEM_IDS,
    upcomingBookings: getUpcomingBookings(bookings),
    pastBookings: getPastBookings(bookings),
    cancelledBookings: getCancelledBookings(bookings),
    languageOptions,
  }
}
