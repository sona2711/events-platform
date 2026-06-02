import { CategoryTabs } from '@/components/features/CategoryTabs'
import { ExploreEventsMainContent } from '@/components/features/ExploreEventsMainContent'
import { ExploreEventsPageHeader } from '@/components/features/ExploreEventsPageHeader'
import styles from './styles.module.css'

export const ExploreEventsPage = () => {
  return (
    <div className={styles.page}>
      <CategoryTabs />
      <ExploreEventsPageHeader />
      <ExploreEventsMainContent />
    </div>
  )
}
