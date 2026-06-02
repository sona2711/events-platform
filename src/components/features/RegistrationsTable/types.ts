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
  status: RegistrationStatus
}
