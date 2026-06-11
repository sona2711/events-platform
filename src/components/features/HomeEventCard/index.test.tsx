import { configureStore } from '@reduxjs/toolkit'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@/i18n'
import i18n from '@/i18n'
import { EVENTS_CARD_DATA } from '@/components/EventsCard/consts'
import { favoritesReducer } from '@/store/favorites'
import { HomeEventCard } from './index'

const event = EVENTS_CARD_DATA[0]

const LocationProbe = () => {
  const { pathname } = useLocation()
  return <span data-testid="current-path">{pathname}</span>
}

type RenderCardOptions = {
  onBook?: (eventId: string) => void
  initialPath?: string
}

const renderCard = ({ onBook, initialPath = '/' }: RenderCardOptions = {}) => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
  })

  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[initialPath]}>
          <LocationProbe />
          <Routes>
            <Route path="/" element={<HomeEventCard event={event} onBook={onBook} />} />
            <Route path="/event/:eventId" element={<div>Event details</div>} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    </Provider>,
  )
}

describe('HomeEventCard', () => {
  it('links to the event detail page and supports keyboard navigation', () => {
    renderCard()

    const detailLinks = screen.getAllByRole('link', {
      name: `View event: ${event.title}`,
    })

    expect(detailLinks.length).toBeGreaterThan(0)
    for (const link of detailLinks) {
      expect(link).toHaveAttribute('href', `/event/${event.id}`)
    }
  })

  it('calls onBook without navigating when the book button is clicked', async () => {
    const user = userEvent.setup()
    const onBook = jest.fn()

    renderCard({ onBook })

    await user.click(screen.getByRole('button', { name: 'Book' }))

    expect(onBook).toHaveBeenCalledWith(event.id)
    expect(screen.getByTestId('current-path')).toHaveTextContent('/')
  })

  it('navigates to the event details page when onBook is not provided', async () => {
    const user = userEvent.setup()

    renderCard()

    const bookLink = screen.getByRole('link', { name: 'Book' })
    expect(bookLink).toHaveAttribute('href', `/event/${event.id}`)

    await user.click(bookLink)

    expect(screen.getByTestId('current-path')).toHaveTextContent(`/event/${event.id}`)
    expect(screen.getByText('Event details')).toBeTruthy()
  })

  it('toggles favorite state independently from navigation', async () => {
    const user = userEvent.setup()

    renderCard()

    const favoriteButton = screen.getByRole('button', {
      name: `Save ${event.title} to favorites`,
    })

    await user.click(favoriteButton)

    expect(
      screen.getByRole('button', {
        name: `Remove ${event.title} from favorites`,
      }),
    ).toBeTruthy()
  })
})
