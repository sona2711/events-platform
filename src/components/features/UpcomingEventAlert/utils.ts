export const getDaysUntilEvent = (startsAt: string, now = new Date()) => {
  const eventDate = new Date(startsAt)
  const diff = eventDate.getTime() - now.getTime()

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export const getReminderStorageKey = (bookingId: string) => `event-reminder-${bookingId}`

export const hasReminder = (bookingId: string) =>
  localStorage.getItem(getReminderStorageKey(bookingId)) === 'true'

export const saveReminder = (bookingId: string) => {
  localStorage.setItem(getReminderStorageKey(bookingId), 'true')
}
