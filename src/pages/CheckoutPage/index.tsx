import { useEffect, useMemo, useState } from 'react'
import { Empty, Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'
import { CheckoutContactForm } from '@/components/features/CheckoutContactForm'
import { CheckoutOrderSummary } from '@/components/features/CheckoutOrderSummary'
import { CheckoutPaymentForm } from '@/components/features/CheckoutPaymentForm'
import { CheckoutStepSection } from '@/components/features/CheckoutStepSection'
import { CheckoutTicketSelector } from '@/components/features/CheckoutTicketSelector'
import { showSystemMessage } from '@/providers/notifications/utils'
import { useAppSelector } from '@/store/hooks'
import { selectProfile } from '@/store/profile'
import { createInitialTicketSelection, getCheckoutEventById, EMPTY_TICKET_TIERS } from './consts'
import type {
  CheckoutContactValues,
  CheckoutLocationState,
  CheckoutPaymentValues,
  OrderStatus,
  TicketSelection,
} from './types'
import {
  buildOrderTotals,
  getCheckoutEventTitle,
  getCheckoutReadiness,
  getCheckoutStepStatus,
  isFreeCheckout,
  getOrderLineItemName,
  normalizeCardNumber,
} from './utils'
import { sendOrderToTelegram } from '@/__mocks__/telegramBot'
import type { Order } from '@/types'
import styles from './styles.module.css'

export const CheckoutPage = () => {
  const { t } = useTranslation('checkout')
  const { eventId = '' } = useParams<{ eventId: string }>()
  const location = useLocation()
  const checkoutNavigationState = location.state as CheckoutLocationState | null
  const profile = useAppSelector(selectProfile)
  const event = getCheckoutEventById(eventId)
  const ticketTiers = event?.ticketTiers ?? EMPTY_TICKET_TIERS
  const defaultContactFullName = t('defaults.contact.fullName')
  const defaultContactEmail = t('defaults.contact.email')
  const contactInitialValues = useMemo<CheckoutContactValues>(
    () => ({
      fullName: profile.fullName || defaultContactFullName,
      email: profile.email || defaultContactEmail,
    }),
    [defaultContactEmail, defaultContactFullName, profile.email, profile.fullName],
  )

  const [ticketSelection, setTicketSelection] = useState<TicketSelection>(() =>
    event
      ? createInitialTicketSelection(event.ticketTiers, checkoutNavigationState?.ticketQuantity)
      : {},
  )
  const [contactValues, setContactValues] = useState<CheckoutContactValues | null>(
    contactInitialValues,
  )
  const [paymentValues, setPaymentValues] = useState<CheckoutPaymentValues | null>(null)
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('idle')

  useEffect(() => {
    const checkoutEvent = getCheckoutEventById(eventId)
    if (checkoutEvent) {
      const navigationState = location.state as CheckoutLocationState | null
      setTicketSelection(
        createInitialTicketSelection(checkoutEvent.ticketTiers, navigationState?.ticketQuantity),
      )
      setContactValues(contactInitialValues)
      setPaymentValues(null)
      setOrderStatus('idle')
    }
  }, [contactInitialValues, eventId, location.state])

  const totals = useMemo(
    () => buildOrderTotals(ticketSelection, ticketTiers),
    [ticketSelection, ticketTiers],
  )

  const isFree = isFreeCheckout(totals)

  const readiness = useMemo(
    () => getCheckoutReadiness(ticketSelection, contactValues, paymentValues, isFree),
    [contactValues, isFree, paymentValues, ticketSelection],
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
      paymentMethod: isFree
        ? 'Free'
        : `****${normalizeCardNumber(paymentValues!.cardNumber).slice(-4)}`,
      eventId: event.id,
      eventTitle: getCheckoutEventTitle(event),
      lineItems: totals.lineItems.map((item) => ({
        name: getOrderLineItemName(item),
        quantity: item.quantity,
        amountAmd: item.amountAmd,
      })),
    }
    void sendOrderToTelegram(order).catch((notificationError: unknown) => {
      console.warn('Failed to send order to Telegram:', notificationError)
    })

    try {
      setOrderStatus('success')
      showSystemMessage({
        content: isFree ? t('messages.reservationSuccess') : t('messages.orderSuccess'),
        variant: 'success',
      })
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
          status={getCheckoutStepStatus(1, readiness, isFree)}
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
          status={getCheckoutStepStatus(2, readiness, isFree)}
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
          status={getCheckoutStepStatus(3, readiness, isFree)}
        >
          {isFree ? (
            <Typography.Text type="secondary">{t('payment.freeNotice')}</Typography.Text>
          ) : (
            <CheckoutPaymentForm onValidChange={setPaymentValues} />
          )}
        </CheckoutStepSection>
      </Flex>

      <Flex className={styles.sidebar}>
        <CheckoutOrderSummary
          event={event}
          totals={totals}
          isFreeCheckout={isFree}
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
