import type { EventCardData } from '@/components/features/EventCard/types'
import { EVENTS_CARD_DATA } from '@/components/EventsCard/consts'
import { EXPLORE_EVENTS_CARD_DATA } from '@/components/features/ExploreAllEvents/consts'

export type CategoryChip = {
  label: string
  slug: string
  accent: 'pink' | 'blue' | 'orange' | 'lime'
}

export type SidebarEventItem = {
  id: string
  title: string
  date: string
  categoryLabel: string
}

export const HERO_FEATURED_EVENT: EventCardData = EVENTS_CARD_DATA[0]

export const HERO_SECONDARY_EVENTS: EventCardData[] = EVENTS_CARD_DATA.slice(1, 3)

export const CATEGORY_CHIPS: CategoryChip[] = [
  { label: 'Music', slug: 'music', accent: 'pink' },
  { label: 'Technology', slug: 'technology', accent: 'blue' },
  { label: 'Festival', slug: 'festival', accent: 'orange' },
  { label: 'Adventure', slug: 'adventure', accent: 'lime' },
  { label: 'Art', slug: 'art', accent: 'pink' },
]

export const TRENDING_EVENTS: SidebarEventItem[] = EXPLORE_EVENTS_CARD_DATA.slice(0, 4).map(
  (event) => ({
    id: event.id,
    title: event.title,
    date: event.date,
    categoryLabel: event.categoryLabel,
  }),
)

export const WEEKEND_EVENTS: SidebarEventItem[] = EXPLORE_EVENTS_CARD_DATA.slice(2, 5).map(
  (event) => ({
    id: event.id,
    title: event.title,
    date: event.date,
    categoryLabel: event.categoryLabel,
  }),
)
