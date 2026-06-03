import { EventFiltersSidebar } from '@/components/EventFiltersSidebar'
import styles from './styles.module.css'

export function ExploreEventsInYerevanPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Explore Events in Yerevan</h1>
      <p className={styles.subtitle}>
        Discover upcoming gatherings, talks, and community events across the city.
      </p>

      <div className={styles.layout}>
        <aside className={styles.sidebarColumn}>
          <EventFiltersSidebar onApply={() => undefined} />
        </aside>

        <div className={styles.contentPlaceholder}>Event cards will appear here</div>
      </div>
    </div>
  )
}
