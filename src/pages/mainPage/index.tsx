import { PagePlaceholder } from '@/components/_shared/PagePlaceholder'
import { SubscribeBanner } from '@/components/features/SubscribeBanner'

export function MainPage() {
  return (
    <>
      <PagePlaceholder namespace="home" titleKey="title" descriptionKey="description" />
      <SubscribeBanner />
    </>
  )
}
