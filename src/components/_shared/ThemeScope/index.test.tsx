import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/providers/theme'
import { ThemeScope } from './index'

describe('ThemeScope', () => {
  beforeEach(() => {
    window.localStorage.setItem('app-theme', 'dark')
  })

  it('renders scoped theme attributes from provider', () => {
    render(
      <ThemeProvider>
        <ThemeScope>
          <span>Scoped content</span>
        </ThemeScope>
      </ThemeProvider>,
    )

    const scope = screen.getByText('Scoped content').parentElement

    expect(scope).toHaveAttribute('data-theme-scope', 'app')
    expect(scope).toHaveAttribute('data-theme', 'dark')
  })
})
