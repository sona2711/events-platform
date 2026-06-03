export type FilterState = {
  date: string
  priceMin: number
  priceMax: number
  categories: string[]
  location: string
}

export type EventFiltersSidebarProps = {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onApply: (appliedFilters?: FilterState) => void
  onReset: () => void
  className?: string
}
