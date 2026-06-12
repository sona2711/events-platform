import { GoogleGenAI } from '@google/genai'

const DEFAULT_MODEL = 'gemini-2.5-flash'

let client: GoogleGenAI | null = null

export const getGoogleGenAI = (): GoogleGenAI => {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server.')
  }

  if (!client) {
    client = new GoogleGenAI({ apiKey })
  }

  return client
}

export const getGeminiModelName = (): string => process.env.GEMINI_MODEL ?? DEFAULT_MODEL
