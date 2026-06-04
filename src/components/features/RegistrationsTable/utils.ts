import type { RegistrationItem } from './types'

export const buildInitials = (fullName: string): string => {
  const parts = fullName.trim().split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  }
  return parts[0].substring(0, 2).toUpperCase()
}

export const exportToCsv = (data: RegistrationItem[], filename: string): void => {
  const headers = ['ID', 'Full Name', 'Email', 'Category', 'Event Name', 'Date', 'Status']
  const rows = data.map((item) => [
    item.id,
    item.fullName,
    item.email,
    item.category,
    item.eventName,
    `${item.dayMonth} ${item.year}`,
    item.status,
  ])
  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
