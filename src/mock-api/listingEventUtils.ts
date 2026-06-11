import type { ListingEventInput } from '@/components/features/EventCard/types'
import type { EventRecord } from './eventDetailTypes'
import { MOCK_EVENTS_BY_ID } from './eventsData'

export const HOMEPAGE_EVENT_IDS = [
  'event-jazz-fest',
  'event-tech-meetup-tumo',
  'event-wine-food-festival',
  'event-hike-hatis',
  'event-art-exhibition',
] as const

export const EXPLORE_EVENT_IDS = [
  'event-modern-art',
  'event-classical-night',
  'event-gastro-fest',
  'event-dilijan-retreat',
  'event-startup-pitch',
  'event-hiking-garni',
] as const

export const toListingEventInput = (event: EventRecord): ListingEventInput => ({
  id: event.id,
  title: event.title,
  category: event.category,
  location: event.location,
  date: event.date,
  price: event.price,
  image: event.imageUrl,
})

export const getListingEventsByIds = (eventIds: readonly string[]): ListingEventInput[] =>
  eventIds.map((eventId) => {
    const event = MOCK_EVENTS_BY_ID.get(eventId)
    if (!event) {
      throw new Error(`Missing listing event: ${eventId}`)
    }

    return toListingEventInput(event)
  })

export const getHomepageListingEvents = (): ListingEventInput[] =>
  getListingEventsByIds(HOMEPAGE_EVENT_IDS)

export const getExploreListingEvents = (): ListingEventInput[] =>
  getListingEventsByIds(EXPLORE_EVENT_IDS)
