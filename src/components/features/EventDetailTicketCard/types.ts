import type { EventTicketDetails } from '@/mock-api/eventDetailTypes'

export type EventDetailTicketCardProps = {
  eventId: string
  ticket: EventTicketDetails
  contactPhone: string
}

export const MIN_TICKET_QUANTITY = 1
export const MAX_TICKET_QUANTITY = 10
