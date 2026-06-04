export const getTicketPrice = (price: string): number => {
  if (price.toLowerCase() === 'free') return 0

  const numericPrice = Number(price.replace(/[^\d]/g, ''))

  return Number.isFinite(numericPrice) ? numericPrice : 0
}

export const getPaymentAmount = (price: string, ticketQuantity: number): number =>
  getTicketPrice(price) * ticketQuantity

export const formatAmdAmount = (amount: number): string => {
  if (amount === 0) return '0 AMD'

  return `${new Intl.NumberFormat('en-US').format(amount)} AMD`
}
