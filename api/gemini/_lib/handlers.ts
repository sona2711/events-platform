import type { ChatMessage, ChatRequestBody } from './types.js'
import { generateEventsChatReply } from './eventsChat.js'

const isChatMessage = (value: unknown): value is ChatMessage => {
  if (!value || typeof value !== 'object') return false

  const message = value as Record<string, unknown>

  return (
    (message.role === 'user' || message.role === 'assistant') &&
    typeof message.content === 'string' &&
    message.content.trim().length > 0
  )
}

const isChatRequestBody = (value: unknown): value is ChatRequestBody => {
  if (!value || typeof value !== 'object') return false

  const body = value as Record<string, unknown>

  if (!Array.isArray(body.messages)) {
    return false
  }

  return body.messages.every(isChatMessage)
}

export type GeminiHandlerResult = {
  status: number
  body: Record<string, unknown>
}

export const handleGeminiRoute = async (
  method: string,
  pathname: string,
  requestBody: unknown,
): Promise<GeminiHandlerResult | null> => {
  if (pathname === '/api/gemini/chat' && method === 'POST') {
    if (!isChatRequestBody(requestBody)) {
      return { status: 400, body: { message: 'Invalid request body.' } }
    }

    if (requestBody.messages.length === 0) {
      return { status: 400, body: { message: 'At least one user message is required.' } }
    }

    try {
      const reply = await generateEventsChatReply(requestBody.messages)
      return { status: 200, body: { reply } }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate events chat reply.'
      const status = message.includes('GEMINI_API_KEY') ? 503 : 500

      return { status, body: { message } }
    }
  }

  return null
}
