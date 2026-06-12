import { AppLocaleProvider } from '@/providers/app-locale-provider'
import { AppRouter } from '@/providers/router'
import { ThemeProvider } from '@/providers/theme'

function App() {
  return (
    <ThemeProvider>
      <AppLocaleProvider>
        <AppRouter />
      </AppLocaleProvider>
    </ThemeProvider>
  )
}

export default App
