import type { EventCardData } from '@/components/features/EventCard/types'
import modernArtImage from '@/assets/images/modernArtsExhibition.jpg'
import classicalNightImage from '@/assets/images/ClassicalNightAtOperaHouse.jpg'
import gastroFestImage from '@/assets/images/ArmenianGastroFest.JPG'
import dilijanImage from '@/assets/images/DilijanWeekendRetreat.JPG'
import startupImage from '@/assets/images/StratupPitchDeckReport.png'
import hikingImage from '@/assets/images/HikingToGarniTemple.jpg'

export const MOCK_EXPLORE_EVENTS: EventCardData[] = [
  {
    id: 'event-modern-art',
    imageUrl: modernArtImage,
    categoryLabel: 'ART',
    title: 'Modern Art Exhibiti...',
    location: 'Cafesjian Center',
    date: 'Oct 12, 2026',
    priceLabel: '2,000 AMD',
  },
  {
    id: 'event-classical-night',
    imageUrl: classicalNightImage,
    categoryLabel: 'CLASSICAL',
    title: 'Classical Night at O...',
    location: 'Opera House',
    date: 'Oct 12, 2026',
    priceLabel: '10,000 AMD',
  },
  {
    id: 'event-gastro-fest',
    imageUrl: gastroFestImage,
    categoryLabel: 'FESTIVAL',
    title: 'Armenian Gastro F...',
    location: 'Republic Square',
    date: 'Oct 12, 2026',
    priceLabel: '5,000 AMD',
  },
  {
    id: 'event-dilijan-retreat',
    imageUrl: dilijanImage,
    categoryLabel: 'RETREAT',
    title: 'Dilijan Weekend Re...',
    location: 'Dilijan Forest',
    date: 'Oct 12, 2026',
    priceLabel: '15,000 AMD',
  },
  {
    id: 'event-startup-pitch',
    imageUrl: startupImage,
    categoryLabel: 'EDUCATION',
    title: 'Startup Pitch Deck...',
    location: 'Yerevan Startup Hub',
    date: 'Oct 12, 2026',
    priceLabel: 'Free',
  },
  {
    id: 'event-hiking-garni',
    imageUrl: hikingImage,
    categoryLabel: 'TECH',
    title: 'Hiking to Garni Tem...',
    location: 'Garni Village',
    date: 'Oct 12, 2026',
    priceLabel: '8,000 AMD',
  },
]

export const LOAD_MORE_BUTTON_LABEL = 'Load More'
