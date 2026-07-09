import { useCallback } from 'react'
import { Grid } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { PaymentEvent } from '@/components/features/TicketPaymentModal/types'
import { useEventBookingModal } from './useEventBookingModal'

type UseResponsiveEventBookingOptions<TEvent extends PaymentEvent> = {
  resolveEvent: (eventId: string) => TEvent | null | undefined
}

export const getEventDetailPath = (eventId: string): string => `/event/${eventId}`

export const useResponsiveEventBooking = <TEvent extends PaymentEvent>({
  resolveEvent,
}: UseResponsiveEventBookingOptions<TEvent>) => {
  const navigate = useNavigate()
  const screens = Grid.useBreakpoint()
  const isDesktop = Boolean(screens.md)

  const { handleBook: openModal, bookingModal } = useEventBookingModal({ resolveEvent })

  const handleBook = useCallback(
    (eventId: string) => {
      if (isDesktop) {
        openModal(eventId)
        return
      }

      navigate(getEventDetailPath(eventId))
    },
    [isDesktop, navigate, openModal],
  )

  return { handleBook, bookingModal }
}
