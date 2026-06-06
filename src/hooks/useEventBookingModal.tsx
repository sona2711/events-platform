import { lazy, Suspense, useCallback, useState, type ReactNode } from 'react'
import type { PaymentEvent } from '@/components/features/TicketPaymentModal/types'

const TicketPaymentModal = lazy(() =>
  import('@/components/features/TicketPaymentModal').then((module) => ({
    default: module.TicketPaymentModal,
  })),
)

type UseEventBookingModalOptions<TEvent extends PaymentEvent> = {
  resolveEvent: (eventId: string) => TEvent | null | undefined
}

export const useEventBookingModal = <TEvent extends PaymentEvent>({
  resolveEvent,
}: UseEventBookingModalOptions<TEvent>) => {
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null)

  const handleBook = useCallback(
    (eventId: string) => {
      setSelectedEvent(resolveEvent(eventId) ?? null)
    },
    [resolveEvent],
  )

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null)
  }, [])

  const bookingModal: ReactNode =
    selectedEvent !== null ? (
      <Suspense fallback={null}>
        <TicketPaymentModal event={selectedEvent} open onClose={handleCloseModal} />
      </Suspense>
    ) : null

  return { handleBook, handleCloseModal, bookingModal }
}
