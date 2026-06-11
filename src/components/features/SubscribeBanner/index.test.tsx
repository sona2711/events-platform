import { I18nextProvider } from 'react-i18next'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@/i18n'
import i18n from '@/i18n'
import { showNotification } from '@/providers/notifications/utils'
import { saveSubscriptionEmail } from './utils'
import { SubscribeBanner } from './index'

jest.mock('@/providers/notifications/utils', () => ({
  showNotification: jest.fn(),
}))

jest.mock('./utils', () => ({
  saveSubscriptionEmail: jest.fn(),
}))

function renderSubscribeBanner() {
  return render(
    <I18nextProvider i18n={i18n}>
      <SubscribeBanner />
    </I18nextProvider>,
  )
}

describe('SubscribeBanner', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('shows validation feedback for an invalid email', async () => {
    const user = userEvent.setup()

    renderSubscribeBanner()

    await user.type(screen.getByLabelText('Email address'), 'invalid-email')
    await user.click(screen.getByRole('button', { name: 'Subscribe' }))

    expect(screen.getByText(/please enter a valid email address/i)).toBeTruthy()
    expect(showNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'error',
      }),
    )
    expect(saveSubscriptionEmail).not.toHaveBeenCalled()
  })

  it('submits a valid email and clears the field', async () => {
    const user = userEvent.setup()
    ;(saveSubscriptionEmail as jest.Mock).mockResolvedValue(undefined)

    renderSubscribeBanner()

    const emailInput = screen.getByLabelText('Email address')
    await user.type(emailInput, 'name@example.com')
    await user.click(screen.getByRole('button', { name: 'Subscribe' }))

    expect(saveSubscriptionEmail).toHaveBeenCalledWith('name@example.com')
    expect(showNotification).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'success',
      }),
    )
    expect(emailInput).toHaveValue('')
  })
})
