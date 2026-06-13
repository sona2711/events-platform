import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleGeminiRoute } from './_lib/handlers.js'

const parseRequestBody = (body: unknown): unknown => {
  if (typeof body === 'string' && body.length > 0) {
    try {
      return JSON.parse(body) as unknown
    } catch {
      return body
    }
  }

  return body
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    response.status(405).json({ message: 'Method not allowed.' })
    return
  }

  try {
    const result = await handleGeminiRoute(
      request.method,
      '/api/gemini/chat',
      parseRequestBody(request.body),
    )

    if (!result) {
      response.status(404).json({ message: 'Not found.' })
      return
    }

    response.status(result.status).json(result.body)
  } catch (error) {
    console.error('[api/gemini/chat]', error)

    const message =
      error instanceof Error ? error.message : 'Failed to handle Gemini API request.'
    response.status(500).json({ message })
  }
}
