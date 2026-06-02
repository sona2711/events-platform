import { EventsGrid } from '@/components/EventsCard'
import { Hero } from '@/components/Hero'
import { SubscribeBanner } from '@/components/features/SubscribeBanner'
import { WineFestHero } from '@/components/features/WineFestHero'
import { ExploreAllEvents } from '@/components/features/ExploreAllEvents'

export function MainPage() {
  return (
    <>
      <Hero />
      <EventsGrid />
      <WineFestHero />
      <ExploreAllEvents />
      <SubscribeBanner />
    </>
  )
}
