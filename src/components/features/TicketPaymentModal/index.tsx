import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CreditCardOutlined,
  PayCircleOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Modal, Radio, Steps } from 'antd'
import { showNotification } from '@/providers/notifications/utils'
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
import { formatAmdAmount, getPaymentAmount } from './utils'

export const TicketPaymentModal = ({ event, open, onClose }: TicketPaymentModalProps) => {
  const [contactForm] = Form.useForm<ContactFormValues>()
  const [paymentForm] = Form.useForm<PaymentFormValues>()
  const [currentStep, setCurrentStep] = useState(0)
  const [ticketQuantity, setTicketQuantity] = useState(DEFAULT_TICKET_QUANTITY)
  const [contactDetails, setContactDetails] = useState<ContactFormValues | null>(null)
  const [receiptDetails, setReceiptDetails] = useState<ReceiptDetails | null>(null)

  useEffect(() => {
    if (!open) return

    setCurrentStep(0)
    setTicketQuantity(DEFAULT_TICKET_QUANTITY)
    setContactDetails(null)
    setReceiptDetails(null)
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
    if (!event) return

    const contactValues = contactDetails ?? (await contactForm.validateFields())
    const paymentValues = await paymentForm.validateFields()

    setReceiptDetails({
      ...contactValues,
      ...paymentValues,
      amount,
      eventTitle: event.title,
      formattedAmount,
    })
    setCurrentStep(2)
  }

  const handleDone = () => {
    showNotification({
      title: 'Payment successful',
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
      destroyOnClose
      title={null}
    >
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
        items={[{ title: 'Details' }, { title: 'Payment' }, { title: 'Receipt' }]}
      />

      {currentStep === 0 ? (
        <Form
          form={contactForm}
          layout="vertical"
          requiredMark={false}
          className={styles.form}
          name="ticket-contact"
        >
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

          <Form.Item
            label="Payment Method"
            name="paymentMethod"
            rules={[{ required: true, message: 'Please choose a payment method' }]}
          >
            <Radio.Group className={styles.paymentMethods}>
              <Radio.Button value="card" className={styles.paymentMethod}>
                <CreditCardOutlined className={styles.paymentIcon} />
                {PAYMENT_METHOD_LABELS.card}
              </Radio.Button>
              <Radio.Button value="paypal" className={styles.paymentMethod}>
                <PayCircleOutlined className={styles.paymentIcon} />
                {PAYMENT_METHOD_LABELS.paypal}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>

          {isCardPayment ? (
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

          <p className={styles.terms}>
            By providing your payment information, you allow Events Platform to charge you for this
            ticket booking.
          </p>

          <Button type="primary" className={styles.primaryButton} onClick={handlePaymentSubmit}>
            Pay {formattedAmount}
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
    </Modal>
  )
}
