import axios from 'axios'
import type { Order } from '@/types'

type SendOrderToTelegramResult = {
  ok: boolean
  skipped?: true
  result?: unknown
  description?: string
}

const TELEGRAM_REQUEST_TIMEOUT_MS = 5_000

export const sendOrderToTelegram = async (order: Order): Promise<SendOrderToTelegramResult> => {
  const response = await axios.post<SendOrderToTelegramResult>('/api/telegram/notify', order, {
    timeout: TELEGRAM_REQUEST_TIMEOUT_MS,
  })

  return response.data
}
