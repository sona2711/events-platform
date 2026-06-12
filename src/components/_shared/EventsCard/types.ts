export type EventCardData = {
  id: string
  imageUrl: string
  categoryLabel: string
  title: string
  location: string
  date: string
  priceLabel: string
}

export type ListingEventInput = {
  id: string
  image: string
  category: string
  title: string
  location: string
  date: string
  price: string
}

export type EventCardSize = 'default' | 'compact'

export type EventCardSurface = 'dark' | 'light'

export type EventCardProps = {
  event: EventCardData
  onBook?: (eventId: string) => void
  noSwipeClassName?: string
  size?: EventCardSize
  surface?: EventCardSurface
}
