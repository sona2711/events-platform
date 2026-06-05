import { configureStore } from '@reduxjs/toolkit'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import '@/i18n'
import i18n from '@/i18n'
import profileEn from '@/locales/profile/en.json'
import checkoutEn from '@/locales/checkout/en.json'
import { CheckoutPage } from '@/pages/CheckoutPage'
import { getDefaultProfile, profileReducer } from '@/store/profile'
import type { UserProfile } from './types'
import { UserProfilePage } from './index'

const defaultProfile: UserProfile = {
  ...getDefaultProfile(),
  avatarUrl: 'data:image/svg+xml,initial-avatar',
}

const createTestStore = () =>
  configureStore({
    reducer: {
      profile: profileReducer,
    },
    preloadedState: {
      profile: defaultProfile,
    },
  })

const renderPage = () => {
  const store = createTestStore()

  return {
    store,
    ...render(
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <ConfigProvider>
            <MemoryRouter initialEntries={['/profile']}>
              <Routes>
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/checkout/:eventId" element={<CheckoutPage />} />
              </Routes>
            </MemoryRouter>
          </ConfigProvider>
        </I18nextProvider>
      </Provider>,
    ),
  }
}

describe('UserProfilePage', () => {
  it('shows bookings by default', () => {
    renderPage()

    expect(screen.getByLabelText(profileEn.bookings.aria)).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: profileEn.form.title })).not.toBeInTheDocument()
  })

  it('shows profile details form when settings is selected', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: profileEn.nav.settings }))

    expect(screen.getByRole('heading', { name: profileEn.form.title })).toBeInTheDocument()
    expect(screen.queryByLabelText(profileEn.bookings.aria)).not.toBeInTheDocument()
  })

  it('shows saved placeholder when saved is selected', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: profileEn.nav.saved }))

    expect(
      screen.getByRole('heading', { name: profileEn.sections.saved.title }),
    ).toBeInTheDocument()
    expect(screen.queryByLabelText(profileEn.bookings.aria)).not.toBeInTheDocument()
  })

  it('navigates to checkout with booking eventId when pay tickets is clicked', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: profileEn.bookings.actions.payTickets }))

    await waitFor(() => {
      expect(screen.getByText(checkoutEn.event.jazzFest.title)).toBeInTheDocument()
    })
  })

  it('updates avatar after selecting a new image', async () => {
    const user = userEvent.setup()
    renderPage()

    const file = new File(['avatar'], 'avatar.png', { type: 'image/png' })
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement

    await user.upload(fileInput, file)

    await waitFor(() => {
      const avatarImage = screen.getByRole('img', { name: defaultProfile.fullName })
      expect(avatarImage).toHaveAttribute('src', expect.stringContaining('data:image/png;base64'))
    })
  })

  it('updates profile details after saving the form', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: profileEn.nav.settings }))
    await user.click(screen.getByRole('button', { name: profileEn.form.editDetails }))

    const fullNameInput = screen.getByDisplayValue(defaultProfile.fullName)
    await user.clear(fullNameInput)
    await user.type(fullNameInput, 'Aram K.')
    await user.click(screen.getByRole('button', { name: profileEn.form.saveChanges }))

    expect(screen.getByRole('heading', { name: 'Aram K.' })).toBeInTheDocument()
    expect(screen.getByDisplayValue('Aram K.')).toBeInTheDocument()
  })
})
