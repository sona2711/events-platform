import { enrichEventRecord } from '@/mock-api/eventDetailUtils'
import { MOCK_EVENTS_BY_ID } from '@/mock-api/eventsData'
import type { CheckoutEvent, TicketTier } from './types'

const buildTicketTiers = (ticketName: string, priceAmd: number): TicketTier[] => {
  if (priceAmd === 0) {
    return [
      {
        id: 'free-entry',
        name: ticketName,
        description: 'Free event registration.',
        priceAmd: 0,
        maxQuantity: 10,
      },
    ]
  }

  return [
    {
      id: 'general-admission',
      name: ticketName,
      description: 'Standard event entry.',
      priceAmd,
      maxQuantity: 10,
    },
  ]
}

export const buildCheckoutEventFromMock = (eventId: string): CheckoutEvent | undefined => {
  const record = MOCK_EVENTS_BY_ID.get(eventId)
  if (!record) return undefined

  const detail = enrichEventRecord(record)

  return {
    id: detail.id,
    title: detail.title,
    location: detail.locationDetails.name,
    imageUrl: detail.imageUrl,
    ticketTiers: buildTicketTiers(detail.ticket.name, detail.ticket.priceAmd),
  }
}
