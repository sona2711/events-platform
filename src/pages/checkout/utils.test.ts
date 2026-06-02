import { CHECKOUT_TICKET_TIERS, DEFAULT_TICKET_SELECTION } from './consts'
import {
  buildOrderTotals,
  calculateOrderTotal,
  calculateProcessingFee,
  calculateServiceFee,
  calculateTicketSubtotal,
  formatCurrency,
  getCheckoutReadiness,
  isCheckoutReady,
  isValidContactValues,
  isValidPaymentValues,
} from './utils'

describe('checkout utils', () => {
  it('calculates subtotal, fees, and total for default selection', () => {
    const subtotal = calculateTicketSubtotal(DEFAULT_TICKET_SELECTION, CHECKOUT_TICKET_TIERS)
    expect(subtotal).toBe(30_000)
    expect(calculateServiceFee(subtotal)).toBe(2_800)
    expect(calculateProcessingFee(subtotal)).toBe(800)
    expect(calculateOrderTotal(subtotal)).toBe(33_600)
  })

  it('builds order totals with line items', () => {
    const totals = buildOrderTotals(DEFAULT_TICKET_SELECTION, CHECKOUT_TICKET_TIERS)

    expect(totals.lineItems).toHaveLength(1)
    expect(totals.lineItems[0]).toMatchObject({
      tierId: 'general-admission',
      quantity: 2,
      amountAmd: 30_000,
    })
    expect(totals.totalAmd).toBe(33_600)
  })

  it('formats currency in AMD', () => {
    expect(formatCurrency(33600)).toBe('33,600 AMD')
  })

  it('validates contact and payment values', () => {
    expect(
      isValidContactValues({
        fullName: 'Alex Rivers',
        email: 'alex.rivers@example.com',
      }),
    ).toBe(true)

    expect(
      isValidPaymentValues({
        cardNumber: '4111 1111 1111 1111',
        expiryDate: '12/28',
        cvv: '123',
      }),
    ).toBe(true)
  })

  it('reports checkout readiness based on tickets, contact, and payment', () => {
    const contact = {
      fullName: 'Alex Rivers',
      email: 'alex.rivers@example.com',
    }
    const payment = {
      cardNumber: '4111111111111111',
      expiryDate: '12/28',
      cvv: '123',
    }

    expect(getCheckoutReadiness(DEFAULT_TICKET_SELECTION, contact, null).isReady).toBe(false)
    expect(isCheckoutReady(DEFAULT_TICKET_SELECTION, contact, payment)).toBe(true)
  })
})
