export type NotificationVariant = 'success' | 'error' | 'info'

export type NotificationPayload = {
  title: string
  message: string
  variant?: NotificationVariant
  durationMs?: number
}

export type ActiveNotification = Required<
  Pick<NotificationPayload, 'title' | 'message' | 'variant'>
> & {
  id: number
  durationMs: number
}

export type NotificationListener = (notification: ActiveNotification | null) => void
