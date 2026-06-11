import { CHECKOUT_STANDALONE_EVENTS_BY_ID } from '@/pages/CheckoutPage/checkoutOverrides'
import type { CheckoutEvent } from '@/pages/CheckoutPage/types'
import type { EventRecord } from './eventDetailTypes'
import { enrichEventRecord } from './eventDetailUtils'
import type { EventDetail } from './eventsData'
import { MOCK_EVENTS_BY_ID } from './eventsData'

const checkoutOverrideToEventRecord = (override: CheckoutEvent): EventRecord => ({
  id: override.id,
  title: override.title ?? '',
  category: '',
  imageUrl: override.imageUrl,
  location: override.location ?? '',
  date: '',
  price: '',
  description: '',
})

export const resolveEventByIdSync = (eventId: string): EventDetail | null => {
  const mockEvent = MOCK_EVENTS_BY_ID.get(eventId)
  if (mockEvent) {
    return enrichEventRecord(mockEvent)
  }

  const override = CHECKOUT_STANDALONE_EVENTS_BY_ID.get(eventId)
  if (override) {
    return enrichEventRecord(checkoutOverrideToEventRecord(override))
  }

  return null
}

export const fetchEventById = async (eventId: string): Promise<EventDetail | null> => {
  try {
    const response = await fetch(`/api/events/${eventId}`)
    if (response.ok) {
      return (await response.json()) as EventDetail
    }
  } catch {
    // Fall back to local mock data when MSW is unavailable (e.g. unit tests).
  }

  return resolveEventByIdSync(eventId)
}
