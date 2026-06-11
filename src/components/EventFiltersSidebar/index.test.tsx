import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EventFiltersSidebar } from '@/components/EventFiltersSidebar'
import { CATEGORIES } from '@/components/EventFiltersSidebar/consts'
import { DEFAULT_FILTERS } from '@/pages/categoriesPage/consts'
import type { FilterState } from './types'

const renderSidebar = (overrides?: {
  filters?: FilterState
  onFiltersChange?: (filters: FilterState) => void
  onApply?: (appliedFilters?: FilterState) => void
  onReset?: () => void
}) => {
  const onFiltersChange = overrides?.onFiltersChange ?? jest.fn()
  const onApply = overrides?.onApply ?? jest.fn()
  const onReset = overrides?.onReset ?? jest.fn()

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

describe('EventFiltersSidebar', () => {
  describe('initial rendering', () => {
    it('renders all filter sections with stable accessible selectors', () => {
      renderSidebar()

      expect(screen.getByRole('complementary', { name: 'Event filters' })).toBeInTheDocument()

      expect(screen.getByLabelText('Select Date')).toBeInTheDocument()
      expect(screen.getByLabelText('Minimum price')).toBeInTheDocument()
      expect(screen.getByLabelText('Maximum price')).toBeInTheDocument()
      expect(screen.getByRole('group', { name: 'Filter by category' })).toBeInTheDocument()
      expect(screen.getByRole('textbox', { name: /location/i })).toBeInTheDocument()

      CATEGORIES.forEach((category) => {
        expect(screen.getByRole('button', { name: category })).toBeInTheDocument()
      })

      expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Apply Filters' })).toBeInTheDocument()
    })

    it('reflects the current filter values passed via props', () => {
      const filters: FilterState = {
        date: '2025-06-15',
        priceMin: 5_000,
        priceMax: 50_000,
        categories: ['Music'],
        location: 'Opera House',
      }

      renderSidebar({ filters })

      expect(screen.getByLabelText('Select Date')).toHaveValue('2025-06-15')
      expect(screen.getByLabelText('Minimum price')).toHaveValue('5000')
      expect(screen.getByLabelText('Maximum price')).toHaveValue('50000')
      expect(screen.getByRole('button', { name: 'Music' })).toHaveAttribute('aria-pressed', 'true')
      expect(screen.getByRole('textbox', { name: /location/i })).toHaveValue('Opera House')
      expect(screen.getByText('5,000 AMD')).toBeInTheDocument()
      expect(screen.getByText('50,000 AMD')).toBeInTheDocument()
    })
  })

  describe('filter interactions', () => {
    it('calls onFiltersChange when the date input changes', () => {
      const onFiltersChange = jest.fn()
      renderSidebar({ onFiltersChange })

      fireEvent.change(screen.getByLabelText('Select Date'), {
        target: { value: '2025-06-15' },
      })

      expect(onFiltersChange).toHaveBeenCalledWith({
        ...DEFAULT_FILTERS,
        date: '2025-06-15',
      })
    })

    it('calls onFiltersChange when the minimum price slider changes', () => {
      const filters: FilterState = { ...DEFAULT_FILTERS, priceMax: 50_000 }
      const onFiltersChange = jest.fn()
      renderSidebar({ filters, onFiltersChange })

      fireEvent.change(screen.getByLabelText('Minimum price'), {
        target: { value: '10000' },
      })

      expect(onFiltersChange).toHaveBeenCalledWith({
        ...filters,
        priceMin: 10_000,
      })
    })

    it('calls onFiltersChange when the maximum price slider changes', () => {
      const filters: FilterState = { ...DEFAULT_FILTERS, priceMin: 5_000 }
      const onFiltersChange = jest.fn()
      renderSidebar({ filters, onFiltersChange })

      fireEvent.change(screen.getByLabelText('Maximum price'), {
        target: { value: '50000' },
      })

      expect(onFiltersChange).toHaveBeenCalledWith({
        ...filters,
        priceMax: 50_000,
      })
    })

    it('calls onFiltersChange when a category is selected', async () => {
      const user = userEvent.setup()
      const onFiltersChange = jest.fn()
      renderSidebar({ onFiltersChange })

      await user.click(screen.getByRole('button', { name: 'Music' }))

      expect(onFiltersChange).toHaveBeenCalledWith({
        ...DEFAULT_FILTERS,
        categories: ['Music'],
      })
    })

    it('opens the venue list when the location field is focused', async () => {
      const user = userEvent.setup()
      renderSidebar()

      await user.click(screen.getByRole('textbox', { name: /location/i }))

      expect(screen.getByRole('listbox', { name: 'Available venues' })).toBeInTheDocument()
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

  describe('action buttons', () => {
    it('calls onApply when Apply Filters is clicked', async () => {
      const user = userEvent.setup()
      const onApply = jest.fn()
      renderSidebar({ onApply })

      await user.click(screen.getByRole('button', { name: 'Apply Filters' }))

      expect(onApply).toHaveBeenCalledTimes(1)
      expect(onApply).toHaveBeenCalledWith()
    })

    it('calls onReset when Reset is clicked', async () => {
      const user = userEvent.setup()
      const onReset = jest.fn()
      renderSidebar({ onReset })

      await user.click(screen.getByRole('button', { name: 'Reset' }))

      expect(onReset).toHaveBeenCalledTimes(1)
    })
  })
})
