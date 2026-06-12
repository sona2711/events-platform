export const DEFAULT_CONTACT_PHONE = '+374 10 530 530'

export const EVENT_CONTACT_BY_ID: Record<string, string> = {
  'event-jazz-fest': '+374 55 240 018',
  'event-tech-meetup-tumo': '+374 10 398 400',
  'event-wine-food-festival': '+374 11 510 510',
  'event-hike-hatis': '+374 93 120 450',
  'event-art-exhibition': '+374 10 581 381',
  'event-modern-art': '+374 10 567 067',
  'event-classical-night': '+374 10 522 000',
  'event-gastro-fest': '+374 11 510 510',
  'event-dilijan-retreat': '+374 77 240 240',
  'event-startup-pitch': '+374 10 398 400',
  'event-hiking-garni': '+374 93 120 450',
  'event-wine-tasting': '+374 55 240 018',
  'event-jazz-night': '+374 11 510 510',
  'event-night-market': '+374 10 530 530',
  'event-farm-to-table': '+374 10 581 381',
  'event-rooftop-party': '+374 55 240 018',
  'event-tech-meetup': '+374 10 398 400',
}

export const resolveEventContactPhone = (eventId: string): string =>
  EVENT_CONTACT_BY_ID[eventId] ?? DEFAULT_CONTACT_PHONE
