import { App, notification } from 'antd'
import { type ReactNode, useEffect } from 'react'
import { DEFAULT_NOTIFICATION_DURATION_MS, NOTIFICATION_TOP_OFFSET_PX } from './consts'
import './styles.css'
import { registerMessageApi, registerNotificationApi } from './utils'

type NotificationsProviderProps = {
  children: ReactNode
}

export function NotificationsProvider({ children }: NotificationsProviderProps) {
  const { notification: notificationApi, message } = App.useApp()

  useEffect(() => {
    notification.config({
      top: NOTIFICATION_TOP_OFFSET_PX,
      duration: DEFAULT_NOTIFICATION_DURATION_MS / 1000,
      placement: 'topRight',
    })
  }, [])

  useEffect(() => {
    registerNotificationApi(notificationApi)
    registerMessageApi(message)

    return () => {
      registerNotificationApi(null)
      registerMessageApi(null)
    }
  }, [message, notificationApi])

  return children
}
