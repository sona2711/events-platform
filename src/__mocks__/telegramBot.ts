import axios from 'axios'
import type { Order } from '@/types'

const formatLineItems = (lineItems: Order['lineItems']): string[] =>
  lineItems.map(
    (item) => `  • ${item.name} x${item.quantity} — ${item.amountAmd.toLocaleString('en-US')} AMD`,
  )

export const sendOrderToTelegram = async (order: Order) => {
  const response = await axios.post(
    `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT}/sendMessage`,
    {
      chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
      text: [
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
      ].join('\n'),
    },
  )
  return response.data
}
