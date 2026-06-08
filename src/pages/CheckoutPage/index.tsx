import { useEffect, useMemo, useState } from 'react'
import { Empty, Flex } from 'antd'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { CheckoutContactForm } from '@/components/features/CheckoutContactForm'
import { CheckoutOrderSummary } from '@/components/features/CheckoutOrderSummary'
import { CheckoutPaymentForm } from '@/components/features/CheckoutPaymentForm'
import { CheckoutStepSection } from '@/components/features/CheckoutStepSection'
import { CheckoutTicketSelector } from '@/components/features/CheckoutTicketSelector'
import { showSystemMessage } from '@/providers/notifications/utils'
import { useAppSelector } from '@/store/hooks'
import { selectProfile } from '@/store/profile'
import { createDefaultTicketSelection, getCheckoutEventById, EMPTY_TICKET_TIERS } from './consts'
import type {
  CheckoutContactValues,
  CheckoutPaymentValues,
  OrderStatus,
  TicketSelection,
} from './types'
import {
  buildOrderTotals,
  getCheckoutReadiness,
  getCheckoutStepStatus,
  normalizeCardNumber,
} from './utils'
import { sendOrderToTelegram } from '@/__mocks__/telegramBot'
import type { Order } from '@/types'
import styles from './styles.module.css'

export const CheckoutPage = () => {
  const { t } = useTranslation('checkout')
  const { eventId = '' } = useParams<{ eventId: string }>()
  const profile = useAppSelector(selectProfile)
  const event = getCheckoutEventById(eventId)
  const ticketTiers = event?.ticketTiers ?? EMPTY_TICKET_TIERS

  const [ticketSelection, setTicketSelection] = useState<TicketSelection>(() =>
    event ? createDefaultTicketSelection(event.ticketTiers) : {},
  )
  const [contactValues, setContactValues] = useState<CheckoutContactValues | null>(null)
  const [paymentValues, setPaymentValues] = useState<CheckoutPaymentValues | null>(null)
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('idle')

  useEffect(() => {
    const checkoutEvent = getCheckoutEventById(eventId)
    if (checkoutEvent) {
      setTicketSelection(createDefaultTicketSelection(checkoutEvent.ticketTiers))
      setContactValues(null)
      setPaymentValues(null)
      setOrderStatus('idle')
    }
  }, [eventId])

  const contactInitialValues = useMemo<CheckoutContactValues>(
    () => ({
      fullName: profile.fullName || t('defaults.contact.fullName'),
      email: profile.email || t('defaults.contact.email'),
    }),
    [profile.email, profile.fullName, t],
  )

  const totals = useMemo(
    () => buildOrderTotals(ticketSelection, ticketTiers),
    [ticketSelection, ticketTiers],
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
    const now = new Date().toISOString()

    const order: Order = {
      id: crypto.randomUUID(),
      total: totals.totalAmd,
      status: 'pending',
      createdAt: now,
      userId: profile.id,
      userEmail: contactValues!.email,
      userName: contactValues!.fullName,
      userPhone: profile.phone || undefined,
      paymentMethod: `****${normalizeCardNumber(paymentValues!.cardNumber).slice(-4)}`,
      eventId: event.id,
      eventTitle: t(event.titleKey),
      lineItems: totals.lineItems.map((item) => ({
        name: t(item.nameKey),
        quantity: item.quantity,
        amountAmd: item.amountAmd,
      })),
    }
    try {
      await sendOrderToTelegram(order)
      setOrderStatus('success')
      showSystemMessage({ content: t('messages.orderSuccess'), variant: 'success' })
    } catch (error) {
      console.error('Failed to send order to Telegram:', error)
      setOrderStatus('error')
      showSystemMessage({ content: t('messages.orderError'), variant: 'error' })
    }
  }

  if (!event) {
    return (
      <Empty
        className={styles.notFound}
        description={t('messages.eventNotFound')}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    )
  }

  const isSubmitting = orderStatus === 'submitting'

  return (
    <Flex gap={32} className={styles.page}>
      <Flex vertical gap={32} className={styles.main}>
        <CheckoutStepSection
          stepNumber={1}
          title={t('steps.tickets.title')}
          ariaLabel={t('steps.tickets.aria')}
          status={getCheckoutStepStatus(1, readiness)}
        >
          <CheckoutTicketSelector
            tiers={ticketTiers}
            selection={ticketSelection}
            onQuantityChange={handleQuantityChange}
          />
        </CheckoutStepSection>

        <CheckoutStepSection
          stepNumber={2}
          title={t('steps.contact.title')}
          ariaLabel={t('steps.contact.aria')}
          status={getCheckoutStepStatus(2, readiness)}
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
          status={getCheckoutStepStatus(3, readiness)}
        >
          <CheckoutPaymentForm onValidChange={setPaymentValues} />
        </CheckoutStepSection>
      </Flex>

      <Flex className={styles.sidebar}>
        <CheckoutOrderSummary
          event={event}
          totals={totals}
          isReady={readiness.isReady && orderStatus !== 'success'}
          isSubmitting={isSubmitting}
          onPlaceOrder={() => {
            void handlePlaceOrder()
          }}
        />
      </Flex>
    </Flex>
  )
}
