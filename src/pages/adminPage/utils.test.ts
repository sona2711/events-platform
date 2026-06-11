import dayjs from 'dayjs'
import type { RegistrationItem } from '@/components/features/RegistrationsTable/types'
import type { RegistrationsFilterValues } from '@/components/features/RegistrationsFilterBar/types'
import { applyFilters } from './utils'

const SAMPLE_DATA: RegistrationItem[] = [
  {
    id: 'reg-1',
    initials: 'AS',
    fullName: 'Anahit Sargsyan',
    email: 'anahit@email.am',
    category: 'MUSIC',
    eventName: 'Yerevan Jazz Fest',
    dayMonth: 'Oct 24,',
    year: '2026',
    date: '2026-10-24',
    status: 'Active',
  },
  {
    id: 'reg-2',
    initials: 'GA',
    fullName: 'Gevorg Abrahamyan',
    email: 'gev.ab@mail.ru',
    category: 'TECH',
    eventName: 'Armenia IT Forum',
    dayMonth: 'Oct 26,',
    year: '2026',
    date: '2026-10-26',
    status: 'Pending',
  },
  {
    id: 'reg-3',
    initials: 'NM',
    fullName: 'Nare Mkrtchyan',
    email: 'nare@web.am',
    category: 'ARTS',
    eventName: 'Cascade Wine Days',
    dayMonth: 'Oct 22,',
    year: '2026',
    date: '2026-10-22',
    status: 'Cancelled',
  },
]

const BASE_FILTERS: RegistrationsFilterValues = {
  category: 'all',
  event: 'all',
  status: 'all',
  dateRange: null,
  search: '',
}

describe('applyFilters', () => {
  it('returns all items when filters are set to all', () => {
    expect(applyFilters(SAMPLE_DATA, BASE_FILTERS)).toHaveLength(3)
  })

  it('filters by category', () => {
    const result = applyFilters(SAMPLE_DATA, { ...BASE_FILTERS, category: 'music' })

    expect(result).toHaveLength(1)
    expect(result[0]?.fullName).toBe('Anahit Sargsyan')
  })

  it('filters by event key', () => {
    const result = applyFilters(SAMPLE_DATA, {
      ...BASE_FILTERS,
      event: 'armenia-it-forum',
    })

    expect(result).toHaveLength(1)
    expect(result[0]?.fullName).toBe('Gevorg Abrahamyan')
  })

  it('filters by status', () => {
    const result = applyFilters(SAMPLE_DATA, { ...BASE_FILTERS, status: 'cancelled' })

    expect(result).toHaveLength(1)
    expect(result[0]?.fullName).toBe('Nare Mkrtchyan')
  })

  it('filters by date range', () => {
    const result = applyFilters(SAMPLE_DATA, {
      ...BASE_FILTERS,
      dateRange: [dayjs('2026-10-24'), dayjs('2026-10-26')],
    })

    expect(result.map((item) => item.id)).toEqual(['reg-1', 'reg-2'])
  })

  it('filters by search term matching name or email', () => {
    const byName = applyFilters(SAMPLE_DATA, { ...BASE_FILTERS, search: 'nare' })
    const byEmail = applyFilters(SAMPLE_DATA, { ...BASE_FILTERS, search: 'mail.ru' })

    expect(byName).toHaveLength(1)
    expect(byName[0]?.fullName).toBe('Nare Mkrtchyan')
    expect(byEmail).toHaveLength(1)
    expect(byEmail[0]?.fullName).toBe('Gevorg Abrahamyan')
  })
})
