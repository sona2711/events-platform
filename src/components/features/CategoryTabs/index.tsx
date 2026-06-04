import { CATEGORY_TAB_ITEMS } from './consts'
import type { CategoryTabsProps } from './types'
import styles from './styles.module.css'

export const CategoryTabs = ({ activeCategoryId, onCategorySelect }: CategoryTabsProps) => {
  return (
    <nav className={styles.tabs} aria-label="Browse events by category">
      <span className={styles.scrollHint} aria-hidden="true" />
      <ul className={styles.list}>
        {CATEGORY_TAB_ITEMS.map((item) => {
          const isActive = item.id === activeCategoryId

          return (
            <li key={item.id}>
              <button
                type="button"
                className={
                  isActive ? `${styles.tabButton} ${styles.tabButtonActive}` : styles.tabButton
                }
                aria-pressed={isActive}
                onClick={() => onCategorySelect(item.id)}
              >
                <span
                  className={
                    isActive ? `${styles.iconCircle} ${styles.iconCircleActive}` : styles.iconCircle
                  }
                  aria-hidden
                >
                  {item.icon}
                </span>
                <span className={styles.label}>{item.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
