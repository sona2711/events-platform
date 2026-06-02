import { Button } from 'antd'
import { EventFiltersSidebar } from '@/components/EventFiltersSidebar'
import { EventCard } from '@/components/features/EventCard'
import { LOAD_MORE_BUTTON_LABEL, MOCK_EXPLORE_EVENTS } from './consts'
import styles from './styles.module.css'

const handleApplyFilters = () => undefined

export const ExploreEventsMainContent = () => {
  return (
    <section className={styles.content} aria-label="Explore events listings">
      <div className={styles.sidebarColumn}>
        <EventFiltersSidebar onApply={handleApplyFilters} />
      </div>

      <div className={styles.results}>
        <ul className={styles.grid}>
          {MOCK_EXPLORE_EVENTS.map((event) => (
            <li key={event.id}>
              <EventCard event={event} />
            </li>
          ))}
        </ul>

        <div className={styles.loadMoreWrap}>
          <Button type="primary" className={styles.loadMoreButton}>
            {LOAD_MORE_BUTTON_LABEL}
          </Button>
        </div>
      </div>
    </section>
  )
}
