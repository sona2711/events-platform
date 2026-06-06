import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
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
import { profileReducer } from '@/store/profile'
import type { UserProfile } from './types'
import { UserProfilePage } from './index'

const loggedInProfile: UserProfile = {
  id: 'GZTYzVBmv8RfSJOaTSXvWKdN3js2',
  fullName: 'Sona Mkrtchyan',
  location: 'Yerevan',
  avatarUrl: 'https://lh3.googleusercontent.com/a/example-photo',
  email: 'mkrtchyansona77@gmail.com',
  phone: '+374 91 123 456',
  preferredLanguage: 'en',
}

const createTestStore = (profile: UserProfile = loggedInProfile) =>
  configureStore({
    reducer: {
      profile: profileReducer,
    },
    preloadedState: {
      profile,
    },
  })

const renderPage = (profile: UserProfile = loggedInProfile) => {
  const store = createTestStore(profile)

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
  it('shows logged-in user data in sidebar and settings', async () => {
    const user = userEvent.setup()
    renderPage()

    expect(screen.getByRole('heading', { name: loggedInProfile.fullName })).toBeInTheDocument()

    const sidebar = screen.getByLabelText(profileEn.sidebar.aria.navigation)
    expect(within(sidebar).getByText(loggedInProfile.location)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: profileEn.nav.settings }))

    expect(screen.getByDisplayValue(loggedInProfile.fullName)).toBeInTheDocument()
    expect(screen.getByDisplayValue(loggedInProfile.email)).toBeInTheDocument()
    expect(screen.getByDisplayValue(loggedInProfile.phone)).toBeInTheDocument()
    expect(screen.getByLabelText(profileEn.form.fields.location)).toBeInTheDocument()
  })

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
      const avatarImage = screen.getByRole('img', { name: loggedInProfile.fullName })
      expect(avatarImage).toHaveAttribute('src', expect.stringContaining('data:image/png;base64'))
    })
  })

  it('updates profile details after saving the form', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByRole('button', { name: profileEn.nav.settings }))
    await user.click(screen.getByRole('button', { name: profileEn.form.editDetails }))

    const fullNameInput = screen.getByDisplayValue(loggedInProfile.fullName)
    await user.clear(fullNameInput)
    await user.type(fullNameInput, 'Aram K.')
    await user.click(screen.getByRole('button', { name: profileEn.form.saveChanges }))

    expect(screen.getByRole('heading', { name: 'Aram K.' })).toBeInTheDocument()
    expect(screen.getByDisplayValue('Aram K.')).toBeInTheDocument()
  }, 10000)

  it('updates sidebar location after saving settings', async () => {
    const user = userEvent.setup()
    renderPage()

    const sidebar = screen.getByLabelText(profileEn.sidebar.aria.navigation)
    expect(within(sidebar).getByText('Yerevan')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: profileEn.nav.settings }))
    await user.click(screen.getByRole('button', { name: profileEn.form.editDetails }))

    const locationSelect = screen.getByLabelText(profileEn.form.fields.location)
    fireEvent.mouseDown(locationSelect)
    await user.click(await screen.findByText('Kotayk'))
    await user.click(screen.getByRole('button', { name: profileEn.form.saveChanges }))

    await waitFor(() => {
      expect(within(sidebar).getByText('Kotayk')).toBeInTheDocument()
    })
  }, 10000)
})
