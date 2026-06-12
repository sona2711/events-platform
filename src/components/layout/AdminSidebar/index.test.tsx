import { fireEvent, render, screen } from '@testing-library/react'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import '@/i18n'
import i18n from '@/i18n'
import commonEn from '@/locales/common/en.json'
import { MemoryRouter } from 'react-router-dom'
import { store } from '@/store'
import { ADMIN_NAV_LINKS } from './consts'
import { AdminSidebar } from './index'

const renderSidebar = (initialRoute = '/admin') =>
  render(
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ConfigProvider>
          <MemoryRouter initialEntries={[initialRoute]}>
            <AdminSidebar />
          </MemoryRouter>
        </ConfigProvider>
      </I18nextProvider>
    </Provider>,
  )

describe('AdminSidebar', () => {
  it('renders brand, subtitle, and admin navigation links', () => {
    renderSidebar()

    expect(screen.getByText(commonEn.brand)).toBeInTheDocument()
    expect(screen.getByText(commonEn.adminSidebar.subtitle)).toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: commonEn.aria.adminNav })).toBeInTheDocument()

    ADMIN_NAV_LINKS.forEach(({ labelKey }) => {
      const [, navKey] = labelKey.split('.') as [string, keyof typeof commonEn.adminNav]
      expect(screen.getByRole('link', { name: commonEn.adminNav[navKey] })).toBeInTheDocument()
    })
  })

  it('renders footer actions and admin profile', () => {
    renderSidebar()

    expect(screen.getByRole('button', { name: /create event/i })).toBeInTheDocument()
    expect(screen.getByText(commonEn.adminSidebar.adminName)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument()
  })

  it('opens and closes the mobile navigation menu', () => {
    renderSidebar()

    fireEvent.click(screen.getByRole('button', { name: commonEn.adminSidebar.toggleMenu }))

    expect(
      screen.getByRole('button', { name: commonEn.adminSidebar.closeMenu }),
    ).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: commonEn.adminSidebar.closeMenu }))

    expect(
      screen.queryByRole('button', { name: commonEn.adminSidebar.closeMenu }),
    ).not.toBeInTheDocument()
  })
})
