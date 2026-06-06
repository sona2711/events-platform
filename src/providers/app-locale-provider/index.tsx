import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import type { Locale } from 'antd/es/locale'
import { type ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { SupportedLanguage } from '@/i18n'
import { colors } from '@/theme/colors'

const APP_ANTD_THEME = {
  token: {
    colorPrimary: colors.blue600,
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
      {children}
    </ConfigProvider>
  )
}
