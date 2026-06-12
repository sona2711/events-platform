const PAID_BOOKINGS_STORAGE_KEY = 'events-platform-paid-bookings'

export const loadPaidEventIdsFromStorage = (): string[] => {
  try {
    const raw = localStorage.getItem(PAID_BOOKINGS_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.every((id) => typeof id === 'string') ? parsed : []
  } catch {
    return []
  }
}

export const savePaidEventIdsToStorage = (eventIds: string[]): void => {
  localStorage.setItem(PAID_BOOKINGS_STORAGE_KEY, JSON.stringify(eventIds))
}
