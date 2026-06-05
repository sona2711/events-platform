import type { ReactNode } from 'react'

export type LazySectionPlaceholderSize = 'events' | 'wineFest' | 'explore' | 'subscribe'

export type LazySectionProps = {
  children: ReactNode
  placeholderSize: LazySectionPlaceholderSize
  rootMargin?: string
}
