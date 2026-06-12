export type EventLocationDetails = {
  name: string
  address: string
  lat: number
  lng: number
}

export type EventTicketDetails = {
  name: string
  priceAmd: number
  serviceFeeAmd: number
}

export type EventInfoIcon = 'age' | 'noKids' | 'coatCheck'

export type EventInfoItem = {
  id: string
  label: string
  icon: EventInfoIcon
}

export type EventRecord = {
  id: string
  title: string
  category: string
  badgeLabel?: string
  imageUrl: string
  location: string
  date: string
  time?: string
  price: string
  description: string
}

export type EventDetail = EventRecord & {
  organizer: string
  highlights: string[]
  locationDetails: EventLocationDetails
  ticket: EventTicketDetails
  eventInfo: EventInfoItem[]
  tags: string[]
  contactPhone: string
}

export type EventDetailOverrides = Partial<
  Pick<
    EventDetail,
    | 'organizer'
    | 'highlights'
    | 'locationDetails'
    | 'ticket'
    | 'eventInfo'
    | 'tags'
    | 'description'
    | 'price'
    | 'contactPhone'
  >
>
