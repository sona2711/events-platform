export type EventCardData = {
  id: string
  imageUrl: string
  categoryLabel: string
  title: string
  location: string
  date: string
  priceLabel: string
}

export type EventCardProps = {
  event: EventCardData
  onBook?: (eventId: string) => void
}
