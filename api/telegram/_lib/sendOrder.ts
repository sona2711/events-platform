import { formatOrderMessage } from './formatOrderMessage.js'
import type { Order, SendOrderToTelegramResult } from './types.js'

const TELEGRAM_REQUEST_TIMEOUT_MS = 5_000

const getTelegramConfig = (): { botToken: string; chatId: string } | null => {
  const botToken = process.env.TELEGRAM_BOT?.trim()
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim()

  if (!botToken || !chatId) return null

  return { botToken, chatId }
}

export const sendOrderToTelegram = async (order: Order): Promise<SendOrderToTelegramResult> => {
  const config = getTelegramConfig()

  if (!config) {
    return { ok: true, skipped: true }
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TELEGRAM_REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${config.botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: config.chatId,
          text: formatOrderMessage(order),
        }),
        signal: controller.signal,
      },
    )

    const data = (await response.json()) as SendOrderToTelegramResult

    if (!response.ok) {
      throw new Error(data.description ?? `Telegram API responded with status ${response.status}`)
    }

    return data
  } finally {
    clearTimeout(timeoutId)
  }
}
