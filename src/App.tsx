import { AppLocaleProvider } from '@/providers/app-locale-provider'
import { AppRouter } from '@/providers/router'

function App() {
  return (
    <AppLocaleProvider>
      <AppRouter />
    </AppLocaleProvider>
  )
}

export default App
