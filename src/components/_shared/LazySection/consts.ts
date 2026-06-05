import type { LazySectionPlaceholderSize } from './types'
import styles from './styles.module.css'

export const LAZY_SECTION_PLACEHOLDER_CLASS: Record<LazySectionPlaceholderSize, string> = {
  events: styles.placeholderEvents,
  wineFest: styles.placeholderWineFest,
  explore: styles.placeholderExplore,
  subscribe: styles.placeholderSubscribe,
}

export const DEFAULT_LAZY_SECTION_ROOT_MARGIN = '240px 0px'
