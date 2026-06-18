export type OrderLineItem = {
  name: string
  quantity: number
  amountAmd: number
}

export type Order = {
  id: string
  total: number
  status: string
  createdAt: string
  userId: string
  userEmail: string
  userName: string
  userPhone?: string
  paymentMethod: string
  eventId: string
  eventTitle: string
  lineItems: OrderLineItem[]
}

export type SendOrderToTelegramResult = {
  ok: boolean
  skipped?: true
  result?: unknown
  description?: string
}
