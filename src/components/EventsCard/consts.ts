import { mapEventsToCardData } from '@/components/features/EventCard/utils'
import { getHomepageListingEvents } from '@/mock-api/listingEventUtils'
import { Navigation } from 'swiper/modules'
import type { SliderBreakpointConfig } from './types'

export const SWIPER_MODULES = [Navigation]

export const EVENTS_PREV_BUTTON_CLASS = 'events-prev-button'
export const EVENTS_NEXT_BUTTON_CLASS = 'events-next-button'
export const SWIPER_NO_SWIPING_CLASS = 'swiper-no-swiping'

export const EVENTS_LAYOUT = {
  sectionPaddingTop: 80,
  sectionPaddingBottom: 80,
  rowWidth: 1248,
  cardWidth: 400,
  cardGap: 24,
} as const

export const EVENTS = getHomepageListingEvents()

export const EVENTS_CARD_DATA = mapEventsToCardData(EVENTS)

export const EVENT_BY_ID = new Map(EVENTS.map((event) => [event.id, event]))

export const SLIDER_BREAKPOINTS: SliderBreakpointConfig = {
  0: {
    slidesPerView: 1,
    spaceBetween: 16,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  1200: {
    slidesPerView: 3,
    spaceBetween: EVENTS_LAYOUT.cardGap,
  },
}
