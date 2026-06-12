import type { EventCardData } from '@/components/_shared/EventsCard/types'
import { EVENTS_CARD_DATA } from '@/components/EventsCard/consts'
import { EXPLORE_EVENTS_CARD_DATA } from '@/components/features/ExploreAllEvents/consts'
import { CATEGORY_TAB_ITEMS } from '@/components/features/CategoryTabs/consts'

const HERO_CATEGORY_CHIP_ACCENTS = ['pink', 'blue', 'orange', 'purple', 'lime', 'cyan'] as const

export type CategoryChipAccent = (typeof HERO_CATEGORY_CHIP_ACCENTS)[number]

export type CategoryChip = {
  label: string
  id: string
  accent: CategoryChipAccent
}

export type SidebarEventItem = {
  id: string
  title: string
  date: string
  categoryLabel: string
}

export const HERO_FEATURED_EVENT: EventCardData = EVENTS_CARD_DATA[0]

export const HERO_SECONDARY_EVENTS: EventCardData[] = EVENTS_CARD_DATA.slice(1, 3)

export const CATEGORY_CHIPS: CategoryChip[] = CATEGORY_TAB_ITEMS.filter(
  (item) => item.id !== 'all',
).map((item, index) => ({
  id: item.id,
  label: item.label,
  accent: HERO_CATEGORY_CHIP_ACCENTS[index % HERO_CATEGORY_CHIP_ACCENTS.length],
}))

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
