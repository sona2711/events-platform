import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import { ProfileDetailsForm } from '@/components/features/ProfileDetailsForm'
import '@/i18n'
import i18n from '@/i18n'
import commonEn from '@/locales/common/en.json'
import profileEn from '@/locales/profile/en.json'
import type { UserProfile } from '@/pages/userProfile/types'

const profile: UserProfile = {
  id: 'user-1',
  fullName: profileEn.user.fullName,
  location: profileEn.user.location,
  avatarUrl: 'data:image/svg+xml,test',
  email: 'aram.kh@example.am',
  phone: '+374 91 123 456',
  preferredLanguage: 'hy',
}

const languageOptions = [
  { value: 'hy' as const, label: commonEn.languages.hy },
  { value: 'en' as const, label: commonEn.languages.en },
]

const renderForm = (onSave = jest.fn()) =>
  render(
    <I18nextProvider i18n={i18n}>
      <ConfigProvider>
        <ProfileDetailsForm profile={profile} languageOptions={languageOptions} onSave={onSave} />
      </ConfigProvider>
    </I18nextProvider>,
  )

describe('ProfileDetailsForm', () => {
  it('renders profile fields as read-only until edit is clicked', () => {
    renderForm()

    expect(screen.getByDisplayValue(profileEn.user.fullName)).toBeDisabled()
    expect(
      screen.queryByRole('button', { name: profileEn.form.saveChanges }),
    ).not.toBeInTheDocument()
  })

  it('enables editing and submits updated values', async () => {
    const user = userEvent.setup()
    const onSave = jest.fn()
    renderForm(onSave)

    await user.click(screen.getByRole('button', { name: profileEn.form.editDetails }))

    const fullNameInput = screen.getByDisplayValue(profileEn.user.fullName)
    expect(fullNameInput).not.toBeDisabled()

    await user.clear(fullNameInput)
    await user.type(fullNameInput, 'Aram K.')
    await user.click(screen.getByRole('button', { name: profileEn.form.saveChanges }))

    expect(onSave).toHaveBeenCalledWith({
      fullName: 'Aram K.',
      email: profile.email,
      phone: profile.phone,
      preferredLanguage: profile.preferredLanguage,
    })
  })
})
