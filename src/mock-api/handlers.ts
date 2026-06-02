import { http, HttpResponse } from 'msw'
import { addSubscriptionEmail, subscriptionEmailTable } from './subscriptionEmailTable'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type SubscriptionRequestBody = {
  email: string
}

const isSubscriptionRequestBody = (value: unknown): value is SubscriptionRequestBody => {
  if (!value || typeof value !== 'object') return false

  return 'email' in value && typeof value.email === 'string'
}

export const handlers = [
  http.get('/api/events', () => {
    return HttpResponse.json([
      { id: '1', title: 'Event One', date: '2026-06-01' },
      { id: '2', title: 'Event Two', date: '2026-06-15' },
    ])
  }),
  http.get('/api/subscriptions', () => {
    return HttpResponse.json(subscriptionEmailTable)
  }),
  http.post('/api/subscriptions', async ({ request }) => {
    const body = await request.json()

    if (!isSubscriptionRequestBody(body)) {
      return HttpResponse.json({ message: 'Email is required.' }, { status: 400 })
    }

    const email = body.email.trim().toLowerCase()

    if (!EMAIL_PATTERN.test(email)) {
      return HttpResponse.json({ message: 'Email is invalid.' }, { status: 400 })
    }

    const subscription = addSubscriptionEmail(email)

    return HttpResponse.json(subscription, { status: 201 })
  }),
]
