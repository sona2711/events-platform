import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  PayCircleOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Modal, Radio, Steps } from 'antd'
import { sendOrderToTelegram } from '@/__mocks__/telegramBot'
import { showNotification } from '@/providers/notifications/utils'
import { useAppSelector } from '@/store/hooks'
import { selectProfile } from '@/store/profile'
import {
  CARD_NUMBER_PATTERN,
  CVC_PATTERN,
  DEFAULT_TICKET_QUANTITY,
  EXPIRATION_PATTERN,
  MAX_TICKET_QUANTITY,
  PAYMENT_METHOD_LABELS,
} from './consts'
import styles from './styles.module.css'
import type {
  ContactFormValues,
  PaymentFormValues,
  ReceiptDetails,
  TicketPaymentModalProps,
} from './types'
import { formatAmdAmount, buildModalOrder, getPaymentAmount } from './utils'

export const TicketPaymentModal = ({ event, open, onClose }: TicketPaymentModalProps) => {
  const profile = useAppSelector(selectProfile)
  const [contactForm] = Form.useForm<ContactFormValues>()
  const [paymentForm] = Form.useForm<PaymentFormValues>()
  const [currentStep, setCurrentStep] = useState(0)
  const [ticketQuantity, setTicketQuantity] = useState(DEFAULT_TICKET_QUANTITY)
  const [contactDetails, setContactDetails] = useState<ContactFormValues | null>(null)
  const [receiptDetails, setReceiptDetails] = useState<ReceiptDetails | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return

    setCurrentStep(0)
    setTicketQuantity(DEFAULT_TICKET_QUANTITY)
    setContactDetails(null)
    setReceiptDetails(null)
    setIsSubmitting(false)
    contactForm.resetFields()
    paymentForm.resetFields()
    paymentForm.setFieldsValue({
      paymentMethod: 'card',
      ticketQuantity: DEFAULT_TICKET_QUANTITY,
    })
  }, [contactForm, open, paymentForm])

  const amount = useMemo(() => {
    if (!event) return 0

    return getPaymentAmount(event.price, ticketQuantity)
  }, [event, ticketQuantity])

  const formattedAmount = formatAmdAmount(amount)
  const isFreeTicket = amount === 0
  const paymentMethod = Form.useWatch('paymentMethod', paymentForm) ?? 'card'
  const isCardPayment = paymentMethod === 'card'

  const handleBack = () => {
    if (currentStep === 0) {
      onClose()
      return
    }

    setCurrentStep((step) => step - 1)
  }

  const handleContactSubmit = async () => {
    const values = await contactForm.validateFields()

    setContactDetails(values)
    setCurrentStep(1)
  }

  const handlePaymentSubmit = async () => {
    if (!event || isSubmitting) return

    setIsSubmitting(true)

    try {
      const contactValues = contactDetails ?? (await contactForm.validateFields())
      const paymentValues = (
        isFreeTicket
          ? await paymentForm.validateFields(['ticketQuantity'])
          : await paymentForm.validateFields()
      ) as PaymentFormValues

      const order = buildModalOrder({
        event,
        contactValues,
        paymentValues,
        amount,
        profile,
      })

      await sendOrderToTelegram(order)

      setReceiptDetails({
        ...contactValues,
        ...paymentValues,
        amount,
        eventTitle: event.title,
        formattedAmount,
      })
      setCurrentStep(2)
    } catch (error) {
      console.error('Failed to send order to Telegram:', error)
      showNotification({
        title: isFreeTicket ? 'Reservation failed' : 'Payment failed',
        message: 'Could not submit your order. Please try again.',
        variant: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDone = () => {
    showNotification({
      title: receiptDetails?.amount === 0 ? 'Ticket reserved' : 'Payment successful',
      message: `Your ticket for ${receiptDetails?.eventTitle} has been booked. Total paid: ${receiptDetails?.formattedAmount}.`,
      variant: 'success',
    })
    onClose()
  }

  const handleQuantityChange = (value: number | null) => {
    setTicketQuantity(value ?? DEFAULT_TICKET_QUANTITY)
  }

  if (!event) return null

  return (
    <Modal
      className={styles.modal}
      open={open}
      footer={null}
      onCancel={onClose}
      width={560}
      centered
      destroyOnClose
      title={null}
      styles={{ body: { padding: 0 } }}
    >
      <div
        className={`${styles.modalShell} ${currentStep === 1 ? styles.paymentStep : ''} ${
          currentStep === 2 ? styles.receiptStep : ''
        }`}
      >
        <div className={styles.modalTop}>
          <button className={styles.backButton} type="button" onClick={handleBack}>
            <ArrowLeftOutlined />
            Back
          </button>

          <div className={styles.header}>
            <p className={styles.eyebrow}>Ticket Checkout</p>
            <h2 className={styles.title}>{event.title}</h2>
            <p className={styles.subtitle}>Complete your booking in a few quick steps.</p>
          </div>

          <Steps
            current={currentStep}
            className={styles.steps}
            size="small"
            items={[{ title: 'Details' }, { title: 'Payment' }, { title: 'Receipt' }]}
          />
        </div>

        <div className={styles.modalContent}>
          {currentStep === 0 ? (
            <Form
              form={contactForm}
              layout="vertical"
              requiredMark={false}
              className={styles.form}
              name="ticket-contact"
            >
              <div className={styles.formGrid}>
                <Form.Item
                  label="Name"
                  name="firstName"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input placeholder="John" />
                </Form.Item>

                <Form.Item
                  label="Surname"
                  name="lastName"
                  rules={[{ required: true, message: 'Please enter your surname' }]}
                >
                  <Input placeholder="Doe" />
                </Form.Item>
              </div>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="johndoe@example.com" />
              </Form.Item>

              <Button type="primary" className={styles.primaryButton} onClick={handleContactSubmit}>
                Continue to Payment
              </Button>
            </Form>
          ) : null}

          {currentStep === 1 ? (
            <Form
              form={paymentForm}
              layout="vertical"
              requiredMark={false}
              className={styles.form}
              name="ticket-payment"
            >
              <Form.Item label="Contact Information">
                <Input
                  value={
                    contactDetails
                      ? `${contactDetails.firstName} ${contactDetails.lastName} · ${contactDetails.email}`
                      : ''
                  }
                  disabled
                />
              </Form.Item>

              {isFreeTicket ? (
                <p className={styles.freeNotice}>
                  This event is free. Confirm your ticket quantity to reserve your spot.
                </p>
              ) : (
                <Form.Item
                  label="Payment Method"
                  name="paymentMethod"
                  rules={[{ required: true, message: 'Please choose a payment method' }]}
                >
                  <Radio.Group className={styles.paymentMethods}>
                    <Radio.Button value="card" className={styles.paymentMethod}>
                      <CreditCardOutlined className={styles.paymentIcon} />
                      <span className={styles.paymentLabel}>{PAYMENT_METHOD_LABELS.card}</span>
                    </Radio.Button>
                    <Radio.Button value="paypal" className={styles.paymentMethod}>
                      <PayCircleOutlined className={styles.paymentIcon} />
                      <span className={styles.paymentLabel}>{PAYMENT_METHOD_LABELS.paypal}</span>
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              )}

              {!isFreeTicket && isCardPayment ? (
                <>
                  <Form.Item
                    label="Card Number"
                    name="cardNumber"
                    normalize={(value?: string) => value?.replace(/\s/g, '') ?? ''}
                    rules={[
                      { required: true, message: 'Please enter your card number' },
                      {
                        pattern: CARD_NUMBER_PATTERN,
                        message: 'Card number should contain 12 to 19 digits',
                      },
                    ]}
                  >
                    <Input placeholder="1234 1234 1234 1234" />
                  </Form.Item>

                  <div className={styles.formGrid}>
                    <Form.Item
                      label="Expiration"
                      name="expiration"
                      rules={[
                        { required: true, message: 'Please enter expiration date' },
                        { pattern: EXPIRATION_PATTERN, message: 'Use MM/YY format' },
                      ]}
                    >
                      <Input placeholder="MM/YY" />
                    </Form.Item>

                    <Form.Item
                      label="CVC"
                      name="cvc"
                      rules={[
                        { required: true, message: 'Please enter CVC' },
                        { pattern: CVC_PATTERN, message: 'CVC should contain 3 or 4 digits' },
                      ]}
                    >
                      <Input placeholder="CVC" />
                    </Form.Item>
                  </div>
                </>
              ) : null}

              <div className={styles.formGrid}>
                <Form.Item
                  label="Ticket Quantity"
                  name="ticketQuantity"
                  rules={[{ required: true, message: 'Please choose ticket quantity' }]}
                >
                  <InputNumber
                    min={1}
                    max={MAX_TICKET_QUANTITY}
                    className={styles.fullWidthInput}
                    onChange={handleQuantityChange}
                  />
                </Form.Item>

                <Form.Item label="Amount">
                  <Input value={formattedAmount} disabled />
                </Form.Item>
              </div>

              {!isFreeTicket ? (
                <p className={styles.terms}>
                  By providing your payment information, you allow Events Platform to charge you for
                  this ticket booking.
                </p>
              ) : null}

              <Button
                type="primary"
                className={styles.primaryButton}
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={() => {
                  void handlePaymentSubmit()
                }}
              >
                {isFreeTicket ? 'Reserve Ticket' : `Pay ${formattedAmount}`}
              </Button>
            </Form>
          ) : null}

          {currentStep === 2 && receiptDetails ? (
            <section className={styles.receipt} aria-labelledby="payment-success-title">
              <CheckCircleOutlined className={styles.successIcon} />
              <p className={styles.receiptKicker}>Successful Payment</p>
              <h3 className={styles.receiptTitle} id="payment-success-title">
                Your ticket is booked
              </h3>

              <div className={styles.receiptPaper}>
                <div className={styles.receiptRow}>
                  <span>Event</span>
                  <strong>{receiptDetails.eventTitle}</strong>
                </div>
                <div className={styles.receiptRow}>
                  <span>Customer</span>
                  <strong>
                    {receiptDetails.firstName} {receiptDetails.lastName}
                  </strong>
                </div>
                <div className={styles.receiptRow}>
                  <span>Email</span>
                  <strong>{receiptDetails.email}</strong>
                </div>
                <div className={styles.receiptRow}>
                  <span>Tickets</span>
                  <strong>{receiptDetails.ticketQuantity}</strong>
                </div>
                <div className={styles.receiptTotal}>
                  <span>Total Paid</span>
                  <strong>{receiptDetails.formattedAmount}</strong>
                </div>
              </div>

              <Button type="primary" className={styles.primaryButton} onClick={handleDone}>
                Done
              </Button>
            </section>
          ) : null}
        </div>
      </div>
    </Modal>
  )
}
