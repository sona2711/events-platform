import { PROCESSING_FEE_AMD, SERVICE_FEE_RATE } from './consts'
import type {
  CheckoutContactValues,
  CheckoutEvent,
  CheckoutPaymentValues,
  CheckoutReadiness,
  CheckoutStepNumber,
  CheckoutStepStatus,
  OrderLineItem,
  OrderTotals,
  TicketSelection,
  TicketTier,
} from './types'

export const getCheckoutEventTitle = (event: CheckoutEvent): string => event.title ?? ''

export const getCheckoutEventLocation = (event: CheckoutEvent): string => event.location ?? ''

export const getTicketTierName = (tier: TicketTier): string => tier.name ?? ''

export const getTicketTierDescription = (tier: TicketTier): string => tier.description ?? ''

export const getOrderLineItemName = (item: OrderLineItem): string => item.name ?? ''

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EXPIRY_PATTERN = /^(0[1-9]|1[0-2])\/\d{2}$/

export const getTotalTicketCount = (selection: TicketSelection): number =>
  Object.values(selection).reduce((sum, quantity) => sum + quantity, 0)

export const calculateTicketSubtotal = (selection: TicketSelection, tiers: TicketTier[]): number =>
  tiers.reduce((subtotal, tier) => {
    const quantity = selection[tier.id] ?? 0
    return subtotal + quantity * tier.priceAmd
  }, 0)

export const calculateServiceFee = (subtotalAmd: number): number =>
  subtotalAmd > 0 ? Math.round(subtotalAmd * SERVICE_FEE_RATE) : 0

export const calculateProcessingFee = (subtotalAmd: number): number =>
  subtotalAmd > 0 ? PROCESSING_FEE_AMD : 0

export const calculateOrderTotal = (subtotalAmd: number): number =>
  subtotalAmd + calculateServiceFee(subtotalAmd) + calculateProcessingFee(subtotalAmd)

export const buildOrderTotals = (selection: TicketSelection, tiers: TicketTier[]): OrderTotals => {
  const lineItems = tiers
    .map((tier) => {
      const quantity = selection[tier.id] ?? 0
      return {
        tierId: tier.id,
        name: tier.name,
        quantity,
        amountAmd: quantity * tier.priceAmd,
      }
    })
    .filter((item) => item.quantity > 0)

  const subtotalAmd = calculateTicketSubtotal(selection, tiers)
  const serviceFeeAmd = calculateServiceFee(subtotalAmd)
  const processingFeeAmd = calculateProcessingFee(subtotalAmd)

  return {
    lineItems,
    subtotalAmd,
    serviceFeeAmd,
    processingFeeAmd,
    totalAmd: subtotalAmd + serviceFeeAmd + processingFeeAmd,
  }
}

export const formatCurrency = (amountAmd: number): string =>
  `${amountAmd.toLocaleString('en-US')} AMD`

export const formatCheckoutAmount = (amountAmd: number, freeLabel: string): string =>
  amountAmd === 0 ? freeLabel : formatCurrency(amountAmd)

export const isFreeCheckout = (totals: OrderTotals): boolean => totals.totalAmd === 0

export const normalizeCardNumber = (value = ''): string => value.replace(/\D/g, '')

export const isValidContactValues = (values: CheckoutContactValues | null): boolean => {
  if (!values) {
    return false
  }

  return values.fullName.trim().length >= 2 && EMAIL_PATTERN.test(values.email.trim())
}

export const isValidPaymentValues = (values: Partial<CheckoutPaymentValues> | null): boolean => {
  if (!values) {
    return false
  }

  const cardDigits = normalizeCardNumber(values.cardNumber)
  const expiryDate = values.expiryDate?.trim() ?? ''
  const cvvDigits = (values.cvv ?? '').replace(/\D/g, '')

  return (
    cardDigits.length >= 13 &&
    cardDigits.length <= 19 &&
    EXPIRY_PATTERN.test(expiryDate) &&
    cvvDigits.length >= 3 &&
    cvvDigits.length <= 4
  )
}

export const getCheckoutReadiness = (
  selection: TicketSelection,
  contactValues: CheckoutContactValues | null,
  paymentValues: CheckoutPaymentValues | null,
  isFree = false,
): CheckoutReadiness => {
  const hasTickets = getTotalTicketCount(selection) > 0
  const hasContact = isValidContactValues(contactValues)
  const hasPayment = isFree || isValidPaymentValues(paymentValues)

  return {
    hasTickets,
    hasContact,
    hasPayment,
    isReady: hasTickets && hasContact && hasPayment,
  }
}

export const isCheckoutReady = (
  selection: TicketSelection,
  contactValues: CheckoutContactValues | null,
  paymentValues: CheckoutPaymentValues | null,
  isFree = false,
): boolean => getCheckoutReadiness(selection, contactValues, paymentValues, isFree).isReady

export const getActiveCheckoutStep = (
  readiness: CheckoutReadiness,
  isFree = false,
): CheckoutStepNumber => {
  if (!readiness.hasTickets) {
    return 1
  }

  if (!readiness.hasContact) {
    return 2
  }

  return isFree ? 2 : 3
}

export const getCheckoutStepStatus = (
  stepNumber: CheckoutStepNumber,
  readiness: CheckoutReadiness,
  isFree = false,
): CheckoutStepStatus => {
  if (stepNumber === 1) {
    return readiness.hasTickets ? 'completed' : 'active'
  }

  if (stepNumber === 2) {
    if (!readiness.hasTickets) {
      return 'pending'
    }

    return readiness.hasContact ? 'completed' : 'active'
  }

  if (isFree) {
    if (!readiness.hasTickets || !readiness.hasContact) {
      return 'pending'
    }

    return 'completed'
  }

  if (!readiness.hasTickets || !readiness.hasContact) {
    return 'pending'
  }

  return readiness.hasPayment ? 'completed' : 'active'
}
