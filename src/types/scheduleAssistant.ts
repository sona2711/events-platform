export type ScheduleChatRole = 'user' | 'assistant'

export type ScheduleChatMessage = {
  id: string
  role: ScheduleChatRole
  content: string
}

export type ScheduleChatResponse = {
  reply: string
}
