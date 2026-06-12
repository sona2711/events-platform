import type { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import '@/i18n'
import i18n from '@/i18n'
import { MemoryRouter } from 'react-router-dom'
import { store } from '@/store'
import { AdminLayout } from './index'

const renderLayout = (children: ReactNode = <p>Dashboard content</p>) =>
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ConfigProvider>
          <MemoryRouter initialEntries={['/admin']}>
            <AdminLayout title="Registrations" notificationCount={3}>
              {children}
            </AdminLayout>
          </MemoryRouter>
        </ConfigProvider>
      </I18nextProvider>
    </Provider>,
  )

describe('AdminLayout', () => {
  it('renders the admin header with the provided title', () => {
    renderLayout()

    expect(screen.getByRole('heading', { name: 'Registrations' })).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('renders the sidebar navigation', () => {
    renderLayout()

    expect(screen.getByRole('navigation', { name: 'Admin navigation' })).toBeInTheDocument()
  })

  it('renders page children inside the main content area', () => {
    renderLayout(<p>Registrations overview</p>)

    expect(screen.getByText('Registrations overview')).toBeInTheDocument()
  })
})
