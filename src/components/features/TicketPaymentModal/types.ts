export type PaymentEvent = {
  title: string
  price: string
}

export type TicketPaymentModalProps = {
  event: PaymentEvent | null
  open: boolean
  onClose: () => void
}

export type ContactFormValues = {
  firstName: string
  lastName: string
  email: string
}

export type PaymentMethod = 'card' | 'paypal'

export type PaymentFormValues = {
  paymentMethod: PaymentMethod
  ticketQuantity: number
  cardNumber?: string
  expiration?: string
  cvc?: string
}

export type ReceiptDetails = ContactFormValues &
  PaymentFormValues & {
    amount: number
    eventTitle: string
    formattedAmount: string
  }
