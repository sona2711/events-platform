import { EnvironmentOutlined } from '@ant-design/icons'
import { Button, Image } from 'antd'
import { useTranslation } from 'react-i18next'
import { formatCurrency } from '@/pages/checkout/utils'
import type { CheckoutOrderSummaryProps } from './types'
import styles from './styles.module.css'

export const CheckoutOrderSummary = ({
  event,
  totals,
  isReady,
  isSubmitting,
  onPlaceOrder,
}: CheckoutOrderSummaryProps) => {
  const { t } = useTranslation('checkout')

  return (
    <aside className={styles.summary} aria-label={t('summary.aria')}>
      <div className={styles.hero}>
        <Image
          className={styles.heroImage}
          src={event.imageUrl}
          alt={t(event.titleKey)}
          preview={false}
        />
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroContent}>
          <h2 className={styles.eventTitle}>{t(event.titleKey)}</h2>
          <p className={styles.location}>
            <EnvironmentOutlined aria-hidden />
            {t(event.locationKey)}
          </p>
        </div>
      </div>

      <div className={styles.body}>
        <ul className={styles.lineItems}>
          {totals.lineItems.map((item) => (
            <li key={item.tierId} className={styles.lineItem}>
              <span>
                {t('summary.lineItem', {
                  name: t(item.nameKey),
                  count: item.quantity,
                })}
              </span>
              <span className={styles.lineItemAmount}>{formatCurrency(item.amountAmd)}</span>
            </li>
          ))}
        </ul>

        <div className={styles.feeRow}>
          <span>{t('summary.serviceFee')}</span>
          <span className={styles.feeAmount}>{formatCurrency(totals.serviceFeeAmd)}</span>
        </div>

        <div className={styles.feeRow}>
          <span>{t('summary.processingFee')}</span>
          <span className={styles.feeAmount}>{formatCurrency(totals.processingFeeAmd)}</span>
        </div>

        <hr className={styles.divider} />

        <p className={styles.totalRow}>
          <span>{t('summary.total')}</span>
          <span className={styles.totalAmount}>{formatCurrency(totals.totalAmd)}</span>
        </p>
      </div>

      <div className={styles.footer}>
        <Button
          type="primary"
          block
          disabled={!isReady || isSubmitting}
          loading={isSubmitting}
          onClick={onPlaceOrder}
        >
          {t('summary.placeOrder')}
        </Button>
      </div>
    </aside>
  )
}
