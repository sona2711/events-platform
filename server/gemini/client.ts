const DEFAULT_MODEL = 'gemini-2.5-flash'
const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'

type GeminiContent = {
  role: 'user' | 'model'
  parts: Array<{ text: string }>
}

type GenerateGeminiChatParams = {
  model: string
  systemInstruction: string
  history: GeminiContent[]
  message: string
}

type GeminiErrorPayload = {
  error?: {
    message?: string
  }
}

type GeminiSuccessPayload = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string
      }>
    }
  }>
}

export const getGeminiModelName = (): string => process.env.GEMINI_MODEL ?? DEFAULT_MODEL

const extractGeminiText = (payload: GeminiSuccessPayload): string => {
  const text = payload.candidates?.[0]?.content?.parts?.[0]?.text
  return typeof text === 'string' ? text : ''
}

export const generateGeminiChatCompletion = async ({
  model,
  systemInstruction,
  history,
  message,
}: GenerateGeminiChatParams): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server.')
  }

  const response = await fetch(`${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [...history, { role: 'user', parts: [{ text: message }] }],
    }),
  })

  const payload = (await response.json()) as GeminiErrorPayload & GeminiSuccessPayload

  if (!response.ok) {
    throw new Error(payload.error?.message ?? 'Gemini API request failed.')
  }

  const reply = extractGeminiText(payload).trim()

  if (!reply) {
    throw new Error('Gemini returned an empty reply.')
  }

  return reply
}
