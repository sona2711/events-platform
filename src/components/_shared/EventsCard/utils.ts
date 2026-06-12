import type { EventCardData, ListingEventInput } from './types'

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
