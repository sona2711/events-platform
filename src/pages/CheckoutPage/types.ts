export type OrderStatus = 'idle' | 'submitting' | 'success' | 'error'

export type CheckoutLocationState = {
  ticketQuantity?: number
}

export type CheckoutEvent = {
  id: string
  title?: string
  location?: string
  imageUrl: string
  ticketTiers: TicketTier[]
}

export type TicketTier = {
  id: string
  name?: string
  description?: string
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
  name?: string
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

export type CheckoutStepNumber = 1 | 2 | 3

export type CheckoutStepStatus = 'active' | 'completed' | 'pending'
