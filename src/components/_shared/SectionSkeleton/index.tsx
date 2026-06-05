import { SECTION_SKELETON_CLASS } from './consts'
import type { SectionSkeletonProps } from './types'

export const SectionSkeleton = ({ size }: SectionSkeletonProps) => (
  <div className={SECTION_SKELETON_CLASS[size]} aria-busy="true" aria-label="Loading section" />
)
