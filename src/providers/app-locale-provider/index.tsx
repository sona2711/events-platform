import { ConfigProvider } from 'antd'
import enUS from 'antd/locale/en_US'
import hyAM from 'antd/locale/hy_AM'
import ruRU from 'antd/locale/ru_RU'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { SupportedLanguage } from '@/i18n'
import { colors } from '@/theme/colors'

const antdLocales: Record<SupportedLanguage, typeof enUS> = {
  en: enUS,
  hy: hyAM,
  ru: ruRU,
}

type AppLocaleProviderProps = {
  children: ReactNode
}

export function AppLocaleProvider({ children }: AppLocaleProviderProps) {
  const { i18n } = useTranslation()
  const language = i18n.language as SupportedLanguage
  const antdLocale = antdLocales[language] ?? enUS

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <ConfigProvider locale={antdLocale} theme={{ token: { colorPrimary: colors.blue600 } }}>
      {children}
    </ConfigProvider>
  )
}
