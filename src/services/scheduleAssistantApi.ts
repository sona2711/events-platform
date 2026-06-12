import type { ScheduleChatMessage, ScheduleChatResponse } from '@/types/scheduleAssistant'

const GEMINI_CHAT_ENDPOINT = '/api/gemini/chat'

type ChatRequest = {
  messages: Array<Pick<ScheduleChatMessage, 'role' | 'content'>>
}

export const toGeminiApiMessages = (messages: ScheduleChatMessage[]): ChatRequest['messages'] => {
  const firstUserIndex = messages.findIndex((message) => message.role === 'user')

  if (firstUserIndex === -1) {
    return []
  }

  return messages.slice(firstUserIndex).map(({ role, content }) => ({ role, content }))
}

const postGeminiChat = async (body: ChatRequest): Promise<ScheduleChatResponse> => {
  const response = await fetch(GEMINI_CHAT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const payload: unknown = await response.json()

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === 'object' &&
      'message' in payload &&
      typeof payload.message === 'string'
        ? payload.message
        : 'Failed to reach the events assistant.'

    throw new Error(message)
  }

  if (
    !payload ||
    typeof payload !== 'object' ||
    !('reply' in payload) ||
    typeof payload.reply !== 'string'
  ) {
    throw new Error('Invalid response from the events assistant.')
  }

  return { reply: payload.reply }
}

export const fetchScheduleChatReply = (
  messages: ScheduleChatMessage[],
): Promise<ScheduleChatResponse> =>
  postGeminiChat({
    messages: toGeminiApiMessages(messages),
  })
