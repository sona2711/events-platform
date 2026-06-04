import ArtImage from '@/assets/svg/Art.png'
import HikingImage from '@/assets/svg/Hiking.png'
import JazzImage from '@/assets/svg/JazzNight.png'
import TechImage from '@/assets/svg/TechSummit.png'
import WineImage from '@/assets/svg/WineTasting.png'
import type { EventCardItem, SliderBreakpointConfig } from './types'

export const EVENTS_PREV_BUTTON_CLASS = 'events-prev-button'
export const EVENTS_NEXT_BUTTON_CLASS = 'events-next-button'

export const EVENTS_PREV_BUTTON_SELECTOR = `.${EVENTS_PREV_BUTTON_CLASS}`
export const EVENTS_NEXT_BUTTON_SELECTOR = `.${EVENTS_NEXT_BUTTON_CLASS}`

export const EVENTS: EventCardItem[] = [
  {
    id: 1,
    title: 'Jazz Night at Cascade',
    category: 'Music',
    location: 'Cascade Complex',
    date: 'Oct 18, 2026',
    price: '8,000 AMD',
    image: JazzImage,
  },
  {
    id: 2,
    title: 'Tech Meetup Yerevan',
    category: 'Technology',
    location: 'TUMO Center',
    date: 'Nov 2, 2026',
    price: 'Free',
    image: TechImage,
  },
  {
    id: 3,
    title: 'Wine & Food Festival',
    category: 'Festival',
    location: 'Republic Square',
    date: 'Nov 10, 2026',
    price: '12,000 AMD',
    image: WineImage,
  },
  {
    id: 4,
    title: 'Morning Hike to Hatis',
    category: 'Adventure',
    location: 'Hatis Mountain',
    date: 'Jul 10, 2026',
    price: '10,000 AMD',
    image: HikingImage,
  },
  {
    id: 5,
    title: 'Art Exhibition',
    category: 'Art',
    location: 'National Gallery',
    date: 'Aug 15, 2026',
    price: '2,000 AMD',
    image: ArtImage,
  },
]

export const SLIDER_BREAKPOINTS: SliderBreakpointConfig = {
  0: {
    slidesPerView: 1,
    spaceBetween: 16,
  },
  640: {
    slidesPerView: 2,
    spaceBetween: 18,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 20,
  },
}
