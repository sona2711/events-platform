import React from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { EventsGrid } from './index'
import { EVENTS_CARD_DATA } from './consts'

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

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

jest.mock('@/components/features/EventCard', () => ({
  EventCard: ({
    event,
    noSwipeClassName,
    onBook,
    onNavigate,
    variant,
  }: {
    event: {
      id: string
      title: string
      priceLabel: string
    }
    noSwipeClassName?: string
    onBook?: (eventId: string) => void
    onNavigate?: (eventId: string) => void
    variant?: string
  }) => (
    <article data-testid="event-card" data-variant={variant}>
      <h3>{event.title}</h3>
      <span>{event.priceLabel}</span>
      <span data-testid={`no-swipe-${event.id}`}>{noSwipeClassName}</span>
      <button type="button" onClick={() => onNavigate?.(event.id)}>
        View {event.title}
      </button>
      <button type="button" onClick={() => onBook?.(event.id)}>
        Book {event.title}
      </button>
    </article>
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

describe('EventsGrid', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders the section heading, external navigation buttons, and all event cards', () => {
    render(<EventsGrid />)

    expect(screen.getByRole('heading', { name: /upcoming events in yerevan/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /previous events/i }).className).toContain(
      'events-prev-button',
    )
    expect(screen.getByRole('button', { name: /next events/i }).className).toContain(
      'events-next-button',
    )
    expect(screen.getAllByTestId('event-card')).toHaveLength(EVENTS_CARD_DATA.length)

    for (const event of EVENTS_CARD_DATA) {
      expect(screen.getByRole('heading', { name: event.title })).toBeTruthy()
      expect(screen.getByText(event.priceLabel)).toBeTruthy()
      expect(screen.getByTestId(`no-swipe-${event.id}`).textContent).toBe('swiper-no-swiping')
    }
  })

  it('passes carousel props to event cards and navigates with the selected event id', async () => {
    const user = userEvent.setup()
    const firstEvent = EVENTS_CARD_DATA[0]

    render(<EventsGrid />)

    expect(screen.getAllByTestId('event-card')[0].getAttribute('data-variant')).toBe('carousel')

    await user.click(screen.getByRole('button', { name: `View ${firstEvent.title}` }))

    expect(mockNavigate).toHaveBeenCalledWith(`/event/${firstEvent.id}`)
  })

  it('opens and closes the payment modal for the booked event', async () => {
    const user = userEvent.setup()
    const firstEvent = EVENTS_CARD_DATA[0]

    render(<EventsGrid />)

    await user.click(screen.getByRole('button', { name: `Book ${firstEvent.title}` }))

    const dialog = await screen.findByRole('dialog', { name: /ticket payment/i })

    expect(dialog).toBeTruthy()
    expect(within(dialog).getByText(firstEvent.title)).toBeTruthy()

    await user.click(screen.getByRole('button', { name: /close/i }))

    expect(screen.queryByRole('dialog', { name: /ticket payment/i })).toBeNull()
  })
})
