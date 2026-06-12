import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

export const startMockWorker = () =>
  worker.start({
    onUnhandledRequest(request, print) {
      if (request.url.includes('/api/gemini/')) {
        return
      }

      print.warning()
    },
  })
