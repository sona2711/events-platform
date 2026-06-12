import axios from 'axios'
import type { Order } from '@/types'

type TelegramConfig = {
  botToken: string
  chatId: string
}

type SendOrderToTelegramResult = {
  ok: boolean
  skipped?: true
  result?: unknown
  description?: string
}

const getTelegramConfig = (): TelegramConfig | null => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT?.trim()
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID?.trim()

  if (!botToken || !chatId) return null

  return { botToken, chatId }
}

const formatLineItems = (lineItems: Order['lineItems']): string[] =>
  lineItems.map(
    (item) => `  • ${item.name} x${item.quantity} — ${item.amountAmd.toLocaleString('en-US')} AMD`,
  )

export const sendOrderToTelegram = async (order: Order): Promise<SendOrderToTelegramResult> => {
  const config = getTelegramConfig()

  if (!config) {
    console.info(
      'Telegram notification skipped: VITE_TELEGRAM_BOT or VITE_TELEGRAM_CHAT_ID is not configured.',
    )
    return { ok: true, skipped: true }
  }

  const response = await axios.post<SendOrderToTelegramResult>(
    `https://api.telegram.org/bot${config.botToken}/sendMessage`,
    {
      chat_id: config.chatId,
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
