import type { Order } from './types.js'

const formatLineItems = (lineItems: Order['lineItems']): string[] =>
  lineItems.map(
    (item) => `  • ${item.name} x${item.quantity} — ${item.amountAmd.toLocaleString('en-US')} AMD`,
  )

export const formatOrderMessage = (order: Order): string =>
  [
    '🎫 New Order',
    `Event: ${order.eventTitle}`,
    '',
    'Tickets:',
    ...formatLineItems(order.lineItems),
    '',
    `Customer: ${order.userName}`,
    `Email: ${order.userEmail}`,
    `Phone: ${order.userPhone ?? '—'}`,
    `Total: ${order.total.toLocaleString('en-US')} AMD`,
    `Payment: ${order.paymentMethod}`,
    `Status: ${order.status}`,
    `Created: ${order.createdAt}`,
    `Order ID: ${order.id}`,
  ].join('\n')
