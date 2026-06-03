import type { RegistrationItem } from '@/components/features/RegistrationsTable/types'
import type { RegistrationsFilterValues } from '@/components/features/RegistrationsFilterBar/types'

const EVENT_NAME_BY_KEY: Record<string, string> = {
  'yerevan-jazz-fest': 'Yerevan Jazz Fest',
  'armenia-it-forum': 'Armenia IT Forum',
  'cascade-wine-days': 'Cascade Wine Days',
}

export const applyFilters = (
  data: RegistrationItem[],
  filters: RegistrationsFilterValues,
): RegistrationItem[] => {
  return data.filter((item) => {
    if (filters.category !== 'all' && item.category.toLowerCase() !== filters.category) {
      return false
    }

    if (filters.event !== 'all') {
      const expectedName = EVENT_NAME_BY_KEY[filters.event]
      if (expectedName && item.eventName !== expectedName) return false
    }

    if (filters.status !== 'all' && item.status.toLowerCase() !== filters.status) {
      return false
    }

    if (filters.dateRange) {
      const [from, to] = filters.dateRange
      const itemDate = new Date(item.date)
      const fromDate = from.startOf('day').toDate()
      const toDate = to.endOf('day').toDate()
      if (itemDate < fromDate || itemDate > toDate) return false
    }

    if (filters.search) {
      const q = filters.search.toLowerCase()
      const matchesName = item.fullName.toLowerCase().includes(q)
      const matchesEmail = item.email.toLowerCase().includes(q)
      if (!matchesName && !matchesEmail) return false
    }

    return true
  })
}
