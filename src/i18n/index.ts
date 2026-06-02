import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonEn from '@/locales/common/en.json'
import commonHy from '@/locales/common/hy.json'
import commonRu from '@/locales/common/ru.json'
import homeEn from '@/locales/home/en.json'
import homeHy from '@/locales/home/hy.json'
import homeRu from '@/locales/home/ru.json'
import categoriesEn from '@/locales/categories/en.json'
import categoriesHy from '@/locales/categories/hy.json'
import categoriesRu from '@/locales/categories/ru.json'
import authEn from '@/locales/auth/en.json'
import authHy from '@/locales/auth/hy.json'
import authRu from '@/locales/auth/ru.json'
import adminEn from '@/locales/admin/en.json'
import adminHy from '@/locales/admin/hy.json'
import adminRu from '@/locales/admin/ru.json'
import notFoundEn from '@/locales/notFound/en.json'
import notFoundHy from '@/locales/notFound/hy.json'
import notFoundRu from '@/locales/notFound/ru.json'
import profileEn from '@/locales/profile/en.json'
import profileHy from '@/locales/profile/hy.json'
import profileRu from '@/locales/profile/ru.json'
import checkoutEn from '@/locales/checkout/en.json'
import checkoutHy from '@/locales/checkout/hy.json'
import checkoutRu from '@/locales/checkout/ru.json'

export const LANGUAGE_STORAGE_KEY = 'events-platform-language'

export const SUPPORTED_LANGUAGES = ['en', 'hy', 'ru'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'

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
  },
} as const

void i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: 'common',
  ns: ['common', 'home', 'categories', 'auth', 'admin', 'notFound', 'profile', 'checkout'],
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
