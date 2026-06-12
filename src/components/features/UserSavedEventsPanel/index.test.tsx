import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import '@/i18n'
import i18n from '@/i18n'
import profileEn from '@/locales/profile/en.json'
import { favoritesReducer } from '@/store/favorites'
import { UserSavedEventsPanel } from './index'

const createTestStore = (favoriteEventIds: string[] = []) =>
  configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: {
      favorites: {
        eventIds: favoriteEventIds,
      },
    },
  })

const LocationProbe = () => {
  const { pathname } = useLocation()
  return <span data-testid="current-path">{pathname}</span>
}

const renderPanel = (favoriteEventIds: string[] = []) =>
  render(
    <Provider store={createTestStore(favoriteEventIds)}>
      <I18nextProvider i18n={i18n}>
        <ConfigProvider>
          <MemoryRouter initialEntries={['/profile']}>
            <LocationProbe />
            <Routes>
              <Route path="/profile" element={<UserSavedEventsPanel />} />
              <Route path="/checkout/:eventId" element={<div>Checkout</div>} />
            </Routes>
          </MemoryRouter>
        </ConfigProvider>
      </I18nextProvider>
    </Provider>,
  )

describe('UserSavedEventsPanel', () => {
  it('shows an empty state when there are no saved events', () => {
    renderPanel()

    expect(
      screen.getByRole('heading', { name: profileEn.sections.saved.title }),
    ).toBeInTheDocument()
    expect(screen.getByText(profileEn.sections.saved.description)).toBeInTheDocument()
  })

  it('shows favorite event cards when saved home events exist', () => {
    renderPanel(['event-jazz-fest', 'event-tech-meetup-tumo'])

    expect(
      screen.getByRole('heading', { name: 'Yerevan Jazz Night at Cascade' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tech Meetup Yerevan' })).toBeInTheDocument()
    expect(screen.queryByText(profileEn.sections.saved.description)).not.toBeInTheDocument()
  })

  it('shows favorite event cards when saved category events exist', () => {
    renderPanel(['event-modern-art', 'event-gastro-fest'])

    expect(screen.getByRole('heading', { name: 'Modern Art Exhibition' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Armenian Gastro Fest' })).toBeInTheDocument()
    expect(screen.queryByText(profileEn.sections.saved.description)).not.toBeInTheDocument()
  })

  it('navigates to checkout when a saved event book button is clicked', async () => {
    const user = userEvent.setup()
    renderPanel(['event-modern-art'])

    const bookButtons = screen.getAllByRole('button', { name: 'Book' })
    await user.click(bookButtons[0])

    expect(screen.getByTestId('current-path')).toHaveTextContent('/checkout/event-modern-art')
    expect(screen.getByText('Checkout')).toBeInTheDocument()
  })
})
