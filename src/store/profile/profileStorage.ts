import {
  MOCK_USER_AVATAR,
  MOCK_USER_EMAIL,
  MOCK_USER_FULL_NAME,
  MOCK_USER_ID,
  MOCK_USER_LOCATION,
  MOCK_USER_PHONE,
  MOCK_USER_PREFERRED_LANGUAGE,
} from '@/pages/userProfile/consts'
import type { SupportedLanguage } from '@/i18n'
import type { UserProfile } from '@/pages/userProfile/types'

export const PROFILE_STORAGE_KEY = 'events-platform-profile'

const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['hy', 'en', 'ru']

const isSupportedLanguage = (value: unknown): value is SupportedLanguage =>
  typeof value === 'string' && SUPPORTED_LANGUAGES.includes(value as SupportedLanguage)

const isUserProfile = (value: unknown): value is UserProfile => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const profile = value as Record<string, unknown>

  return (
    typeof profile.id === 'string' &&
    typeof profile.fullName === 'string' &&
    typeof profile.location === 'string' &&
    typeof profile.avatarUrl === 'string' &&
    typeof profile.email === 'string' &&
    typeof profile.phone === 'string' &&
    isSupportedLanguage(profile.preferredLanguage)
  )
}

export const getDefaultProfile = (): UserProfile => ({
  id: MOCK_USER_ID,
  fullName: MOCK_USER_FULL_NAME,
  location: MOCK_USER_LOCATION,
  avatarUrl: MOCK_USER_AVATAR,
  email: MOCK_USER_EMAIL,
  phone: MOCK_USER_PHONE,
  preferredLanguage: MOCK_USER_PREFERRED_LANGUAGE,
})

export const loadProfileFromStorage = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)
    return isUserProfile(parsed) ? parsed : null
  } catch {
    return null
  }
}

export const saveProfileToStorage = (profile: UserProfile): void => {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
}
