import { EnvironmentOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Flex, Image, List, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { formatCheckoutAmount } from '@/pages/CheckoutPage/utils'
import type { CheckoutOrderSummaryProps } from './types'
import styles from './styles.module.css'

export const CheckoutOrderSummary = ({
  event,
  totals,
  isFreeCheckout = false,
  isReady,
  isSubmitting,
  onPlaceOrder,
}: CheckoutOrderSummaryProps) => {
  const { t } = useTranslation('checkout')
  const freeLabel = t('summary.free')
  const formatAmount = (amountAmd: number) => formatCheckoutAmount(amountAmd, freeLabel)

  return (
    <Card
      className={styles.summary}
      variant="outlined"
      aria-label={t('summary.aria')}
      cover={
        <div className={styles.hero}>
          <Image
            className={styles.heroImage}
            src={event.imageUrl}
            alt={event.title}
            preview={false}
          />
          <div className={styles.heroOverlay} aria-hidden />
          <Flex vertical gap={6} className={styles.heroContent}>
            <Typography.Title level={4} className={styles.eventTitle}>
              {event.title}
            </Typography.Title>
            <Typography.Text className={styles.location}>
              <EnvironmentOutlined aria-hidden />
              {event.location}
            </Typography.Text>
          </Flex>
        </div>
      }
    >
      <List
        split={false}
        className={styles.lineItems}
        dataSource={totals.lineItems}
        renderItem={(item) => (
          <List.Item className={styles.lineItem}>
            <Typography.Text type="secondary">
              {t('summary.lineItem', {
                name: item.name,
                count: item.quantity,
              })}
            </Typography.Text>
            <Typography.Text strong className={styles.lineItemAmount}>
              {formatAmount(item.amountAmd)}
            </Typography.Text>
          </List.Item>
        )}
      />

      {!isFreeCheckout && (
        <>
          <Flex justify="space-between" className={styles.feeRow}>
            <Typography.Text type="secondary">{t('summary.serviceFee')}</Typography.Text>
            <Typography.Text strong className={styles.feeAmount}>
              {formatAmount(totals.serviceFeeAmd)}
            </Typography.Text>
          </Flex>

          <Flex justify="space-between" className={styles.feeRow}>
            <Typography.Text type="secondary">{t('summary.processingFee')}</Typography.Text>
            <Typography.Text strong className={styles.feeAmount}>
              {formatAmount(totals.processingFeeAmd)}
            </Typography.Text>
          </Flex>
        </>
      )}

      <Divider className={styles.divider} />

      <Flex justify="space-between" align="center" className={styles.totalRow}>
        <Typography.Text strong>{t('summary.total')}</Typography.Text>
        <Typography.Text strong className={styles.totalAmount}>
          {formatAmount(totals.totalAmd)}
        </Typography.Text>
      </Flex>

      <Button
        type="primary"
        block
        disabled={!isReady || isSubmitting}
        loading={isSubmitting}
        className={styles.placeOrderButton}
        onClick={onPlaceOrder}
      >
        {isFreeCheckout ? t('summary.reserveTicket') : t('summary.placeOrder')}
      </Button>
    </Card>
  )
}
