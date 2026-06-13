import type { ChatMessage } from './types.js'

const toGeminiRole = (role: ChatMessage['role']): 'user' | 'model' =>
  role === 'assistant' ? 'model' : 'user'

export const buildGeminiHistory = (messages: ChatMessage[]) => {
  const priorMessages = messages.slice(0, -1)
  const firstUserIndex = priorMessages.findIndex((message) => message.role === 'user')

  if (firstUserIndex === -1) {
    return []
  }

  return priorMessages.slice(firstUserIndex).map((message) => ({
    role: toGeminiRole(message.role),
    parts: [{ text: message.content }],
  }))
}
