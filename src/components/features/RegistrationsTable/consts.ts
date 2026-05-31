import type { RegistrationItem, RegistrationStatus } from './types'

export const REGISTRATIONS_DATA: RegistrationItem[] = [
  {
    id: 'registration-1',
    initials: 'AS',
    fullName: 'Anahit Sargsyan',
    email: 'anahit@email.am',
    category: 'MUSIC',
    eventName: 'Yerevan Jazz Fest',
    dayMonth: 'Oct 24,',
    year: '2026',
    status: 'Active',
  },
  {
    id: 'registration-2',
    initials: 'GA',
    fullName: 'Gevorg Abrahamyan',
    email: 'gev.ab@mail.ru',
    category: 'TECH',
    eventName: 'Armenia IT Forum',
    dayMonth: 'Oct 26,',
    year: '2026',
    status: 'Pending',
  },
  {
    id: 'registration-3',
    initials: 'NM',
    fullName: 'Nare Mkrtchyan',
    email: 'nare@web.am',
    category: 'ARTS',
    eventName: 'Cascade Wine Days',
    dayMonth: 'Oct 22,',
    year: '2026',
    status: 'Cancelled',
  },
  {
    id: 'registration-4',
    initials: 'AM',
    fullName: 'Artur Melikyan',
    email: 'artur.m@haypost.am',
    category: 'MUSIC',
    eventName: 'Yerevan Jazz Fest',
    dayMonth: 'Oct 24,',
    year: '2026',
    status: 'Active',
  },
]

export const STATUS_CLASS_BY_VALUE: Record<RegistrationStatus, string> = {
  Active: 'statusActive',
  Pending: 'statusPending',
  Cancelled: 'statusCancelled',
}
