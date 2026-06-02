export type StatCardVariant = 'total' | 'active' | 'cancelled' | 'pending'

export interface StatCard {
  id: StatCardVariant
  label: string
  value: string
}
