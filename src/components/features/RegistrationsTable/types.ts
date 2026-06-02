export type RegistrationCategory = 'MUSIC' | 'TECH' | 'ARTS'

export type RegistrationStatus = 'Active' | 'Pending' | 'Cancelled'

export interface RegistrationItem {
  id: string
  initials: string
  fullName: string
  email: string
  category: RegistrationCategory
  eventName: string
  dayMonth: string
  year: string
  date: string
  status: RegistrationStatus
}

export interface EditFormValues {
  fullName: string
  email: string
  category: RegistrationCategory
  status: RegistrationStatus
}

export interface RegistrationsTableProps {
  data: RegistrationItem[]
  selectedIds: Set<string>
  onSelectedIdsChange: (ids: Set<string>) => void
  onCancelSelected: () => void
  onUpdateItem: (item: RegistrationItem) => void
  onCancelItem: (id: string) => void
}
