import type { PaymentMethod } from './types'

export const DEFAULT_TICKET_QUANTITY = 1
export const MAX_TICKET_QUANTITY = 10

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  card: 'Credit Card',
  paypal: 'Paypal',
}

export const CARD_NUMBER_PATTERN = /^\d{12,19}$/
export const EXPIRATION_PATTERN = /^(0[1-9]|1[0-2])\/\d{2}$/
export const CVC_PATTERN = /^\d{3,4}$/
