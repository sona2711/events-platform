import { parsePriceAmd } from '@/mock-api/eventDetailUtils'
import type { EventRecord } from '@/mock-api/eventDetailTypes'
import { CATEGORY_EVENTS } from '@/mock-api/eventsData'
import type { CategoryEvent, EventCategory } from './types'

const toCategoryLabel = (category: string, title: string): string => {
  if (title.includes('Classical')) return 'CLASSICAL'
  if (title.includes('Jazz')) return 'JAZZ'
  if (title.includes('Wine')) return 'TASTING'
  if (title.includes('Gastro')) return 'FESTIVAL'
  if (title.includes('Market')) return 'MARKET'
  if (title.includes('Rooftop')) return 'PARTY'
  if (title.includes('Hiking')) return 'OUTDOORS'
  if (title.includes('Retreat')) return 'RETREAT'
  if (title.includes('Pitch')) return 'EDUCATION'
  if (title.includes('Tech Meetup')) return 'TECH'
  if (category === 'Arts') return 'ART'

  return category.toUpperCase()
}

const MONTH_TO_NUMBER: Record<string, string> = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
}

const parseDisplayDateToIso = (displayDate: string): string => {
  const match = /^(\w{3})\s+(\d{1,2}),\s+(\d{4})$/.exec(displayDate.trim())
  if (!match) {
    return ''
  }

  const [, month, day, year] = match
  const monthNumber = MONTH_TO_NUMBER[month]
  if (!monthNumber) {
    return ''
  }

  return `${year}-${monthNumber}-${day.padStart(2, '0')}`
}

const toCategoryEvent = (event: EventRecord): CategoryEvent => ({
  id: event.id,
  imageUrl: event.imageUrl,
  categoryLabel: toCategoryLabel(event.category, event.title),
  title: event.title,
  location: event.location,
  date: event.date,
  priceLabel: event.price,
  category: event.category as EventCategory,
  priceAmd: parsePriceAmd(event.price),
  dateIso: parseDisplayDateToIso(event.date),
})

export const MOCK_CATEGORY_EVENTS: CategoryEvent[] = CATEGORY_EVENTS.map(toCategoryEvent)

export const CATEGORY_EVENT_BY_ID = new Map(MOCK_CATEGORY_EVENTS.map((event) => [event.id, event]))
