import { getDefaultProfile } from '@/store/profile'
import { buildModalOrder } from './utils'

describe('buildModalOrder', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: {
        randomUUID: () => 'test-order-id',
      },
      configurable: true,
    })
  })

  it('builds a free ticket order with Free payment method', () => {
    const order = buildModalOrder({
      event: { id: '2', title: 'Tech Meetup Yerevan', price: 'Free' },
      contactValues: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      },
      paymentValues: {
        ticketQuantity: 1,
      },
      amount: 0,
      profile: getDefaultProfile(),
    })

    expect(order.eventId).toBe('2')
    expect(order.eventTitle).toBe('Tech Meetup Yerevan')
    expect(order.total).toBe(0)
    expect(order.paymentMethod).toBe('Free')
    expect(order.userName).toBe('John Doe')
    expect(order.userEmail).toBe('john@example.com')
    expect(order.lineItems).toEqual([
      {
        name: 'Tech Meetup Yerevan',
        quantity: 1,
        amountAmd: 0,
      },
    ])
  })

  it('masks card payment method for paid tickets', () => {
    const order = buildModalOrder({
      event: { id: 1, title: 'Jazz Night', price: '8,000 AMD' },
      contactValues: {
        firstName: 'Anna',
        lastName: 'Smith',
        email: 'anna@example.com',
      },
      paymentValues: {
        paymentMethod: 'card',
        ticketQuantity: 2,
        cardNumber: '4111111111111111',
      },
      amount: 16000,
      profile: getDefaultProfile(),
    })

    expect(order.paymentMethod).toBe('****1111')
    expect(order.lineItems[0]?.quantity).toBe(2)
    expect(order.lineItems[0]?.amountAmd).toBe(16000)
  })
})
