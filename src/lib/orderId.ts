export const createOrderId = (): string => {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `order-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}
