import type { ReactElement, ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@/providers/theme'
import { createTestStore, type TestStore } from './createTestStore'

type RenderWithThemeOptions = Omit<RenderOptions, 'wrapper'> & {
  wrapper?: ({ children }: { children: ReactNode }) => ReactElement
  store?: TestStore
}

export const renderWithTheme = (ui: ReactElement, options?: RenderWithThemeOptions) => {
  const { wrapper: OuterWrapper, store = createTestStore(), ...renderOptions } = options ?? {}

  const Wrapper = ({ children }: { children: ReactNode }) => {
    const themed = (
      <Provider store={store}>
        <ThemeProvider>{children}</ThemeProvider>
      </Provider>
    )

    return OuterWrapper ? <OuterWrapper>{themed}</OuterWrapper> : themed
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}
