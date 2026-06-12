import type { ReactElement, ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '@/providers/theme'

type RenderWithThemeOptions = Omit<RenderOptions, 'wrapper'> & {
  wrapper?: ({ children }: { children: ReactNode }) => ReactElement
}

export const renderWithTheme = (ui: ReactElement, options?: RenderWithThemeOptions) => {
  const { wrapper: OuterWrapper, ...renderOptions } = options ?? {}

  const Wrapper = ({ children }: { children: ReactNode }) => {
    const themed = <ThemeProvider>{children}</ThemeProvider>

    return OuterWrapper ? <OuterWrapper>{themed}</OuterWrapper> : themed
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}
