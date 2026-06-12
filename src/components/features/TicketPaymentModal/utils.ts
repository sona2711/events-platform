import type { Order } from '@/types'
import { createOrderId } from '@/lib/orderId'
import type { ProfileState } from '@/store/profile/profileTypes'
import type { ContactFormValues, PaymentEvent, PaymentFormValues } from './types'

export const getTicketPrice = (price: string): number => {
  if (price.toLowerCase() === 'free') return 0

  const numericPrice = Number(price.replace(/[^\d]/g, ''))

  return Number.isFinite(numericPrice) ? numericPrice : 0
}

export const getPaymentAmount = (price: string, ticketQuantity: number): number =>
  getTicketPrice(price) * ticketQuantity

export const formatAmdAmount = (amount: number): string => {
  if (amount === 0) return '0 AMD'

  return `${new Intl.NumberFormat('en-US').format(amount)} AMD`
}

export const normalizeCardNumber = (value = ''): string => value.replace(/\D/g, '')

const resolvePaymentMethod = (amount: number, paymentValues: PaymentFormValues): string => {
  if (amount === 0) {
    return 'Free'
  }

  if (paymentValues.paymentMethod === 'paypal') {
    return 'Paypal'
  }

  const cardDigits = normalizeCardNumber(paymentValues.cardNumber ?? '')
  return cardDigits.length >= 4 ? `****${cardDigits.slice(-4)}` : 'Card'
}

type BuildModalOrderInput = {
  event: PaymentEvent
  contactValues: ContactFormValues
  paymentValues: PaymentFormValues
  amount: number
  profile: ProfileState
}

export const buildModalOrder = ({
  event,
  contactValues,
  paymentValues,
  amount,
  profile,
}: BuildModalOrderInput): Order => ({
  id: createOrderId(),
  total: amount,
  status: 'pending',
  createdAt: new Date().toISOString(),
  userId: profile.id,
  userEmail: contactValues.email,
  userName: `${contactValues.firstName} ${contactValues.lastName}`.trim(),
  userPhone: profile.phone || undefined,
  paymentMethod: resolvePaymentMethod(amount, paymentValues),
  eventId: event.id != null ? String(event.id) : event.title,
  eventTitle: event.title,
  lineItems: [
    {
      name: event.title,
      quantity: paymentValues.ticketQuantity,
      amountAmd: amount,
    },
  ],
})
