export type NotificationVariant = 'success' | 'error' | 'warning' | 'info'

export type NotificationPayload = {
  title: string
  message: string
  variant?: NotificationVariant
  durationMs?: number
}

export type SystemMessagePayload = {
  content: string
  variant?: NotificationVariant
  durationMs?: number
}
