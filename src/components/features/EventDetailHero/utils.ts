import type { EventDetailHeroData } from './types'

export const getEventDateTimeLabel = (
  event: Pick<EventDetailHeroData, 'date' | 'time'>,
): string => {
  if (event.time) {
    return `${event.date} • ${event.time}`
  }

  return event.date
}

export const getEventBadgeLabel = (
  event: Pick<EventDetailHeroData, 'badgeLabel' | 'category'>,
): string => event.badgeLabel ?? event.category
