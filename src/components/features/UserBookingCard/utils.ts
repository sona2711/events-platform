import type { UserBookingCardProps } from './types'

export const areUserBookingCardPropsEqual = (
  prev: UserBookingCardProps,
  next: UserBookingCardProps,
): boolean =>
  prev.onPayTickets === next.onPayTickets &&
  prev.onCancel === next.onCancel &&
  prev.onViewTicket === next.onViewTicket &&
  prev.onLeaveFeedback === next.onLeaveFeedback &&
  prev.booking.id === next.booking.id &&
  prev.booking.eventId === next.booking.eventId &&
  prev.booking.title === next.booking.title &&
  prev.booking.category === next.booking.category &&
  prev.booking.dateTime === next.booking.dateTime &&
  prev.booking.startsAt === next.booking.startsAt &&
  prev.booking.location === next.booking.location &&
  prev.booking.imageUrl === next.booking.imageUrl &&
  prev.booking.status === next.booking.status
