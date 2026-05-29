export const SUBSCRIBE_COPY = {
  titleStart: 'Stay Ahead',
  titleMiddle: 'of the',
  titleAccent: 'Pulse',
  description:
    'Get the latest event updates, exclusive ticket presales, and city guides delivered to your inbox every week.',
  emailPlaceholder: 'your@email.com',
  buttonLabel: 'Subscribe',
  invalidEmailTitle: 'Check your email',
  invalidEmailMessage: 'Please enter a valid email address, for example name@example.com.',
  successTitle: 'Subscription successful',
  successMessage: 'You will be notified about upcoming events.',
} as const

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
