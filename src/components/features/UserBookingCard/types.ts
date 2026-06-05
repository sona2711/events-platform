import type { UserBooking } from '@/pages/userProfile/types'

export type UserBookingCardProps = {
  booking: UserBooking
  onPayTickets?: (eventId: string) => void
  onCancel?: (bookingId: string) => void
  onViewTicket?: (bookingId: string) => void
  onLeaveFeedback?: (bookingId: string) => void
}
