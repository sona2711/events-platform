import { useMemo, useState } from 'react'
import { message } from 'antd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { CheckoutContactForm } from '@/components/features/CheckoutContactForm'
import { CheckoutOrderSummary } from '@/components/features/CheckoutOrderSummary'
import { CheckoutPaymentForm } from '@/components/features/CheckoutPaymentForm'
import { CheckoutStepSection } from '@/components/features/CheckoutStepSection'
import { CheckoutTicketSelector } from '@/components/features/CheckoutTicketSelector'
import { useAppSelector } from '@/store/hooks'
import { selectProfile } from '@/store/profile'
import {
  CHECKOUT_SUBMIT_DELAY_MS,
  CHECKOUT_TICKET_TIERS,
  DEFAULT_TICKET_SELECTION,
  getCheckoutEventById,
} from './consts'
import type {
  CheckoutContactValues,
  CheckoutPaymentValues,
  OrderStatus,
  TicketSelection,
} from './types'
import { buildOrderTotals, getCheckoutReadiness } from './utils'
import styles from './styles.module.css'

export const CheckoutPage = () => {
  const { t } = useTranslation('checkout')
  const { eventId = '' } = useParams<{ eventId: string }>()
  const profile = useAppSelector(selectProfile)
  const event = getCheckoutEventById(eventId)

  const [ticketSelection, setTicketSelection] = useState<TicketSelection>(DEFAULT_TICKET_SELECTION)
  const [contactValues, setContactValues] = useState<CheckoutContactValues | null>(null)
  const [paymentValues, setPaymentValues] = useState<CheckoutPaymentValues | null>(null)
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('idle')

  const contactInitialValues = useMemo<CheckoutContactValues>(
    () => ({
      fullName: profile.fullName || t('defaults.contact.fullName'),
      email: profile.email || t('defaults.contact.email'),
    }),
    [profile.email, profile.fullName, t],
  )

  const totals = useMemo(
    () => buildOrderTotals(ticketSelection, CHECKOUT_TICKET_TIERS),
    [ticketSelection],
  )

  const readiness = useMemo(
    () => getCheckoutReadiness(ticketSelection, contactValues, paymentValues),
    [contactValues, paymentValues, ticketSelection],
  )

  const handleQuantityChange = (tierId: string, quantity: number) => {
    setTicketSelection((current) => ({
      ...current,
      [tierId]: Math.max(0, quantity),
    }))
  }

  const handlePlaceOrder = async () => {
    if (!readiness.isReady || !event) {
      return
    }

    setOrderStatus('submitting')

    try {
      await new Promise((resolve) => {
        window.setTimeout(resolve, CHECKOUT_SUBMIT_DELAY_MS)
      })
      setOrderStatus('success')
      message.success(t('messages.orderSuccess'))
    } catch {
      setOrderStatus('error')
      message.error(t('messages.orderError'))
    }
  }

  if (!event) {
    return <p className={styles.notFound}>{t('messages.eventNotFound')}</p>
  }

  const isSubmitting = orderStatus === 'submitting'

  return (
    <div className={styles.page}>
      <div className={styles.main}>
        <CheckoutStepSection
          stepNumber={1}
          title={t('steps.tickets.title')}
          ariaLabel={t('steps.tickets.aria')}
        >
          <CheckoutTicketSelector
            tiers={CHECKOUT_TICKET_TIERS}
            selection={ticketSelection}
            onQuantityChange={handleQuantityChange}
          />
        </CheckoutStepSection>

        <CheckoutStepSection
          stepNumber={2}
          title={t('steps.contact.title')}
          ariaLabel={t('steps.contact.aria')}
        >
          <CheckoutContactForm
            initialValues={contactInitialValues}
            onValidChange={setContactValues}
          />
        </CheckoutStepSection>

        <CheckoutStepSection
          stepNumber={3}
          title={t('steps.payment.title')}
          ariaLabel={t('steps.payment.aria')}
        >
          <CheckoutPaymentForm onValidChange={setPaymentValues} />
        </CheckoutStepSection>
      </div>

      <div className={styles.sidebar}>
        <CheckoutOrderSummary
          event={event}
          totals={totals}
          isReady={readiness.isReady}
          isSubmitting={isSubmitting}
          onPlaceOrder={() => {
            void handlePlaceOrder()
          }}
        />
      </div>
    </div>
  )
}
