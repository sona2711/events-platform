import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from './ThemeProvider'
import { useTheme } from './useTheme'
import { THEME_STORAGE_KEY } from './consts'

const ThemeProbe = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button type="button" onClick={toggleTheme}>
        Toggle theme
      </button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light')
  })

  it('provides theme context and toggles theme', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light')

    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }))

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
  })
})
