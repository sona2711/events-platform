export type ScheduleAssistantEvent = {
  id: string
  title: string
  category: string
  location: string
  date: string
  time: string
  price: string
  description: string
}

export const SCHEDULE_ASSISTANT_EVENTS: ScheduleAssistantEvent[] = [
  {
    id: 'event-jazz-fest',
    title: 'Yerevan Jazz Night at Cascade',
    category: 'Music',
    location: 'Cascade Complex, Yerevan',
    date: 'Oct 18, 2026',
    time: '7:00 PM',
    price: '15,000 AMD',
    description:
      'An unforgettable evening of live jazz music set against the stunning backdrop of the Cascade Complex.',
  },
  {
    id: 'event-tech-meetup-tumo',
    title: 'Tech Meetup Yerevan',
    category: 'Technology',
    location: 'TUMO Center',
    date: 'Nov 2, 2026',
    time: '6:30 PM',
    price: 'Free',
    description: "Connect with the brightest minds in Armenia's tech scene at TUMO Center.",
  },
  {
    id: 'event-wine-food-festival',
    title: 'Wine & Food Festival',
    category: 'Festival',
    location: 'Republic Square',
    date: 'Nov 10, 2026',
    time: '12:00 PM',
    price: '12,000 AMD',
    description: 'Celebrate the richness of Armenian cuisine and wine culture at Republic Square.',
  },
  {
    id: 'event-hike-hatis',
    title: 'Morning Hike to Hatis',
    category: 'Adventure',
    location: 'Hatis Mountain',
    date: 'Jul 10, 2026',
    time: '6:00 AM',
    price: '10,000 AMD',
    description:
      'Rise early and tackle the breathtaking trails of Hatis Mountain with an experienced guide.',
  },
  {
    id: 'event-art-exhibition',
    title: 'Art Exhibition',
    category: 'Art',
    location: 'National Gallery',
    date: 'Aug 15, 2026',
    time: '10:00 AM',
    price: '2,000 AMD',
    description:
      'Explore a curated selection of contemporary Armenian art at the National Gallery of Armenia.',
  },
  {
    id: 'event-modern-art',
    title: 'Modern Art Exhibition',
    category: 'Art',
    location: 'Cafesjian Center',
    date: 'Oct 12, 2026',
    time: '11:00 AM',
    price: '2,000 AMD',
    description:
      'Step inside the Cafesjian Center for the Arts and discover a world of modern creativity.',
  },
  {
    id: 'event-classical-night',
    title: 'Classical Night at Opera House',
    category: 'Classical',
    location: 'Opera House',
    date: 'Oct 12, 2026',
    time: '7:30 PM',
    price: '10,000 AMD',
    description: 'Experience the grandeur of classical music at the Yerevan Opera House.',
  },
  {
    id: 'event-gastro-fest',
    title: 'Armenian Gastro Fest',
    category: 'Festival',
    location: 'Republic Square',
    date: 'Oct 12, 2026',
    time: '1:00 PM',
    price: '5,000 AMD',
    description: 'A celebration of Armenian food culture right in the heart of Yerevan.',
  },
  {
    id: 'event-dilijan-retreat',
    title: 'Dilijan Weekend Retreat',
    category: 'Retreat',
    location: 'Dilijan Forest',
    date: 'Oct 12, 2026',
    time: '9:00 AM',
    price: '15,000 AMD',
    description: 'Escape the city for a restorative weekend in the forests of Dilijan.',
  },
  {
    id: 'event-startup-pitch',
    title: 'Startup Pitch Deck Workshop',
    category: 'Education',
    location: 'Yerevan Startup Hub',
    date: 'Oct 12, 2026',
    time: '5:00 PM',
    price: 'Free',
    description: "Learn how to craft a pitch deck that gets investors' attention.",
  },
  {
    id: 'event-hiking-garni',
    title: 'Hiking to Garni Temple',
    category: 'Adventure',
    location: 'Garni Village',
    date: 'Oct 12, 2026',
    time: '8:00 AM',
    price: '8,000 AMD',
    description: 'Follow ancient paths through the Azat River gorge to the iconic Garni Temple.',
  },
  {
    id: 'event-wine-tasting',
    title: 'Armenian Wine Tasting',
    category: 'Food & Drink',
    location: 'Cascade Complex',
    date: 'Oct 12, 2026',
    time: '6:00 PM',
    price: '12,000 AMD',
    description:
      'Discover the depth of Armenian winemaking tradition at this curated tasting event.',
  },
  {
    id: 'event-jazz-night',
    title: 'Jazz Night at Republic',
    category: 'Music',
    location: 'Republic Square',
    date: 'Oct 15, 2026',
    time: '8:00 PM',
    price: '7,500 AMD',
    description: 'An open-air jazz evening at the heart of Yerevan.',
  },
  {
    id: 'event-night-market',
    title: 'Vernissage Night Market',
    category: 'Nightlife',
    location: 'Vernissage Market',
    date: 'Oct 16, 2026',
    time: '7:00 PM',
    price: 'Free',
    description: "Yerevan's beloved Vernissage transforms into a vibrant night market.",
  },
  {
    id: 'event-farm-to-table',
    title: 'Farm to Table Dinner',
    category: 'Food & Drink',
    location: 'Matenadaran',
    date: 'Oct 17, 2026',
    time: '7:00 PM',
    price: '18,000 AMD',
    description:
      'A unique dining experience hosted in the shadow of the Matenadaran manuscript museum.',
  },
  {
    id: 'event-rooftop-party',
    title: 'Rooftop Sunset Party',
    category: 'Nightlife',
    location: 'Cascade Complex',
    date: 'Oct 19, 2026',
    time: '6:30 PM',
    price: '6,000 AMD',
    description:
      'Watch the sun set over Mount Ararat from one of the best rooftop venues in Yerevan.',
  },
  {
    id: 'event-tech-meetup',
    title: 'Yerevan Tech Meetup',
    category: 'Business',
    location: 'Yerevan Startup Hub',
    date: 'Oct 21, 2026',
    time: '6:00 PM',
    price: '3,000 AMD',
    description: "Monthly gathering of Yerevan's tech community.",
  },
]

export const getEventDetailPath = (eventId: string): string => `/event/${eventId}`

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const linkifyScheduleEventLinks = (markdown: string): string => {
  let result = markdown

  const sortedEvents = [...SCHEDULE_ASSISTANT_EVENTS].sort(
    (left, right) => right.title.length - left.title.length,
  )

  for (const event of sortedEvents) {
    const path = getEventDetailPath(event.id)

    if (result.includes(`](${path})`)) {
      continue
    }

    const escapedTitle = escapeRegExp(event.title)
    const linkMarkdown = `[**${event.title}**](${path})`

    result = result.replace(new RegExp(`\\*\\*${escapedTitle}\\*\\*`, 'g'), linkMarkdown)
  }

  return result
}
