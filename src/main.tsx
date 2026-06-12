import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/store'
import '@/assets/fonts'
import '@/i18n'
import { AuthProvider } from '@/providers/auth'
import App from './App'
import '../main.css'

async function enableMocking() {
  if (!import.meta.env.DEV) return
  const { startMockWorker } = await import('./mock-api/browser')
  return startMockWorker()
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </StrictMode>,
  )
})
