import { mapEventsToCardData } from '@/components/_shared/EventsCard/utils'
import { getExploreListingEvents } from '@/mock-api/listingEventUtils'

export const EXPLORE_EVENTS = getExploreListingEvents()

export const EXPLORE_EVENTS_CARD_DATA = mapEventsToCardData(EXPLORE_EVENTS)

export const EXPLORE_EVENT_BY_ID = new Map(EXPLORE_EVENTS.map((event) => [event.id, event]))
