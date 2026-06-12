import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import adminEn from '@/locales/admin/en.json'
import adminHy from '@/locales/admin/hy.json'
import adminRu from '@/locales/admin/ru.json'
import authEn from '@/locales/auth/en.json'
import authHy from '@/locales/auth/hy.json'
import authRu from '@/locales/auth/ru.json'
import categoriesEn from '@/locales/categories/en.json'
import categoriesHy from '@/locales/categories/hy.json'
import categoriesRu from '@/locales/categories/ru.json'
import checkoutEn from '@/locales/checkout/en.json'
import checkoutHy from '@/locales/checkout/hy.json'
import checkoutRu from '@/locales/checkout/ru.json'
import scheduleAssistantEn from '@/locales/scheduleAssistant/en.json'
import scheduleAssistantHy from '@/locales/scheduleAssistant/hy.json'
import scheduleAssistantRu from '@/locales/scheduleAssistant/ru.json'
import commonEn from '@/locales/common/en.json'
import commonHy from '@/locales/common/hy.json'
import commonRu from '@/locales/common/ru.json'
import homeEn from '@/locales/home/en.json'
import homeHy from '@/locales/home/hy.json'
import homeRu from '@/locales/home/ru.json'
import notFoundEn from '@/locales/notFound/en.json'
import notFoundHy from '@/locales/notFound/hy.json'
import notFoundRu from '@/locales/notFound/ru.json'
import profileEn from '@/locales/profile/en.json'
import profileHy from '@/locales/profile/hy.json'
import profileRu from '@/locales/profile/ru.json'

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
  'scheduleAssistant',
] as const

export type I18nNamespace = (typeof I18N_NAMESPACES)[number]

const isSupportedLanguage = (value: string): value is SupportedLanguage =>
  SUPPORTED_LANGUAGES.includes(value as SupportedLanguage)

export const getStoredLanguage = (): SupportedLanguage => {
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return stored && isSupportedLanguage(stored) ? stored : DEFAULT_LANGUAGE
}

export const resources = {
  en: {
    common: commonEn,
    home: homeEn,
    categories: categoriesEn,
    auth: authEn,
    admin: adminEn,
    notFound: notFoundEn,
    profile: profileEn,
    checkout: checkoutEn,
    scheduleAssistant: scheduleAssistantEn,
  },
  hy: {
    common: commonHy,
    home: homeHy,
    categories: categoriesHy,
    auth: authHy,
    admin: adminHy,
    notFound: notFoundHy,
    profile: profileHy,
    checkout: checkoutHy,
    scheduleAssistant: scheduleAssistantHy,
  },
  ru: {
    common: commonRu,
    home: homeRu,
    categories: categoriesRu,
    auth: authRu,
    admin: adminRu,
    notFound: notFoundRu,
    profile: profileRu,
    checkout: checkoutRu,
    scheduleAssistant: scheduleAssistantRu,
  },
} as const

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
  scheduleAssistant: {
    en: () => import('@/locales/scheduleAssistant/en.json'),
    hy: () => import('@/locales/scheduleAssistant/hy.json'),
    ru: () => import('@/locales/scheduleAssistant/ru.json'),
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

const isTestEnv = (globalThis as { __IS_JEST__?: boolean }).__IS_JEST__ === true

if (isTestEnv) {
  void i18n.use(initReactI18next).init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    defaultNS: 'common',
    ns: [...I18N_NAMESPACES],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  })
} else {
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
}

i18n.on('languageChanged', (language) => {
  if (isSupportedLanguage(language)) {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }
})

export default i18n
