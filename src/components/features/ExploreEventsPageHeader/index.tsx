import { EXPLORE_EVENTS_PAGE_COPY } from './consts'
import styles from './styles.module.css'

export const ExploreEventsPageHeader = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{EXPLORE_EVENTS_PAGE_COPY.title}</h1>
      <p className={styles.description}>{EXPLORE_EVENTS_PAGE_COPY.description}</p>
    </header>
  )
}
