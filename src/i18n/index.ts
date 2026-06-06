import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const LANGUAGE_STORAGE_KEY = 'events-platform-language'

export const SUPPORTED_LANGUAGES = ['en', 'hy', 'ru'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'

export const I18N_NAMESPACES = [
  'common',
  'home',
  'categories',
  'auth',
  'admin',
  'notFound',
  'profile',
  'checkout',
] as const

export type I18nNamespace = (typeof I18N_NAMESPACES)[number]

const isSupportedLanguage = (value: string): value is SupportedLanguage =>
  SUPPORTED_LANGUAGES.includes(value as SupportedLanguage)

export const getStoredLanguage = (): SupportedLanguage => {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return stored && isSupportedLanguage(stored) ? stored : DEFAULT_LANGUAGE
}

const localeLoaders: Record<
  I18nNamespace,
  Record<SupportedLanguage, () => Promise<{ default: Record<string, unknown> }>>
> = {
  common: {
    en: () => import('@/locales/common/en.json'),
    hy: () => import('@/locales/common/hy.json'),
    ru: () => import('@/locales/common/ru.json'),
  },
  home: {
    en: () => import('@/locales/home/en.json'),
    hy: () => import('@/locales/home/hy.json'),
    ru: () => import('@/locales/home/ru.json'),
  },
  categories: {
    en: () => import('@/locales/categories/en.json'),
    hy: () => import('@/locales/categories/hy.json'),
    ru: () => import('@/locales/categories/ru.json'),
  },
  auth: {
    en: () => import('@/locales/auth/en.json'),
    hy: () => import('@/locales/auth/hy.json'),
    ru: () => import('@/locales/auth/ru.json'),
  },
  admin: {
    en: () => import('@/locales/admin/en.json'),
    hy: () => import('@/locales/admin/hy.json'),
    ru: () => import('@/locales/admin/ru.json'),
  },
  notFound: {
    en: () => import('@/locales/notFound/en.json'),
    hy: () => import('@/locales/notFound/hy.json'),
    ru: () => import('@/locales/notFound/ru.json'),
  },
  profile: {
    en: () => import('@/locales/profile/en.json'),
    hy: () => import('@/locales/profile/hy.json'),
    ru: () => import('@/locales/profile/ru.json'),
  },
  checkout: {
    en: () => import('@/locales/checkout/en.json'),
    hy: () => import('@/locales/checkout/hy.json'),
    ru: () => import('@/locales/checkout/ru.json'),
  },
}

const lazyLocaleBackend = {
  type: 'backend' as const,
  read: (
    language: string,
    namespace: string,
    callback: (error: Error | null, data: Record<string, unknown> | null) => void,
  ) => {
    if (!isSupportedLanguage(language) || !I18N_NAMESPACES.includes(namespace as I18nNamespace)) {
      callback(new Error(`Unsupported locale: ${language}/${namespace}`), null)
      return
    }

    localeLoaders[namespace as I18nNamespace]
      [language]()
      .then((module) => callback(null, module.default))
      .catch((error: unknown) => {
        callback(error instanceof Error ? error : new Error(String(error)), null)
      })
  },
}

void i18n
  .use(lazyLocaleBackend)
  .use(initReactI18next)
  .init({
    lng: getStoredLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: 'common',
    ns: ['common', 'home'],
    partialBundledLanguages: true,
    interpolation: {
      escapeValue: false,
    },
  })

i18n.on('languageChanged', (language) => {
  if (isSupportedLanguage(language)) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }
})

export default i18n
