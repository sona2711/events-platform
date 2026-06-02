import type { EventCardData } from '@/components/features/EventCard/types'

const UNSPLASH_IMAGE_PARAMS = 'w=800&auto=format&fit=crop&q=80'

const EVENT_IMAGE_MODERN_ART = `https://images.unsplash.com/photo-1549887534-1541e9326642?${UNSPLASH_IMAGE_PARAMS}`
const EVENT_IMAGE_VAN_GOGH = `https://images.unsplash.com/photo-1577083552431-6e0b4eccfcc7?${UNSPLASH_IMAGE_PARAMS}`
const EVENT_IMAGE_CLASSICAL_NIGHT = `https://images.unsplash.com/photo-1507839093338-47a6b5132071?${UNSPLASH_IMAGE_PARAMS}`
const EVENT_IMAGE_RENAISSANCE = `https://images.unsplash.com/photo-1598488035139-bdbafb223fbe?${UNSPLASH_IMAGE_PARAMS}`
const EVENT_IMAGE_JAZZ_NIGHTS = `https://images.unsplash.com/photo-1415201364774-f6f0ff293ae1?${UNSPLASH_IMAGE_PARAMS}`
const EVENT_IMAGE_CLASSICAL_PARK = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?${UNSPLASH_IMAGE_PARAMS}`

export const MOCK_EXPLORE_EVENTS: EventCardData[] = [
  {
    id: 'event-modern-art',
    imageUrl: EVENT_IMAGE_MODERN_ART,
    categoryLabel: 'ART',
    title: 'Modern Art Exhibiti...',
    location: 'Cafesjian Center',
    date: 'Oct 12, 2026',
    priceLabel: '2,000 AMD',
  },
  {
    id: 'event-van-gogh',
    imageUrl: EVENT_IMAGE_VAN_GOGH,
    categoryLabel: 'ART',
    title: 'Van Gogh in Yerevan',
    location: 'Cafesjian Center',
    date: 'Nov 20, 2026',
    priceLabel: '1,500 AMD',
  },
  {
    id: 'event-vivaldi',
    imageUrl: EVENT_IMAGE_CLASSICAL_NIGHT,
    categoryLabel: 'CLASSICAL',
    title: 'Classical Night at O...',
    location: 'Komitas Chamber Music Hall',
    date: 'Dec 19, 2026',
    priceLabel: '5,000 AMD',
  },
  {
    id: 'event-renaissance',
    imageUrl: EVENT_IMAGE_RENAISSANCE,
    categoryLabel: 'CLASSICAL',
    title: 'Renaissance Masters Talk',
    location: 'National Gallery of Armenia',
    date: 'Mar 18, 2027',
    priceLabel: 'Free',
  },
  {
    id: 'event-jazz-nights',
    imageUrl: EVENT_IMAGE_JAZZ_NIGHTS,
    categoryLabel: 'FESTIVAL',
    title: 'Yerevan Jazz Nights',
    location: 'Republic Square',
    date: 'Apr 25, 2026',
    priceLabel: '3,500 AMD',
  },
  {
    id: 'event-classical-park',
    imageUrl: EVENT_IMAGE_CLASSICAL_PARK,
    categoryLabel: 'MUSIC',
    title: 'Classical in the Park',
    location: "Lovers' Park",
    date: 'Sep 08, 2026',
    priceLabel: 'Free',
  },
]

export const LOAD_MORE_BUTTON_LABEL = 'Load More'
