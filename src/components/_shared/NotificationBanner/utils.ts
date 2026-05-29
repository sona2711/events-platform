import { DEFAULT_NOTIFICATION_DURATION_MS } from './consts'
import type { ActiveNotification, NotificationListener, NotificationPayload } from './types'

const listeners = new Set<NotificationListener>()
let notificationId = 0

const emitNotification = (notification: ActiveNotification | null) => {
  listeners.forEach((listener) => listener(notification))
}

export const subscribeToNotifications = (listener: NotificationListener) => {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export const showNotification = ({
  title,
  message,
  variant = 'info',
  durationMs = DEFAULT_NOTIFICATION_DURATION_MS,
}: NotificationPayload) => {
  notificationId += 1

  emitNotification({
    id: notificationId,
    title,
    message,
    variant,
    durationMs,
  })
}

export const hideNotification = () => {
  emitNotification(null)
}
