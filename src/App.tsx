import { AppLocaleProvider } from '@/providers/app-locale-provider'
import { AppRouter } from '@/providers/router'
import { Toaster } from 'sonner'

function App() {
  return (
    <AppLocaleProvider>
      <AppRouter />
      <Toaster richColors position="bottom-right" />
    </AppLocaleProvider>
  )
}

export default App
