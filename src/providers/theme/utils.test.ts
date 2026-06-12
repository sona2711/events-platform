import { DEFAULT_THEME, THEME_STORAGE_KEY } from './consts'
import { persistTheme, readStoredTheme } from './utils'

describe('theme utils', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns default theme when nothing is stored and system prefers light', () => {
    window.matchMedia = jest.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? false : false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }))

    expect(readStoredTheme()).toBe(DEFAULT_THEME)
  })

  it('returns stored theme when valid', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, 'dark')
    expect(readStoredTheme()).toBe('dark')
  })

  it('persists theme to localStorage', () => {
    persistTheme('dark')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })
})
