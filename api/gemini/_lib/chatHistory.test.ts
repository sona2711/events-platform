import { buildGeminiHistory } from './chatHistory'
import type { ChatMessage } from './types'

describe('buildGeminiHistory', () => {
  it('returns empty history when only a user message is present', () => {
    const messages: ChatMessage[] = [{ role: 'user', content: 'Are there free events?' }]

    expect(buildGeminiHistory(messages)).toEqual([])
  })

  it('ignores leading assistant messages before the first user turn', () => {
    const messages: ChatMessage[] = [
      { role: 'assistant', content: 'Welcome message shown only in the UI.' },
      { role: 'user', content: 'Are there free events?' },
    ]

    expect(buildGeminiHistory(messages)).toEqual([])
  })

  it('includes prior user and assistant turns after the first user message', () => {
    const messages: ChatMessage[] = [
      { role: 'assistant', content: 'Welcome message shown only in the UI.' },
      { role: 'user', content: 'Are there free events?' },
      { role: 'assistant', content: 'Yes, Tech Meetup Yerevan is free.' },
      { role: 'user', content: 'What about on Oct 12?' },
    ]

    expect(buildGeminiHistory(messages)).toEqual([
      { role: 'user', parts: [{ text: 'Are there free events?' }] },
      { role: 'model', parts: [{ text: 'Yes, Tech Meetup Yerevan is free.' }] },
    ])
  })
})
