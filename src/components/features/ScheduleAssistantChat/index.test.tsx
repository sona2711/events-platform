import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import '@/i18n'
import i18n from '@/i18n'
import { ScheduleAssistantChat } from './index'

const mockFetch = jest.fn()

beforeEach(() => {
  mockFetch.mockReset()
  global.fetch = mockFetch as typeof fetch
  Element.prototype.scrollIntoView = jest.fn()
})

const renderChat = () =>
  render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <ConfigProvider>
          <ScheduleAssistantChat />
        </ConfigProvider>
      </I18nextProvider>
    </MemoryRouter>,
  )

describe('ScheduleAssistantChat', () => {
  it('shows the static welcome message', () => {
    renderChat()

    expect(
      screen.getByText(
        "Welcome to Yerevan Pulsar. I'm here to help you find out about all the exciting events happening around Yerevan. You can ask me questions about events by day, location, time, category, or price.",
      ),
    ).toBeInTheDocument()
  })

  it('sends a user message and appends the assistant reply', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ reply: 'Try the jazz night on Oct 18.' }),
    })

    const user = userEvent.setup()

    renderChat()

    await user.type(screen.getByLabelText(/your message/i), 'What should I do this weekend?')
    await user.click(screen.getByLabelText(/send message/i))

    await waitFor(() => {
      expect(screen.getByText(/Try the jazz night on Oct 18/)).toBeInTheDocument()
    })

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/gemini/chat',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'What should I do this weekend?' }],
        }),
      }),
    )
  })
})
