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
  onApply: () => void
  onReset: () => void
  className?: string
}
