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
