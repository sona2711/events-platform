import ArtImage from '@/assets/svg/Art.webp'
import HikingImage from '@/assets/svg/Hiking.webp'
import JazzImage from '@/assets/svg/JazzNight.webp'
import TechImage from '@/assets/svg/TechSummit.webp'
import WineImage from '@/assets/svg/WineTasting.webp'
import modernArtImage from '@/assets/images/modernArtsExhibition.webp'
import classicalNightImage from '@/assets/images/ClassicalNightAtOperaHouse.webp'
import gastroFestImage from '@/assets/images/ArmenianGastroFest.webp'
import dilijanImage from '@/assets/images/DilijanWeekendRetreat.webp'
import startupImage from '@/assets/images/StratupPitchDeckReport.webp'
import hikingToGarniImage from '@/assets/images/HikingToGarniTemple.webp'

export type EventDetail = {
  id: string
  title: string
  category: string
  imageUrl: string
  location: string
  date: string
  price: string
  description: string
}

export const MOCK_EVENTS: EventDetail[] = [
  {
    id: '1',
    title: 'Jazz Night at Cascade',
    category: 'Music',
    imageUrl: JazzImage,
    location: 'Cascade Complex',
    date: 'Oct 18, 2026',
    price: '8,000 AMD',
    description:
      'An unforgettable evening of live jazz music set against the stunning backdrop of the Cascade Complex. Featuring local and international artists, this intimate concert brings together jazz lovers for a night of soulful melodies and improvisational brilliance.',
  },
  {
    id: '2',
    title: 'Tech Meetup Yerevan',
    category: 'Technology',
    imageUrl: TechImage,
    location: 'TUMO Center',
    date: 'Nov 2, 2026',
    price: 'Free',
    description:
      "Connect with the brightest minds in Armenia's tech scene at TUMO Center. This monthly meetup features lightning talks, panel discussions, and networking opportunities for developers, designers, and entrepreneurs.",
  },
  {
    id: '3',
    title: 'Wine & Food Festival',
    category: 'Festival',
    imageUrl: WineImage,
    location: 'Republic Square',
    date: 'Nov 10, 2026',
    price: '12,000 AMD',
    description:
      'Celebrate the richness of Armenian cuisine and wine culture at Republic Square. Sample over 50 local wines, traditional dishes, and artisan products from producers across all regions of Armenia.',
  },
  {
    id: '4',
    title: 'Morning Hike to Hatis',
    category: 'Adventure',
    imageUrl: HikingImage,
    location: 'Hatis Mountain',
    date: 'Jul 10, 2026',
    price: '10,000 AMD',
    description:
      'Rise early and tackle the breathtaking trails of Hatis Mountain with an experienced guide. The hike offers panoramic views of Yerevan and Mount Ararat — a rewarding adventure for nature lovers of all fitness levels.',
  },
  {
    id: '5',
    title: 'Art Exhibition',
    category: 'Art',
    imageUrl: ArtImage,
    location: 'National Gallery',
    date: 'Aug 15, 2026',
    price: '2,000 AMD',
    description:
      'Explore a curated selection of contemporary Armenian art at the National Gallery of Armenia. Featuring works by emerging and established artists, this exhibition explores themes of identity, memory, and transformation.',
  },
  {
    id: '6',
    title: 'Modern Art Exhibition',
    category: 'Art',
    imageUrl: modernArtImage,
    location: 'Cafesjian Center',
    date: 'Oct 12, 2026',
    price: '2,000 AMD',
    description:
      'Step inside the Cafesjian Center for the Arts and discover a world of modern creativity. This exhibition showcases bold new works from Armenian and international artists, spanning painting, sculpture, and multimedia installations.',
  },
  {
    id: '7',
    title: 'Classical Night at Opera House',
    category: 'Classical',
    imageUrl: classicalNightImage,
    location: 'Opera House',
    date: 'Oct 12, 2026',
    price: '10,000 AMD',
    description:
      'Experience the grandeur of classical music at the Yerevan Opera House. An evening of orchestral masterpieces performed by the Armenian Philharmonic Orchestra, featuring works by Komitas, Khachaturian, and Beethoven.',
  },
  {
    id: '8',
    title: 'Armenian Gastro Fest',
    category: 'Festival',
    imageUrl: gastroFestImage,
    location: 'Republic Square',
    date: 'Oct 12, 2026',
    price: '5,000 AMD',
    description:
      "A celebration of Armenian food culture right in the heart of Yerevan. Sample dishes from every corner of the country, meet the chefs behind the recipes, and discover why Armenian cuisine is one of the region's best-kept secrets.",
  },
  {
    id: '9',
    title: 'Dilijan Weekend Retreat',
    category: 'Retreat',
    imageUrl: dilijanImage,
    location: 'Dilijan Forest',
    date: 'Oct 12, 2026',
    price: '15,000 AMD',
    description:
      "Escape the city for a restorative weekend in the forests of Dilijan. Guided meditation, forest walks, and wellness workshops set against the backdrop of Armenia's most serene national park. Accommodation and meals included.",
  },
  {
    id: '10',
    title: 'Startup Pitch Deck Workshop',
    category: 'Education',
    imageUrl: startupImage,
    location: 'Yerevan Startup Hub',
    date: 'Oct 12, 2026',
    price: 'Free',
    description:
      "Learn how to craft a pitch deck that gets investors' attention. This hands-on workshop is led by experienced founders and VCs from Armenia's growing startup ecosystem. Open to entrepreneurs at any stage.",
  },
  {
    id: '11',
    title: 'Hiking to Garni Temple',
    category: 'Tech',
    imageUrl: hikingToGarniImage,
    location: 'Garni Village',
    date: 'Oct 12, 2026',
    price: '8,000 AMD',
    description:
      'Follow ancient paths through the Azat River gorge to the iconic Garni Temple. This guided hike combines stunning natural scenery with a deep dive into Armenian history, ending at the only surviving Hellenistic structure in the country.',
  },
]

export const MOCK_EVENTS_BY_ID = new Map(MOCK_EVENTS.map((event) => [event.id, event]))
