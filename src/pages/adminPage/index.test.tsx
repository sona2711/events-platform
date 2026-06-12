import { fireEvent, screen, within } from '@testing-library/react'
import { ConfigProvider } from 'antd'
import { I18nextProvider } from 'react-i18next'
import '@/i18n'
import i18n from '@/i18n'
import { REGISTRATIONS_DATA } from '@/components/features/RegistrationsTable/consts'
import { STAT_CARD_META } from '@/components/features/RegistrationStatsCards/consts'
import { MemoryRouter } from 'react-router-dom'
import { renderWithTheme } from '@/test/renderWithTheme'
import { AdminPage } from './index'

jest.mock('@/providers/notifications/utils', () => ({
  showSystemMessage: jest.fn(),
}))

const { showSystemMessage } = jest.requireMock<{
  showSystemMessage: jest.Mock
}>('@/providers/notifications/utils')

const renderAdminPage = () =>
  renderWithTheme(
    <I18nextProvider i18n={i18n}>
      <ConfigProvider>
        <MemoryRouter initialEntries={['/admin']}>
          <AdminPage />
        </MemoryRouter>
      </ConfigProvider>
    </I18nextProvider>,
  )

describe('AdminPage', () => {
  beforeEach(() => {
    showSystemMessage.mockClear()
  })

  it('renders the admin dashboard with layout, stats, filters, and table', () => {
    renderAdminPage()

    expect(screen.getByRole('heading', { name: 'Registrations' })).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Registration statistics' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Registrations filters' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Registrations table' })).toBeInTheDocument()

    const statsList = screen.getByRole('list', { name: 'Registration statistics' })

    STAT_CARD_META.forEach((card) => {
      expect(within(statsList).getByText(card.label)).toBeInTheDocument()
    })
  })

  it('shows registration stats derived from the full dataset', () => {
    renderAdminPage()

    const total = REGISTRATIONS_DATA.length
    const active = REGISTRATIONS_DATA.filter((item) => item.status === 'Active').length
    const cancelled = REGISTRATIONS_DATA.filter((item) => item.status === 'Cancelled').length
    const pending = REGISTRATIONS_DATA.filter((item) => item.status === 'Pending').length

    expect(screen.getByText(total.toLocaleString())).toBeInTheDocument()
    expect(screen.getByText(active.toLocaleString())).toBeInTheDocument()
    expect(screen.getByText(cancelled.toLocaleString())).toBeInTheDocument()
    expect(screen.getByText(pending.toLocaleString())).toBeInTheDocument()
  })

  it('filters table rows when searching by name', () => {
    renderAdminPage()

    expect(screen.getByText(`(${REGISTRATIONS_DATA.length})`)).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Search registrations by name or email'), {
      target: { value: 'Anahit' },
    })

    expect(screen.getByText('Anahit Sargsyan')).toBeInTheDocument()
    expect(screen.queryByText('Gevorg Abrahamyan')).not.toBeInTheDocument()
    expect(screen.getByText('(1)')).toBeInTheDocument()
  })

  it('resets filters when reset is clicked', () => {
    renderAdminPage()

    const searchInput = screen.getByLabelText('Search registrations by name or email')
    fireEvent.change(searchInput, { target: { value: 'Anahit' } })
    expect(screen.getByText('(1)')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Reset all filters' }))

    expect(searchInput).toHaveValue('')
    expect(screen.getByText(`(${REGISTRATIONS_DATA.length})`)).toBeInTheDocument()
  })

  it('cancels selected registrations and shows a success message', () => {
    renderAdminPage()

    fireEvent.click(screen.getByLabelText('Select Anahit Sargsyan'))
    fireEvent.click(screen.getByRole('button', { name: 'Cancel Selected' }))

    const tableRegion = screen.getByRole('region', { name: 'Registrations table' })
    const anahitRow = within(tableRegion).getByText('Anahit Sargsyan').closest('tr')
    expect(anahitRow).toHaveTextContent('Cancelled')
    expect(showSystemMessage).toHaveBeenCalledWith({
      content: 'Selected registrations cancelled',
      variant: 'success',
    })
  })
})
