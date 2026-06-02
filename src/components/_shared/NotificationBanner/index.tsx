import { useEffect, useState } from 'react'
import { NOTIFICATION_ICONS } from './consts'
import styles from './styles.module.css'
import type { ActiveNotification } from './types'
import { hideNotification, subscribeToNotifications } from './utils'

export function NotificationBanner() {
  const [notification, setNotification] = useState<ActiveNotification | null>(null)

  useEffect(() => subscribeToNotifications(setNotification), [])

  useEffect(() => {
    if (!notification) return undefined

    const timeoutId = window.setTimeout(() => {
      hideNotification()
    }, notification.durationMs)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [notification])

  if (!notification) return null

  return (
    <div className={styles.viewport} role="presentation">
      <aside
        className={`${styles.banner} ${styles[notification.variant]}`}
        role="status"
        aria-live="polite"
      >
        <span className={styles.icon} aria-hidden="true">
          {NOTIFICATION_ICONS[notification.variant]}
        </span>
        <div className={styles.content}>
          <p className={styles.title}>{notification.title}</p>
          <p className={styles.message}>{notification.message}</p>
        </div>
        <button
          className={styles.closeButton}
          type="button"
          aria-label="Close notification"
          onClick={hideNotification}
        >
          x
        </button>
      </aside>
    </div>
  )
}
