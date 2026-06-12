import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '../../../i18n'
import i18n from '../../../i18n'
import { MOCK_CATEGORY_EVENTS } from '../../../pages/categoriesPage/mockEvents'
import { favoritesReducer } from '../../../store/favorites'
import { CategoriesEventsGrid } from './index'

declare const describe: (name: string, fn: () => void) => void
declare const it: (name: string, fn: () => void | Promise<void>) => void
declare const expect: (actual: unknown) => {
  toBeNull: () => void
  toHaveAttribute: (name: string, value: string) => void
  toHaveTextContent: (text: string) => void
  toBeTruthy: () => void
}

const LocationProbe = () => {
  const { pathname } = useLocation()
  return <span data-testid="current-path">{pathname}</span>
}

const firstEvent = MOCK_CATEGORY_EVENTS[0]
const noop = () => undefined

const renderGrid = () => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
  })

  return render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={['/categories']}>
          <LocationProbe />
          <Routes>
            <Route
              path="/categories"
              element={
                <CategoriesEventsGrid
                  events={MOCK_CATEGORY_EVENTS.slice(0, 3)}
                  canLoadMore={false}
                  onLoadMore={noop}
                  emptyMessage="No events found"
                  loadMoreLabel="Load more"
                />
              }
            />
            <Route path="/event/:eventId" element={<div>Event details</div>} />
            <Route path="/checkout/:eventId" element={<div>Checkout</div>} />
          </Routes>
        </MemoryRouter>
      </I18nextProvider>
    </Provider>,
  )
}

describe('CategoriesEventsGrid', () => {
  it('does not render the payment modal', () => {
    renderGrid()

    expect(screen.queryByRole('dialog', { name: /ticket payment/i })).toBeNull()
  })

  it('navigates to checkout when a catalog card book button is clicked', async () => {
    const user = userEvent.setup()

    renderGrid()

    const bookButtons = screen.getAllByRole('button', { name: 'Book' })
    await user.click(bookButtons[0])

    expect(screen.getByTestId('current-path')).toHaveTextContent(`/checkout/${firstEvent.id}`)
    expect(screen.getByText('Checkout')).toBeTruthy()
    expect(screen.queryByRole('dialog', { name: /ticket payment/i })).toBeNull()
  })
})
