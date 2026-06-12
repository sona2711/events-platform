import { screen } from '@testing-library/react'
import { ConfigProvider } from 'antd'
import { renderWithTheme } from '@/test/renderWithTheme'
import { AdminHeader } from './index'

const renderHeader = (props?: Partial<Parameters<typeof AdminHeader>[0]>) =>
  renderWithTheme(
    <ConfigProvider>
      <AdminHeader title="Registrations" notificationCount={3} {...props} />
    </ConfigProvider>,
  )

describe('AdminHeader', () => {
  it('renders the page title', () => {
    renderHeader()

    expect(screen.getByRole('heading', { name: 'Registrations' })).toBeInTheDocument()
  })

  it('renders global search and action buttons', () => {
    renderHeader()

    expect(screen.getByPlaceholderText('Global search...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Notifications' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Help' })).toBeInTheDocument()
  })

  it('shows the notification badge count', () => {
    renderHeader({ notificationCount: 5 })

    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('defaults notification count to zero when not provided', () => {
    renderHeader({ notificationCount: undefined })

    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
})
