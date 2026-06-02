export type FilterState = {
  date: string
  priceMin: number
  priceMax: number
  categories: string[]
  location: string
}

export type EventFiltersSidebarProps = {
  onApply: (filters: FilterState) => void
  initialFilters?: Partial<FilterState>
  className?: string
}
