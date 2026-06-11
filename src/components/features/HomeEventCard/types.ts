import type { EventCardData } from '@/components/features/EventCard/types'

export type HomeEventCardSize = 'default' | 'compact'

export type HomeEventCardProps = {
  event: EventCardData
  onBook?: (eventId: string) => void
  noSwipeClassName?: string
  size?: HomeEventCardSize
}
