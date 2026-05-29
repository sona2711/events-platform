import { SUBSCRIPTIONS_ENDPOINT } from './consts'

export const saveSubscriptionEmail = async (email: string) => {
  const response = await fetch(SUBSCRIPTIONS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    throw new Error('Failed to save subscription email.')
  }
}
