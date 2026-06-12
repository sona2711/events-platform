import { formatPriceAmd } from '@/mock-api/eventDetailUtils'

export const toTelHref = (phone: string): string => phone.replace(/[^\d+]/g, '')

const REFUND_PHONE_PATTERN = /^\+?[\d\s()-]{8,20}$/

export const isValidRefundPhone = (phone: string): boolean =>
  REFUND_PHONE_PATTERN.test(phone.trim())

export const formatTicketFeeLabel = (serviceFeeAmd: number): string => {
  if (serviceFeeAmd === 0) return 'No service fee'

  return `+ ${formatPriceAmd(serviceFeeAmd)} fee`
}
