import { lazy, Suspense } from 'react'
import { Hero } from '@/components/Hero'
import { LazySection } from '@/components/_shared/LazySection'
import { SectionSkeleton } from '@/components/_shared/SectionSkeleton'
import { EXPLORE_ALL_EVENTS_SECTION_ID } from '@/components/features/homepage/consts'

const EventsGrid = lazy(() =>
  import('@/components/EventsCard').then((module) => ({ default: module.EventsGrid })),
)

const WineFestHero = lazy(() =>
  import('@/components/features/WineFestHero').then((module) => ({ default: module.WineFestHero })),
)

const ExploreAllEvents = lazy(() =>
  import('@/components/features/ExploreAllEvents').then((module) => ({
    default: module.ExploreAllEvents,
  })),
)

const SubscribeBanner = lazy(() =>
  import('@/components/features/SubscribeBanner').then((module) => ({
    default: module.SubscribeBanner,
  })),
)

export const MainPage = () => {
  return (
    <>
      <Hero />
      <LazySection placeholderSize="events">
        <Suspense fallback={<SectionSkeleton size="events" />}>
          <EventsGrid />
        </Suspense>
      </LazySection>
      <LazySection placeholderSize="wineFest">
        <Suspense fallback={<SectionSkeleton size="wineFest" />}>
          <WineFestHero />
        </Suspense>
      </LazySection>
      <LazySection id={EXPLORE_ALL_EVENTS_SECTION_ID} placeholderSize="explore">
        <Suspense fallback={<SectionSkeleton size="explore" />}>
          <ExploreAllEvents />
        </Suspense>
      </LazySection>
      <LazySection placeholderSize="subscribe">
        <Suspense fallback={<SectionSkeleton size="subscribe" />}>
          <SubscribeBanner />
        </Suspense>
      </LazySection>
    </>
  )
}
