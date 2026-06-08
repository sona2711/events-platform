export type EventCardData = {
  id: string
  imageUrl: string
  categoryLabel: string
  title: string
  location: string
  date: string
  priceLabel: string
}

export type EventCardVariant = 'default' | 'carousel'

export type EventCardProps = {
  event: EventCardData
  variant?: EventCardVariant
  onBook?: (eventId: string) => void
  onNavigate?: (eventId: string) => void
  noSwipeClassName?: string
}

export type ListingEventInput = {
  id: number
  image: string
  category: string
  title: string
  location: string
  date: string
  price: string
}
