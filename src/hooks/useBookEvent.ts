import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

type BookEventOptions = {
  ticketQuantity?: number
}

export const useBookEvent = () => {
  const navigate = useNavigate()

  return useCallback(
    (eventId: string, options?: BookEventOptions) => {
      navigate(`/checkout/${eventId}`, {
        state: options?.ticketQuantity ? { ticketQuantity: options.ticketQuantity } : undefined,
      })
    },
    [navigate],
  )
}
