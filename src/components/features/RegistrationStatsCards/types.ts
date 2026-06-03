export type StatCardVariant = 'total' | 'active' | 'cancelled' | 'pending'

export interface StatCardMeta {
  id: StatCardVariant
  label: string
}

export interface RegistrationStatsCardsProps {
  total: number
  active: number
  cancelled: number
  pending: number
}
