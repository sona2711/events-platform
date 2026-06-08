import type { MessageInstance } from 'antd/es/message/interface'
import type { NotificationInstance } from 'antd/es/notification/interface'
import { DEFAULT_NOTIFICATION_DURATION_MS } from './consts'
import type { NotificationPayload, NotificationVariant, SystemMessagePayload } from './types'

const VARIANT_METHODS: Record<
  NotificationVariant,
  keyof Pick<NotificationInstance, 'success' | 'error' | 'warning' | 'info'>
> = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
}

let notificationApi: NotificationInstance | null = null
let messageApi: MessageInstance | null = null

export const registerNotificationApi = (api: NotificationInstance | null) => {
  notificationApi = api
}

export const registerMessageApi = (api: MessageInstance | null) => {
  messageApi = api
}

export const showNotification = ({
  title,
  message,
  variant = 'info',
  durationMs = DEFAULT_NOTIFICATION_DURATION_MS,
}: NotificationPayload) => {
  if (!notificationApi) {
    return
  }

  notificationApi[VARIANT_METHODS[variant]]({
    message: title,
    description: message,
    duration: durationMs / 1000,
  })
}

export const hideNotification = () => {
  notificationApi?.destroy()
}

export const showSystemMessage = ({
  content,
  variant = 'info',
  durationMs = DEFAULT_NOTIFICATION_DURATION_MS,
}: SystemMessagePayload) => {
  if (!messageApi) {
    return
  }

  messageApi[VARIANT_METHODS[variant]](content, durationMs / 1000)
}
