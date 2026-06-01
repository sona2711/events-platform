import { EventsGrid } from '@/components/EventsCard'
import { Hero } from '@/components/Hero'
import { PagePlaceholder } from '@/components/_shared/PagePlaceholder'
import { SubscribeBanner } from '@/components/features/SubscribeBanner'

export function MainPage() {
  return (
    <>
      <Hero />
      <EventsGrid />
      <PagePlaceholder namespace="home" titleKey="title" descriptionKey="description" />
      <SubscribeBanner />
    </>
  )
}
