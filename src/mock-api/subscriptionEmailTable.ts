export type SubscriptionEmailRow = {
  id: string
  email: string
  createdAt: string
}

export const subscriptionEmailTable: SubscriptionEmailRow[] = []

export const addSubscriptionEmail = (email: string): SubscriptionEmailRow => {
  const subscriptionEmailRow = {
    id: crypto.randomUUID(),
    email,
    createdAt: new Date().toISOString(),
  }

  subscriptionEmailTable.push(subscriptionEmailRow)

  return subscriptionEmailRow
}
