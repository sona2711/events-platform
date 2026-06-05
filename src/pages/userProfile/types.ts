import type { SupportedLanguage } from '@/i18n'

export type UserProfile = {
  id: string
  fullName: string
  location: string
  avatarUrl: string
  email: string
  phone: string
  preferredLanguage: SupportedLanguage
}

export type UserBookingStatus = 'upcoming' | 'past' | 'cancelled'

export type UserTicket = {
  id: string
  bookingId: string
  qrCodeUrl?: string
  paidAt?: string
  price?: number
  currency?: string
}

export type UserBooking = {
  id: string
  eventId: string
  title: string
  category: string
  dateTime: string
  startsAt: string
  location: string
  imageUrl: string
  status?: UserBookingStatus
  ticket?: UserTicket
}

export type UserFeedback = {
  id: string
  eventId: string
  rating: number
  comment: string
  createdAt: string
}

export type UserAccount = {
  profile: UserProfile
  bookings: UserBooking[]
  favoriteEventIds: string[]
  feedbacks: UserFeedback[]
}

export type ProfileNavItemId = 'bookings' | 'saved' | 'feedback' | 'settings'

export type ProfileNavItem = {
  id: ProfileNavItemId
  isActive?: boolean
}

export type LanguageOption = {
  value: SupportedLanguage
  label: string
}

export type ProfileFormValues = {
  fullName: string
  email: string
  phone: string
  location: string
  preferredLanguage: SupportedLanguage
}

export type BookingItemKey = 'jazzFest' | 'feast' | 'marathon' | 'wineTasting'

export type BookingCategoryKey = 'music' | 'culinary' | 'sports'

export type UserBookingSeed = {
  id: string
  eventId: string
  itemKey: BookingItemKey
  categoryKey: BookingCategoryKey
  imageUrl: string
  startsAt: string
  status?: UserBookingStatus
}
