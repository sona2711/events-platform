import type { Dayjs } from 'dayjs'

export interface SelectOption {
  label: string
  value: string
}

export interface RegistrationsFilterValues {
  category: string
  event: string
  status: string
  dateRange: [Dayjs, Dayjs] | null
  search: string
}

export interface RegistrationsFilterBarProps {
  filters: RegistrationsFilterValues
  onFiltersChange: (patch: Partial<RegistrationsFilterValues>) => void
  onReset: () => void
}
