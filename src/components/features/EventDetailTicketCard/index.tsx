import { useState } from 'react'
import { CheckCircleFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Flex, Form, Input, Modal, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { CheckoutLocationState } from '@/pages/CheckoutPage/types'
import { formatPriceAmd } from '@/mock-api/eventDetailUtils'
import { showSystemMessage } from '@/providers/notifications/utils'
import {
  REFUND_POLICY_DESCRIPTION,
  REFUND_POLICY_PHONE_INVALID,
  REFUND_POLICY_PHONE_LABEL,
  REFUND_POLICY_PHONE_REQUIRED,
  REFUND_POLICY_SUBMIT_LABEL,
  REFUND_POLICY_SUCCESS_MESSAGE,
} from './consts'
import { formatTicketFeeLabel, isValidRefundPhone, toTelHref } from './utils'
import { MAX_TICKET_QUANTITY, MIN_TICKET_QUANTITY, type EventDetailTicketCardProps } from './types'
import buttonStyles from '@/components/_shared/TemplateButtons/styles.module.css'
import styles from './styles.module.css'

type RefundRequestValues = {
  phone: string
}

export const EventDetailTicketCard = ({
  eventId,
  ticket,
  contactPhone,
}: EventDetailTicketCardProps) => {
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(MIN_TICKET_QUANTITY)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isRefundOpen, setIsRefundOpen] = useState(false)
  const [refundForm] = Form.useForm<RefundRequestValues>()
  const isFree = ticket.priceAmd === 0

  const handleRefundClose = () => {
    setIsRefundOpen(false)
    refundForm.resetFields()
  }

  const handleRefundSubmit = () => {
    handleRefundClose()
    showSystemMessage({
      content: REFUND_POLICY_SUCCESS_MESSAGE,
      variant: 'success',
    })
  }

  return (
    <section className={styles.card} aria-label="Ticket booking">
      <Flex align="flex-start" justify="space-between" gap={16}>
        <Flex vertical gap={4}>
          <Typography.Text strong className={styles.ticketName}>
            {ticket.name}
          </Typography.Text>
          <Typography.Text className={styles.fee}>
            {formatTicketFeeLabel(ticket.serviceFeeAmd)}
          </Typography.Text>
        </Flex>
        <Typography.Text className={styles.price}>
          {formatPriceAmd(ticket.priceAmd)}
        </Typography.Text>
      </Flex>

      <Flex vertical gap={20} className={styles.content}>
        <div>
          <Typography.Text className={styles.quantityLabel}>Quantity</Typography.Text>
          <Flex align="center" justify="space-between" className={styles.quantityControl}>
            <Button
              type="text"
              icon={<MinusOutlined aria-hidden />}
              aria-label="Decrease ticket quantity"
              disabled={quantity <= MIN_TICKET_QUANTITY}
              onClick={() => setQuantity((current) => Math.max(MIN_TICKET_QUANTITY, current - 1))}
            />
            <Typography.Text className={styles.quantityValue} aria-live="polite">
              {quantity}
            </Typography.Text>
            <Button
              type="text"
              icon={<PlusOutlined aria-hidden />}
              aria-label="Increase ticket quantity"
              disabled={quantity >= MAX_TICKET_QUANTITY}
              onClick={() => setQuantity((current) => Math.min(MAX_TICKET_QUANTITY, current + 1))}
            />
          </Flex>
        </div>

        <Button
          type="primary"
          className={`${buttonStyles.primaryButton} ${buttonStyles.largeButton} ${buttonStyles.fullWidthButton} ${styles.bookButton}`}
          onClick={() =>
            navigate(`/checkout/${eventId}`, {
              state: { ticketQuantity: quantity } satisfies CheckoutLocationState,
            })
          }
        >
          {isFree ? 'Reserve Spot' : 'Book / Get Tickets'}
        </Button>

        <Flex align="center" justify="center" gap={8}>
          <CheckCircleFilled className={styles.secureIcon} aria-hidden />
          <Typography.Text className={styles.secureNote}>
            Secure checkout via EventPulse
          </Typography.Text>
        </Flex>

        <Divider className={styles.divider} />

        <Flex justify="space-between" gap={16}>
          <Typography.Link className={styles.footerLink} onClick={() => setIsRefundOpen(true)}>
            Refund Policy
          </Typography.Link>
          <Typography.Link className={styles.footerLink} onClick={() => setIsContactOpen(true)}>
            Contact
          </Typography.Link>
        </Flex>
      </Flex>

      <Modal
        title="Refund Policy"
        open={isRefundOpen}
        onCancel={handleRefundClose}
        footer={null}
        centered
        className={styles.infoModal}
      >
        <Flex vertical gap={20} className={styles.infoModalContent}>
          <Typography.Paragraph className={styles.infoDescription}>
            {REFUND_POLICY_DESCRIPTION}
          </Typography.Paragraph>
          <Form form={refundForm} layout="vertical" onFinish={handleRefundSubmit}>
            <Form.Item
              name="phone"
              label={REFUND_POLICY_PHONE_LABEL}
              rules={[
                { required: true, message: REFUND_POLICY_PHONE_REQUIRED },
                {
                  validator: (_, value: string | undefined) => {
                    if (!value || isValidRefundPhone(value)) {
                      return Promise.resolve()
                    }

                    return Promise.reject(new Error(REFUND_POLICY_PHONE_INVALID))
                  },
                },
              ]}
            >
              <Input placeholder="+374 00 000 000" inputMode="tel" autoComplete="tel" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className={`${buttonStyles.primaryButton} ${buttonStyles.fullWidthButton}`}
            >
              {REFUND_POLICY_SUBMIT_LABEL}
            </Button>
          </Form>
        </Flex>
      </Modal>

      <Modal
        title="Contact"
        open={isContactOpen}
        onCancel={() => setIsContactOpen(false)}
        footer={null}
        centered
        className={styles.infoModal}
      >
        <Flex vertical gap={8} className={styles.infoModalContent}>
          <Typography.Text type="secondary" className={styles.contactLabel}>
            Phone number
          </Typography.Text>
          <Typography.Link href={`tel:${toTelHref(contactPhone)}`} className={styles.contactPhone}>
            {contactPhone}
          </Typography.Link>
        </Flex>
      </Modal>
    </section>
  )
}
