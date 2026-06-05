import modernArtImage from '@/assets/images/modernArtsExhibition.webp'
import classicalNightImage from '@/assets/images/ClassicalNightAtOperaHouse.webp'
import gastroFestImage from '@/assets/images/ArmenianGastroFest.webp'
import dilijanImage from '@/assets/images/DilijanWeekendRetreat.webp'
import startupImage from '@/assets/images/StratupPitchDeckReport.webp'
import hikingImage from '@/assets/images/HikingToGarniTemple.webp'
import { mapEventsToCardData } from '@/components/features/EventCard/utils'
import type { ListingEventInput } from '@/components/features/EventCard/types'

export const EXPLORE_EVENTS: ListingEventInput[] = [
  {
    id: 1,
    title: 'Modern Art Exhibition',
    category: 'Art',
    location: 'Cafesjian Center',
    date: 'Oct 12, 2026',
    price: '2,000 AMD',
    image: modernArtImage,
  },
  {
    id: 2,
    title: 'Classical Night at Opera House',
    category: 'Classical',
    location: 'Opera House',
    date: 'Oct 12, 2026',
    price: '10,000 AMD',
    image: classicalNightImage,
  },
  {
    id: 3,
    title: 'Armenian Gastro Fest',
    category: 'Festival',
    location: 'Republic Square',
    date: 'Oct 12, 2026',
    price: '5,000 AMD',
    image: gastroFestImage,
  },
  {
    id: 4,
    title: 'Dilijan Weekend Retreat',
    category: 'Retreat',
    location: 'Dilijan Forest',
    date: 'Oct 12, 2026',
    price: '15,000 AMD',
    image: dilijanImage,
  },
  {
    id: 5,
    title: 'Startup Pitch Deck Workshop',
    category: 'Education',
    location: 'Yerevan Startup Hub',
    date: 'Oct 12, 2026',
    price: 'Free',
    image: startupImage,
  },
  {
    id: 6,
    title: 'Hiking to Garni Temple',
    category: 'Tech',
    location: 'Garni Village',
    date: 'Oct 12, 2026',
    price: '8,000 AMD',
    image: hikingImage,
  },
]

export const EXPLORE_EVENTS_CARD_DATA = mapEventsToCardData(EXPLORE_EVENTS)

export const EXPLORE_EVENT_BY_ID = new Map(EXPLORE_EVENTS.map((event) => [String(event.id), event]))
