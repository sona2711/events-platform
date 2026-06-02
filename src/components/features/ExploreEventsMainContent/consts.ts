import carolineAttwoodImage from '@/assets/images/caroline-attwood-z38uTGNpNnA-unsplash.jpg'
import ewanBuckImage from '@/assets/images/ewan-buck-xc9B3i-1QiI-unsplash.jpg'
import headwayImage from '@/assets/images/headway-F2KRf_QfCqw-unsplash.jpg'
import larisaBirtaImage from '@/assets/images/larisa-birta-slbOcNlWNHA-unsplash.jpg'
import markusSpiskeImage from '@/assets/images/markus-spiske-RmvlD0oTsAo-unsplash.jpg'
import simonEnglishImage from '@/assets/images/simon-english-48nerZQCHgo-unsplash.jpg'
import type { EventCardData } from '@/components/features/EventCard/types'

export const MOCK_EXPLORE_EVENTS: EventCardData[] = [
  {
    id: 'event-modern-art',
    imageUrl: headwayImage,
    categoryLabel: 'ART',
    title: 'Modern Art Exhibiti...',
    location: 'Cafesjian Center',
    date: 'Oct 12, 2026',
    priceLabel: '2,000 AMD',
  },
  {
    id: 'event-van-gogh',
    imageUrl: ewanBuckImage,
    categoryLabel: 'ART',
    title: 'Van Gogh in Yerevan',
    location: 'Cafesjian Center',
    date: 'Nov 20, 2026',
    priceLabel: '1,500 AMD',
  },
  {
    id: 'event-vivaldi',
    imageUrl: carolineAttwoodImage,
    categoryLabel: 'CLASSICAL',
    title: 'Classical Night at O...',
    location: 'Komitas Chamber Music Hall',
    date: 'Dec 19, 2026',
    priceLabel: '5,000 AMD',
  },
  {
    id: 'event-renaissance',
    imageUrl: larisaBirtaImage,
    categoryLabel: 'CLASSICAL',
    title: 'Renaissance Masters Talk',
    location: 'National Gallery of Armenia',
    date: 'Mar 18, 2027',
    priceLabel: 'Free',
  },
  {
    id: 'event-jazz-nights',
    imageUrl: simonEnglishImage,
    categoryLabel: 'FESTIVAL',
    title: 'Yerevan Jazz Nights',
    location: 'Republic Square',
    date: 'Apr 25, 2026',
    priceLabel: '3,500 AMD',
  },
  {
    id: 'event-classical-park',
    imageUrl: markusSpiskeImage,
    categoryLabel: 'MUSIC',
    title: 'Classical in the Park',
    location: "Lovers' Park",
    date: 'Sep 08, 2026',
    priceLabel: 'Free',
  },
]

export const LOAD_MORE_BUTTON_LABEL = 'Load More'
