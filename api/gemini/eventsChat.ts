import type { ChatMessage } from './types'
import { buildEventSchedule, formatScheduleForPrompt } from './events/scheduleBuilder'
import { SCHEDULE_EVENTS } from './events/data'
import { linkifyScheduleEventLinks } from '../../src/data/scheduleAssistantEvents'
import { buildGeminiHistory } from './chatHistory'
import { getGeminiModelName, getGoogleGenAI } from './client'

const schedule = buildEventSchedule(SCHEDULE_EVENTS)
const scheduleContext = formatScheduleForPrompt(schedule)
const eventsListContext = SCHEDULE_EVENTS.map(
  (event) =>
    `- ${event.title} | ${event.date} | ${event.time} | ${event.location} | ${event.category} | ${event.price} [id: ${event.id}]`,
).join('\n')

const SYSTEM_INSTRUCTION = `You are the Yerevan Pulsar events assistant. Speak directly to the user in a warm, helpful tone.

Your job is to answer questions about existing events on the platform. You do NOT create, edit, or publish events.

Users may ask things like:
- What events are on a specific day?
- What is happening at a location (venue)?
- What events are at a certain hour or time?
- What matches a category, price, or combination of filters?

ALL EVENTS:
${eventsListContext}

EVENTS BY DAY → PLACE → HOUR:
${scheduleContext}

Guidelines:
- Reply directly to the user as "you" — never describe yourself as an AI unless asked.
- Use only events from the data above. Do not invent events.
- Answer the question asked. Filter by day, location, hour, category, or price as relevant.
- When listing matches, include title, date, time, location, and price.
- If the question is missing a key detail (which day, location, or time), ask 1–2 short follow-up questions.
- If nothing matches, say so clearly and mention the closest alternatives if helpful.
- Keep responses concise.
- Format replies using Markdown: use **bold** for event titles, bullet lists for multiple events, and short paragraphs otherwise.
- When you mention an event by title, use **bold** for the title so it can link to the event page.`

export const generateEventsChatReply = async (messages: ChatMessage[]): Promise<string> => {
  const ai = getGoogleGenAI()
  const lastMessage = messages.at(-1)

  if (!lastMessage || lastMessage.role !== 'user') {
    throw new Error('The last message must be from the user.')
  }

  const history = buildGeminiHistory(messages)
  const chat = ai.chats.create({
    model: getGeminiModelName(),
    history,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  })

  const response = await chat.sendMessage({ message: lastMessage.content })
  const reply = response.text?.trim() ?? ''

  if (!reply) {
    throw new Error('Gemini returned an empty reply.')
  }

  return linkifyScheduleEventLinks(reply)
}
