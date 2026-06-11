import type { EventDetailLayoutProps } from './types'
import styles from './styles.module.css'

export const EventDetailLayout = ({ main, sidebar }: EventDetailLayoutProps) => (
  <div className={styles.layout}>
    <div className={styles.main}>{main}</div>
    <aside className={styles.sidebar}>{sidebar}</aside>
  </div>
)
