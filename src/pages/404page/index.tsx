import { PagePlaceholder } from '@/components/PagePlaceholder'

export function NotFoundPage() {
  return (
    <PagePlaceholder
      eyebrow="404"
      title="Page Not Found"
      description="The page you are looking for does not exist or may have moved."
    />
  )
}
