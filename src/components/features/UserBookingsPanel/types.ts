import type { UserBooking } from '@/pages/userProfile/types'

export type UserBookingsPanelProps = {
  upcomingBookings: UserBooking[]
  pastBookings: UserBooking[]
  cancelledBookings: UserBooking[]
  onPayTickets?: (eventId: string) => void
  onCancelBooking?: (bookingId: string) => void
  onViewTicket?: (bookingId: string) => void
  onLeaveFeedback?: (bookingId: string) => void
}
