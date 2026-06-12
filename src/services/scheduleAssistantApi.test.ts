import { toGeminiApiMessages } from './scheduleAssistantApi'

describe('toGeminiApiMessages', () => {
  it('drops the static welcome message before the first user turn', () => {
    expect(
      toGeminiApiMessages([
        { id: '1', role: 'assistant', content: 'Welcome to Yerevan Pulsar.' },
        { id: '2', role: 'user', content: 'Are there free events?' },
      ]),
    ).toEqual([{ role: 'user', content: 'Are there free events?' }])
  })
})
