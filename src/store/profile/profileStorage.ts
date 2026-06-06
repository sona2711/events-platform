import defaultAvatar from '@/assets/images/avatar.svg'
import type { SupportedLanguage } from '@/i18n'
import { DEFAULT_LANGUAGE } from '@/i18n'
import type { UserProfile } from '@/pages/userProfile/types'

export const PROFILE_STORAGE_KEY = 'events-platform-profile'
export const DEFAULT_PROFILE_LOCATION = 'Yerevan'

const LEGACY_DEFAULT_LOCATION = 'Yerevan, Armenia'

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
  id: '',
  fullName: '',
  location: DEFAULT_PROFILE_LOCATION,
  avatarUrl: defaultAvatar,
  email: '',
  phone: '',
  preferredLanguage: DEFAULT_LANGUAGE,
})

export const normalizeProfile = (profile: UserProfile): UserProfile => {
  const trimmedLocation = profile.location.trim()

  return {
    ...profile,
    location:
      trimmedLocation === LEGACY_DEFAULT_LOCATION || !trimmedLocation
        ? DEFAULT_PROFILE_LOCATION
        : trimmedLocation,
  }
}

export const loadProfileFromStorage = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)
    return isUserProfile(parsed) ? normalizeProfile(parsed) : null
  } catch {
    return null
  }
}

export const saveProfileToStorage = (profile: UserProfile): void => {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
}
