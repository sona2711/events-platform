import type { EventCardData, EventCardProps, ListingEventInput } from './types'

export const toEventCardData = (event: ListingEventInput): EventCardData => ({
  id: String(event.id),
  imageUrl: event.image,
  categoryLabel: event.category,
  title: event.title,
  location: event.location,
  date: event.date,
  priceLabel: event.price,
})

export const mapEventsToCardData = (events: readonly ListingEventInput[]): EventCardData[] =>
  events.map(toEventCardData)

export const joinClassNames = (...classes: (string | undefined)[]): string =>
  classes.filter(Boolean).join(' ')

export const areEventCardPropsEqual = (prev: EventCardProps, next: EventCardProps): boolean =>
  prev.variant === next.variant &&
  prev.noSwipeClassName === next.noSwipeClassName &&
  prev.onBook === next.onBook &&
  prev.event.id === next.event.id &&
  prev.event.imageUrl === next.event.imageUrl &&
  prev.event.categoryLabel === next.event.categoryLabel &&
  prev.event.title === next.event.title &&
  prev.event.location === next.event.location &&
  prev.event.date === next.event.date &&
  prev.event.priceLabel === next.event.priceLabel
