import type { EventLocationDetails } from './eventDetailTypes'

export const VENUE_LOCATIONS = {
  cascade: {
    name: 'Cascade Complex, Yerevan',
    address: '10 Tamanyan St, Yerevan 0009, Armenia',
    lat: 40.190817,
    lng: 44.515528,
  },
  tumo: {
    name: 'TUMO Center, Yerevan',
    address: '16 Halabyan St, Yerevan 0038, Armenia',
    lat: 40.1894,
    lng: 44.5092,
  },
  republicSquare: {
    name: 'Republic Square, Yerevan',
    address: 'Republic Square, Yerevan 0010, Armenia',
    lat: 40.1761,
    lng: 44.5136,
  },
  hatis: {
    name: 'Hatis Mountain, Kotayk',
    address: 'Hatis Mountain, Kotayk Province, Armenia',
    lat: 40.3819,
    lng: 44.675,
  },
  nationalGallery: {
    name: 'National Gallery, Yerevan',
    address: '1 Aram St, Yerevan 0010, Armenia',
    lat: 40.1794,
    lng: 44.5141,
  },
  cafesjian: {
    name: 'Cafesjian Center, Yerevan',
    address: '10 Tamanyan St, Yerevan 0009, Armenia',
    lat: 40.1912,
    lng: 44.5159,
  },
  operaHouse: {
    name: 'Yerevan Opera House',
    address: '54 Tumanyan St, Yerevan 0002, Armenia',
    lat: 40.1856,
    lng: 44.515,
  },
  dilijan: {
    name: 'Dilijan National Park',
    address: 'Dilijan National Park, Dilijan, Armenia',
    lat: 40.7417,
    lng: 44.8631,
  },
  startupHub: {
    name: 'Yerevan Startup Hub',
    address: '41 Aram St, Yerevan 0010, Armenia',
    lat: 40.1798,
    lng: 44.5129,
  },
  garni: {
    name: 'Garni Temple, Garni Village',
    address: 'Garni Village, Kotayk Province, Armenia',
    lat: 40.1123,
    lng: 44.7302,
  },
  vernissage: {
    name: 'Vernissage Market, Yerevan',
    address: 'Aram St, Yerevan 0010, Armenia',
    lat: 40.1789,
    lng: 44.5138,
  },
  matenadaran: {
    name: 'Matenadaran, Yerevan',
    address: '53 Mesrop Mashtots Ave, Yerevan 0009, Armenia',
    lat: 40.1916,
    lng: 44.5254,
  },
} as const satisfies Record<string, EventLocationDetails>

export const EVENT_LOCATION_BY_ID: Record<string, EventLocationDetails> = {
  'event-jazz-fest': VENUE_LOCATIONS.cascade,
  'event-tech-meetup-tumo': VENUE_LOCATIONS.tumo,
  'event-wine-food-festival': VENUE_LOCATIONS.republicSquare,
  'event-hike-hatis': VENUE_LOCATIONS.hatis,
  'event-art-exhibition': VENUE_LOCATIONS.nationalGallery,
  'event-modern-art': VENUE_LOCATIONS.cafesjian,
  'event-classical-night': VENUE_LOCATIONS.operaHouse,
  'event-gastro-fest': VENUE_LOCATIONS.republicSquare,
  'event-dilijan-retreat': VENUE_LOCATIONS.dilijan,
  'event-startup-pitch': VENUE_LOCATIONS.startupHub,
  'event-hiking-garni': VENUE_LOCATIONS.garni,
  'event-wine-tasting': VENUE_LOCATIONS.cascade,
  'event-jazz-night': VENUE_LOCATIONS.republicSquare,
  'event-night-market': VENUE_LOCATIONS.vernissage,
  'event-farm-to-table': VENUE_LOCATIONS.matenadaran,
  'event-rooftop-party': VENUE_LOCATIONS.cascade,
  'event-tech-meetup': VENUE_LOCATIONS.startupHub,
}

export const LOCATION_PRESETS: Record<string, EventLocationDetails> = {
  'Cascade Complex, Yerevan': VENUE_LOCATIONS.cascade,
  'Cascade Complex': VENUE_LOCATIONS.cascade,
  'TUMO Center': VENUE_LOCATIONS.tumo,
  'Republic Square': VENUE_LOCATIONS.republicSquare,
  'Hatis Mountain': VENUE_LOCATIONS.hatis,
  'National Gallery': VENUE_LOCATIONS.nationalGallery,
  'Cafesjian Center': VENUE_LOCATIONS.cafesjian,
  'Opera House': VENUE_LOCATIONS.operaHouse,
  'Dilijan Forest': VENUE_LOCATIONS.dilijan,
  'Yerevan Startup Hub': VENUE_LOCATIONS.startupHub,
  'Garni Village': VENUE_LOCATIONS.garni,
  'Vernissage Market': VENUE_LOCATIONS.vernissage,
  Matenadaran: VENUE_LOCATIONS.matenadaran,
}
