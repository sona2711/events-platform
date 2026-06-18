import { sendOrderToTelegram } from './sendOrder.js'
import type { Order, OrderLineItem } from './types.js'

const isOrderLineItem = (value: unknown): value is OrderLineItem => {
  if (!value || typeof value !== 'object') return false

  const item = value as Record<string, unknown>

  return (
    typeof item.name === 'string' &&
    typeof item.quantity === 'number' &&
    typeof item.amountAmd === 'number'
  )
}

const isOrder = (value: unknown): value is Order => {
  if (!value || typeof value !== 'object') return false

  const order = value as Record<string, unknown>

  return (
    typeof order.id === 'string' &&
    typeof order.total === 'number' &&
    typeof order.status === 'string' &&
    typeof order.createdAt === 'string' &&
    typeof order.userId === 'string' &&
    typeof order.userEmail === 'string' &&
    typeof order.userName === 'string' &&
    typeof order.paymentMethod === 'string' &&
    typeof order.eventId === 'string' &&
    typeof order.eventTitle === 'string' &&
    Array.isArray(order.lineItems) &&
    order.lineItems.every(isOrderLineItem) &&
    (order.userPhone === undefined || typeof order.userPhone === 'string')
  )
}

export type TelegramHandlerResult = {
  status: number
  body: Record<string, unknown>
}

export const handleTelegramRoute = async (
  method: string,
  pathname: string,
  requestBody: unknown,
): Promise<TelegramHandlerResult | null> => {
  if (pathname === '/api/telegram/notify' && method === 'POST') {
    if (!isOrder(requestBody)) {
      return { status: 400, body: { message: 'Invalid order payload.' } }
    }

    try {
      const result = await sendOrderToTelegram(requestBody)
      return { status: 200, body: result }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send Telegram notification.'
      return { status: 502, body: { ok: false, description: message } }
    }
  }

  return null
}
