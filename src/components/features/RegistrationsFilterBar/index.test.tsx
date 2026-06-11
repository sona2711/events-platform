import dayjs from 'dayjs'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ConfigProvider } from 'antd'
import { SEARCH_PLACEHOLDER } from './consts'
import { RegistrationsFilterBar } from './index'
import type { RegistrationsFilterValues } from './types'

const DEFAULT_FILTERS: RegistrationsFilterValues = {
  category: 'all',
  event: 'all',
  status: 'all',
  dateRange: [dayjs('2026-10-01'), dayjs('2026-10-31')],
  search: '',
}

const renderFilterBar = (
  overrides?: Partial<{
    filters: RegistrationsFilterValues
    onFiltersChange: (patch: Partial<RegistrationsFilterValues>) => void
    onReset: () => void
  }>,
) => {
  const onFiltersChange = overrides?.onFiltersChange ?? jest.fn()
  const onReset = overrides?.onReset ?? jest.fn()

  return {
    onFiltersChange,
    onReset,
    ...render(
      <ConfigProvider>
        <RegistrationsFilterBar
          filters={overrides?.filters ?? DEFAULT_FILTERS}
          onFiltersChange={onFiltersChange}
          onReset={onReset}
        />
      </ConfigProvider>,
    ),
  }
}

describe('RegistrationsFilterBar', () => {
  it('renders filter controls with accessible labels', () => {
    renderFilterBar()

    expect(screen.getByRole('region', { name: 'Registrations filters' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Filter by category' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Filter by event' })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Filter by status' })).toBeInTheDocument()
    expect(screen.getAllByRole('textbox', { name: 'Filter by date range' })).toHaveLength(2)
    expect(screen.getByLabelText('Search registrations by name or email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Reset all filters' })).toBeInTheDocument()
  })

  it('shows the current search value in the input', () => {
    renderFilterBar({ filters: { ...DEFAULT_FILTERS, search: 'anahit' } })

    expect(screen.getByLabelText('Search registrations by name or email')).toHaveValue('anahit')
    expect(screen.getByPlaceholderText(SEARCH_PLACEHOLDER)).toBeInTheDocument()
  })

  it('calls onFiltersChange when the search input changes', async () => {
    const user = userEvent.setup()
    const { onFiltersChange } = renderFilterBar()

    await user.type(screen.getByLabelText('Search registrations by name or email'), 'gev')

    expect(onFiltersChange).toHaveBeenCalled()
    expect(onFiltersChange).toHaveBeenLastCalledWith({ search: 'v' })
  })

  it('calls onReset when the reset button is clicked', async () => {
    const user = userEvent.setup()
    const { onReset } = renderFilterBar()

    await user.click(screen.getByRole('button', { name: 'Reset all filters' }))

    expect(onReset).toHaveBeenCalledTimes(1)
  })
})
