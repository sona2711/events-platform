import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import { CheckoutTicketSelector } from '@/components/features/CheckoutTicketSelector'
import '@/i18n'
import i18n from '@/i18n'
import checkoutEn from '@/locales/checkout/en.json'
import { CHECKOUT_TICKET_TIERS, DEFAULT_TICKET_SELECTION } from '@/pages/CheckoutPage/consts'
import type { TicketSelection } from '@/pages/CheckoutPage/types'

const renderSelector = (selection: TicketSelection, onQuantityChange = jest.fn()) =>
  render(
    <I18nextProvider i18n={i18n}>
      <ConfigProvider>
        <CheckoutTicketSelector
          tiers={CHECKOUT_TICKET_TIERS}
          selection={selection}
          onQuantityChange={onQuantityChange}
        />
      </ConfigProvider>
    </I18nextProvider>,
  )

describe('CheckoutTicketSelector', () => {
  it('shows quantity controls for selected tickets', () => {
    renderSelector(DEFAULT_TICKET_SELECTION)

    expect(screen.getByText('2')).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: checkoutEn.tickets.decreaseQuantity.replace('{{ticket}}', 'General Admission'),
      }),
    ).toBeInTheDocument()
  })

  it('calls onQuantityChange when increasing ticket quantity', async () => {
    const user = userEvent.setup()
    const onQuantityChange = jest.fn()
    renderSelector(DEFAULT_TICKET_SELECTION, onQuantityChange)

    await user.click(
      screen.getByRole('button', {
        name: checkoutEn.tickets.increaseQuantity.replace('{{ticket}}', 'General Admission'),
      }),
    )

    expect(onQuantityChange).toHaveBeenCalledWith('general-admission', 3)
  })

  it('shows add button for unselected ticket tiers', async () => {
    const user = userEvent.setup()
    const onQuantityChange = jest.fn()
    renderSelector(DEFAULT_TICKET_SELECTION, onQuantityChange)

    await user.click(screen.getByRole('button', { name: checkoutEn.tickets.add }))

    expect(onQuantityChange).toHaveBeenCalledWith('vip-backstage', 1)
  })
})
