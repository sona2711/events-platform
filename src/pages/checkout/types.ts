export type OrderStatus = 'idle' | 'submitting' | 'success' | 'error'

export type CheckoutEvent = {
  id: string
  titleKey: string
  locationKey: string
  imageUrl: string
}

export type TicketTier = {
  id: string
  nameKey: string
  descriptionKey: string
  priceAmd: number
  maxQuantity: number
}

export type TicketSelection = Record<string, number>

export type CheckoutContactValues = {
  fullName: string
  email: string
}

export type CheckoutPaymentValues = {
  cardNumber: string
  expiryDate: string
  cvv: string
}

export type OrderLineItem = {
  tierId: string
  nameKey: string
  quantity: number
  amountAmd: number
}

export type OrderTotals = {
  lineItems: OrderLineItem[]
  subtotalAmd: number
  serviceFeeAmd: number
  processingFeeAmd: number
  totalAmd: number
}

export type CheckoutReadiness = {
  hasTickets: boolean
  hasContact: boolean
  hasPayment: boolean
  isReady: boolean
}
