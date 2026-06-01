import type { UserBooking } from '@/pages/userProfile/types'

export type UpcomingEventAlertProps = {
  booking?: UserBooking
  onSetReminder?: (bookingId: string) => void
}
