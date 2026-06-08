import { http, HttpResponse } from 'msw'
import { MOCK_EVENTS, MOCK_EVENTS_BY_ID } from './eventsData'
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
    return HttpResponse.json(MOCK_EVENTS)
  }),
  http.get('/api/events/:id', ({ params }) => {
    const event = MOCK_EVENTS_BY_ID.get(params.id as string)

    if (!event) {
      return HttpResponse.json({ message: 'Event not found' }, { status: 404 })
    }

    return HttpResponse.json(event)
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
