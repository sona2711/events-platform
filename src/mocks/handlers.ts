import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/events', () => {
    return HttpResponse.json([
      { id: '1', title: 'Event One', date: '2026-06-01' },
      { id: '2', title: 'Event Two', date: '2026-06-15' },
    ])
  }),
]
