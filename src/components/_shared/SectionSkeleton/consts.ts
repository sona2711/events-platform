import type { LazySectionPlaceholderSize } from '@/components/_shared/LazySection/types'
import styles from './styles.module.css'

export const SECTION_SKELETON_CLASS: Record<LazySectionPlaceholderSize, string> = {
  events: styles.skeletonEvents,
  wineFest: styles.skeletonWineFest,
  explore: styles.skeletonExplore,
  subscribe: styles.skeletonSubscribe,
}
