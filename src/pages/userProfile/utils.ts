import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { EventDetail } from '@/mock-api/eventsData'
import { fetchEventById } from '@/mock-api/resolveEventById'
import type { SupportedLanguage } from '@/i18n'
import {
  MOCK_HISTORICAL_BOOKING_SNAPSHOTS,
  MOCK_UPCOMING_BOOKING_SEEDS,
  PROFILE_NAV_ITEM_IDS,
} from './consts'
import type {
  LanguageOption,
  UserBooking,
  UserHistoricalBookingSnapshot,
  UserUpcomingBookingSeed,
} from './types'

const SUPPORTED_LANGUAGE_OPTIONS: SupportedLanguage[] = ['hy', 'en', 'ru']

const formatBookingDateTime = (startsAt: string, eventDate?: string): string => {
  const date = new Date(startsAt)
  const datePart =
    eventDate ||
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
  const timePart = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return `${datePart} · ${timePart}`
}

const formatCategoryLabel = (category: string): string =>
  category ? category.toUpperCase() : 'EVENT'

const mapHistoricalSnapshot = (snapshot: UserHistoricalBookingSnapshot): UserBooking => ({
  id: snapshot.id,
  eventId: snapshot.eventId,
  title: snapshot.title,
  category: snapshot.category,
  dateTime: snapshot.dateTime,
  startsAt: snapshot.startsAt,
  location: snapshot.location,
  imageUrl: snapshot.imageUrl,
  status: snapshot.status,
})

const mapUpcomingSeedToBooking = (
  seed: UserUpcomingBookingSeed,
  event: EventDetail,
): UserBooking => ({
  id: seed.id,
  eventId: seed.eventId,
  title: event.title,
  category: formatCategoryLabel(event.category),
  dateTime: formatBookingDateTime(seed.startsAt, event.date),
  startsAt: seed.startsAt,
  location: event.location,
  imageUrl: event.imageUrl,
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
  const { t: tCommon } = useTranslation('common')
  const [resolvedUpcomingBookings, setResolvedUpcomingBookings] = useState<UserBooking[]>([])

  const languageOptions: LanguageOption[] = useMemo(
    () =>
      SUPPORTED_LANGUAGE_OPTIONS.map((value) => ({
        value,
        label: tCommon(`languages.${value}`),
      })),
    [tCommon],
  )

  const historicalBookings = useMemo(
    () => MOCK_HISTORICAL_BOOKING_SNAPSHOTS.map(mapHistoricalSnapshot),
    [],
  )

  useEffect(() => {
    let cancelled = false

    const loadUpcomingBookings = async () => {
      const resolved = await Promise.all(
        MOCK_UPCOMING_BOOKING_SEEDS.map(async (seed) => {
          const event = await fetchEventById(seed.eventId)
          return event ? mapUpcomingSeedToBooking(seed, event) : null
        }),
      )

      if (!cancelled) {
        setResolvedUpcomingBookings(
          resolved.filter((booking): booking is UserBooking => booking !== null),
        )
      }
    }

    void loadUpcomingBookings()

    return () => {
      cancelled = true
    }
  }, [])

  const allBookings = useMemo(
    () => [...resolvedUpcomingBookings, ...historicalBookings],
    [historicalBookings, resolvedUpcomingBookings],
  )

  const upcomingBookings = useMemo(() => getUpcomingBookings(allBookings), [allBookings])
  const pastBookings = useMemo(() => getPastBookings(allBookings), [allBookings])
  const cancelledBookings = useMemo(() => getCancelledBookings(allBookings), [allBookings])

  return {
    profileNavItemIds: PROFILE_NAV_ITEM_IDS,
    upcomingBookings,
    pastBookings,
    cancelledBookings,
    languageOptions,
  }
}
