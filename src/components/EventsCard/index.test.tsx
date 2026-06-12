import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import '@/i18n'
import i18n from '@/i18n'
import { favoritesReducer } from '@/store/favorites'
import { EventsGrid } from './index'
import { EVENTS_CARD_DATA } from './consts'

jest.mock('swiper/modules', () => ({
  Navigation: {},
}))

jest.mock('swiper/css', () => ({}), { virtual: true })
jest.mock('swiper/css/navigation', () => ({}), { virtual: true })

jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: ReactNode }) => (
    <div data-testid="events-swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: ReactNode }) => (
    <div data-testid="events-swiper-slide">{children}</div>
  ),
}))

jest.mock('@/components/features/TicketPaymentModal', () => ({
  TicketPaymentModal: ({
    event,
    open,
    onClose,
  }: {
    event: {
      title: string
    }
    open: boolean
    onClose: () => void
  }) =>
    open ? (
      <div role="dialog" aria-label="ticket payment">
        <p>{event.title}</p>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    ) : null,
}))

function renderEventsGrid() {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
  })

  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <EventsGrid />
        </MemoryRouter>
      </I18nextProvider>
    </Provider>,
  )
}

describe('EventsGrid', () => {
  it('renders the section heading, external navigation buttons, and all event cards', () => {
    renderEventsGrid()

    expect(screen.getByRole('heading', { name: /latest in yerevan/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /previous events/i }).className).toContain(
      'events-prev-button',
    )
    expect(screen.getByRole('button', { name: /next events/i }).className).toContain(
      'events-next-button',
    )
    expect(screen.getAllByRole('article')).toHaveLength(EVENTS_CARD_DATA.length)

    for (const event of EVENTS_CARD_DATA) {
      expect(screen.getByRole('heading', { name: event.title })).toBeTruthy()
      expect(screen.getByText(event.priceLabel)).toBeTruthy()
      expect(screen.getByRole('link', { name: `View event: ${event.title}` })).toHaveAttribute(
        'href',
        `/event/${event.id}`,
      )
    }
  })

  it('opens and closes the payment modal for the booked event', async () => {
    const user = userEvent.setup({ delay: null })
    const firstEvent = EVENTS_CARD_DATA[0]

    renderEventsGrid()

    await user.click(screen.getAllByRole('button', { name: 'Book' })[0])

    const dialog = await screen.findByRole('dialog', { name: /ticket payment/i }, { timeout: 3000 })

    expect(dialog).toBeTruthy()
    expect(within(dialog).getByText(firstEvent.title)).toBeTruthy()

    await user.click(screen.getByRole('button', { name: /close/i }))

    expect(screen.queryByRole('dialog', { name: /ticket payment/i })).toBeNull()
  }, 10000)
})
