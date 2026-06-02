import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import { CheckoutOrderSummary } from '@/components/features/CheckoutOrderSummary'
import '@/i18n'
import i18n from '@/i18n'
import checkoutEn from '@/locales/checkout/en.json'
import {
  CHECKOUT_EVENTS,
  CHECKOUT_TICKET_TIERS,
  DEFAULT_TICKET_SELECTION,
} from '@/pages/checkout/consts'
import { buildOrderTotals } from '@/pages/checkout/utils'

const event = CHECKOUT_EVENTS[0]
const totals = buildOrderTotals(DEFAULT_TICKET_SELECTION, CHECKOUT_TICKET_TIERS)

const renderSummary = (props: {
  isReady?: boolean
  isSubmitting?: boolean
  onPlaceOrder?: () => void
}) => {
  const onPlaceOrder = props.onPlaceOrder ?? jest.fn()

  return {
    onPlaceOrder,
    ...render(
      <I18nextProvider i18n={i18n}>
        <ConfigProvider>
          <CheckoutOrderSummary
            event={event}
            totals={totals}
            isReady={props.isReady ?? false}
            isSubmitting={props.isSubmitting ?? false}
            onPlaceOrder={onPlaceOrder}
          />
        </ConfigProvider>
      </I18nextProvider>,
    ),
  }
}

describe('CheckoutOrderSummary', () => {
  it('disables place order when checkout is not ready', () => {
    renderSummary({ isReady: false })

    expect(screen.getByRole('button', { name: checkoutEn.summary.placeOrder })).toBeDisabled()
    expect(screen.getByText('33,600 AMD')).toBeInTheDocument()
  })

  it('enables place order and submits when checkout is ready', async () => {
    const user = userEvent.setup()
    const onPlaceOrder = jest.fn()
    renderSummary({ isReady: true, onPlaceOrder })

    const placeOrderButton = screen.getByRole('button', {
      name: checkoutEn.summary.placeOrder,
    })
    expect(placeOrderButton).not.toBeDisabled()

    await user.click(placeOrderButton)
    expect(onPlaceOrder).toHaveBeenCalledTimes(1)
  })
})
