import { EventsGrid } from '@/components/EventsCard'
import { Hero } from '@/components/Hero'
import { PagePlaceholder } from '@/components/_shared/PagePlaceholder'

export function MainPage() {
  return (
    <>
      <Hero />
      <EventsGrid />
      <PagePlaceholder namespace="home" titleKey="title" descriptionKey="description" />
    </>
  )
}
