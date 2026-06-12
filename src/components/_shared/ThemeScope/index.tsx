import type { ReactNode } from 'react'
import { useTheme } from '@/providers/theme'

type ThemeScopeProps = {
  children: ReactNode
  className?: string
}

export const ThemeScope = ({ children, className }: ThemeScopeProps) => {
  const { theme } = useTheme()

  return (
    <div data-theme-scope="app" data-theme={theme} className={className}>
      {children}
    </div>
  )
}
