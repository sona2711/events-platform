import { CHECKOUT_EVENT_OVERRIDES_BY_ID } from '@/pages/CheckoutPage/checkoutOverrides'
import type { EventDetail } from './eventsData'
import { MOCK_EVENTS_BY_ID } from './eventsData'

const checkoutOverrideToEventDetail = (override: {
  id: string
  title: string
  location: string
  imageUrl: string
}): EventDetail => ({
  id: override.id,
  title: override.title,
  category: '',
  imageUrl: override.imageUrl,
  location: override.location,
  date: '',
  price: '',
  description: '',
})

export const resolveEventByIdSync = (eventId: string): EventDetail | null => {
  const mockEvent = MOCK_EVENTS_BY_ID.get(eventId)
  if (mockEvent) {
    return mockEvent
  }

  const override = CHECKOUT_EVENT_OVERRIDES_BY_ID.get(eventId)
  if (override) {
    return checkoutOverrideToEventDetail(override)
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
