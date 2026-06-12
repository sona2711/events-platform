export type ScheduleEvent = {
  id: string
  title: string
  category: string
  location: string
  date: string
  time: string
  price: string
  description: string
}

export type ScheduleSlot = {
  hour: string
  events: ScheduleEvent[]
}

export type SchedulePlace = {
  location: string
  slots: ScheduleSlot[]
}

export type ScheduleDay = {
  date: string
  places: SchedulePlace[]
}

export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
  role: ChatRole
  content: string
}

export type ChatRequestBody = {
  messages: ChatMessage[]
}
