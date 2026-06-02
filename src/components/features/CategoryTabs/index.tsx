import { CATEGORY_TAB_ITEMS } from './consts'
import styles from './styles.module.css'

export const CategoryTabs = () => {
  return (
    <nav className={styles.tabs} aria-label="Browse events by category">
      <ul className={styles.list}>
        {CATEGORY_TAB_ITEMS.map((item) => (
          <li key={item.id}>
            <button type="button" className={styles.tabButton}>
              <span className={styles.iconCircle} aria-hidden>
                {item.icon}
              </span>
              <span className={styles.label}>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
