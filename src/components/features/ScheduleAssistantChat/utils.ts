import type { ScheduleChatMessage } from '@/types/scheduleAssistant'
import { MESSAGE_ID_PREFIX } from './consts'

export const createChatMessageId = (): string => {
  const uniqueSuffix =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`

  return `${MESSAGE_ID_PREFIX}-${uniqueSuffix}`
}

export const createAssistantMessage = (content: string): ScheduleChatMessage => ({
  id: createChatMessageId(),
  role: 'assistant',
  content,
})

export const createUserMessage = (content: string): ScheduleChatMessage => ({
  id: createChatMessageId(),
  role: 'user',
  content,
})
