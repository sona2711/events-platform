import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '@/i18n'
import i18n from '@/i18n'
import checkoutEn from '@/locales/checkout/en.json'
import { getDefaultProfile, profileReducer } from '@/store/profile'
import { CheckoutPage } from './index'

const createTestStore = () =>
  configureStore({
    reducer: {
      profile: profileReducer,
    },
    preloadedState: {
      profile: getDefaultProfile(),
    },
  })

const renderCheckoutPage = (eventId: string) => {
  const store = createTestStore()

  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ConfigProvider>
          <MemoryRouter initialEntries={[`/checkout/${eventId}`]}>
            <Routes>
              <Route path="/checkout/:eventId" element={<CheckoutPage />} />
            </Routes>
          </MemoryRouter>
        </ConfigProvider>
      </I18nextProvider>
    </Provider>,
  )
}

describe('CheckoutPage', () => {
  it('shows event-specific summary and ticket tiers for a valid event id', () => {
    renderCheckoutPage('event-jazz-fest')

    expect(screen.getByText(checkoutEn.event.jazzFest.title)).toBeInTheDocument()
    expect(screen.getByText(checkoutEn.tickets.jazzFest.generalAdmission.name)).toBeInTheDocument()
    expect(screen.getByText(checkoutEn.tickets.jazzFest.vipBackstage.name)).toBeInTheDocument()
  })

  it('shows marathon ticket tiers for a marathon event id', () => {
    renderCheckoutPage('event-marathon')

    expect(screen.getByText(checkoutEn.event.marathon.title)).toBeInTheDocument()
    expect(screen.getByText(checkoutEn.tickets.marathon.runner.name)).toBeInTheDocument()
    expect(screen.getByText(checkoutEn.tickets.marathon.spectator.name)).toBeInTheDocument()
  })

  it('shows unavailable state for an unknown event id', () => {
    renderCheckoutPage('unknown-event-id')

    expect(screen.getByText(checkoutEn.messages.eventNotFound)).toBeInTheDocument()
  })
})
