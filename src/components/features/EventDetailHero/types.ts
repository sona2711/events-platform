export type EventDetailHeroData = {
  title: string
  category: string
  badgeLabel?: string
  imageUrl: string
  location: string
  date: string
  time?: string
}

export type EventDetailHeroProps = {
  event: EventDetailHeroData
}
