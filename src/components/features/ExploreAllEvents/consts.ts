import modernArtImage from '@/assets/images/modernArtsExhibition.jpg'
import classicalNightImage from '@/assets/images/ClassicalNightAtOperaHouse.jpg'
import gastroFestImage from '@/assets/images/ArmenianGastroFest.JPG'
import dilijanImage from '@/assets/images/DilijanWeekendRetreat.JPG'
import startupImage from '@/assets/images/StratupPitchDeckReport.png'
import hikingImage from '@/assets/images/HikingToGarniTemple.jpg'

export type ExploreEventItem = {
  id: number
  title: string
  category: string
  location: string
  date: string
  price: string
  image: string
}

export const EXPLORE_EVENTS: ExploreEventItem[] = [
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
