import { App as AntApp, ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import type { Locale } from 'antd/es/locale'
import { type ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { SupportedLanguage } from '@/i18n'
import { NotificationsProvider } from '@/providers/notifications'
import { INTER_FONT_FAMILY, NOTIFICATION_VARIANT_COLORS } from '@/providers/notifications/consts'
import { colors } from '@/theme/colors'

const APP_ANTD_THEME = {
  token: {
    colorPrimary: colors.blue600,
    colorSuccess: colors.lime400,
    colorError: colors.burgundy700,
    colorWarning: colors.orange500,
    colorInfo: colors.blue600,
    fontFamily: INTER_FONT_FAMILY,
    fontSize: 14,
    borderRadius: 8,
    boxShadowSecondary: '0 8px 24px rgb(119 0 22 / 6%)',
  },
  components: {
    Notification: {
      borderRadiusLG: 16,
      paddingMD: 16,
      paddingContentHorizontalLG: 16,
      colorSuccess: NOTIFICATION_VARIANT_COLORS.success,
      colorInfo: NOTIFICATION_VARIANT_COLORS.info,
      colorWarning: NOTIFICATION_VARIANT_COLORS.warning,
      colorError: NOTIFICATION_VARIANT_COLORS.error,
    },
    Message: {
      contentBg: colors.white,
      borderRadiusLG: 16,
      colorSuccess: NOTIFICATION_VARIANT_COLORS.success,
      colorInfo: NOTIFICATION_VARIANT_COLORS.info,
      colorWarning: NOTIFICATION_VARIANT_COLORS.warning,
      colorError: NOTIFICATION_VARIANT_COLORS.error,
    },
    Form: {
      labelFontSize: 14,
    },
  },
} as const

const loadAntdLocale = async (language: SupportedLanguage): Promise<Locale> => {
  switch (language) {
    case 'hy':
      return (await import('antd/locale/hy_AM')).default
    case 'ru':
      return (await import('antd/locale/ru_RU')).default
    default:
      return enUS
  }
}

type AppLocaleProviderProps = {
  children: ReactNode
}

export function AppLocaleProvider({ children }: AppLocaleProviderProps) {
  const { i18n } = useTranslation()
  const language = i18n.language as SupportedLanguage
  const [antdLocale, setAntdLocale] = useState<Locale>(enUS)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    let cancelled = false

    void loadAntdLocale(language).then((locale) => {
      if (!cancelled) {
        setAntdLocale(locale)
      }
    })

    return () => {
      cancelled = true
    }
  }, [language])

  return (
    <ConfigProvider locale={antdLocale} theme={APP_ANTD_THEME}>
      <AntApp>
        <NotificationsProvider>{children}</NotificationsProvider>
      </AntApp>
    </ConfigProvider>
  )
}
