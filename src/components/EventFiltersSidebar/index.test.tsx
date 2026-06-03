import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EventFiltersSidebar } from '@/components/EventFiltersSidebar'
import { DEFAULT_FILTERS } from '@/pages/categoriesPage/consts'
import type { FilterState } from './types'

const renderSidebar = (overrides?: {
  filters?: FilterState
  onFiltersChange?: (filters: FilterState) => void
  onApply?: (appliedFilters?: FilterState) => void
}) => {
  const onFiltersChange = overrides?.onFiltersChange ?? jest.fn()
  const onApply = overrides?.onApply ?? jest.fn()
  const onReset = jest.fn()

  render(
    <EventFiltersSidebar
      filters={overrides?.filters ?? DEFAULT_FILTERS}
      onFiltersChange={onFiltersChange}
      onApply={onApply}
      onReset={onReset}
    />,
  )

  return { onFiltersChange, onApply, onReset }
}

describe('EventFiltersSidebar location', () => {
  it('opens the venue list when the location field wrapper is clicked', async () => {
    const user = userEvent.setup()
    renderSidebar()

    await user.click(screen.getByRole('textbox', { name: /location/i }))

    expect(screen.getByRole('listbox', { name: /available venues/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Opera House' })).toBeInTheDocument()
  })

  it('applies the selected venue immediately', async () => {
    const user = userEvent.setup()
    const onFiltersChange = jest.fn()
    const onApply = jest.fn()

    renderSidebar({ onFiltersChange, onApply })

    await user.click(screen.getByRole('textbox', { name: /location/i }))
    await user.click(screen.getByRole('option', { name: 'Opera House' }))

    expect(onFiltersChange).toHaveBeenCalledWith({
      ...DEFAULT_FILTERS,
      location: 'Opera House',
    })
    expect(onApply).toHaveBeenCalledWith({
      ...DEFAULT_FILTERS,
      location: 'Opera House',
    })
  })
})
