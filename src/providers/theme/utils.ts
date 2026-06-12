import { DEFAULT_THEME, THEME_STORAGE_KEY } from './consts'
import type { ThemeMode } from './types'

const isThemeMode = (value: string | null): value is ThemeMode =>
  value === 'light' || value === 'dark'

export const readStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME
  }

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (isThemeMode(stored)) {
    return stored
  }

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }

  return DEFAULT_THEME
}

export const persistTheme = (theme: ThemeMode) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, theme)
}
