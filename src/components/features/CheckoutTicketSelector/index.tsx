import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { MIN_TICKET_QUANTITY } from '@/pages/checkout/consts'
import { formatCurrency } from '@/pages/checkout/utils'
import type { CheckoutTicketSelectorProps } from './types'
import styles from './styles.module.css'

export const CheckoutTicketSelector = ({
  tiers,
  selection,
  onQuantityChange,
}: CheckoutTicketSelectorProps) => {
  const { t } = useTranslation('checkout')

  return (
    <ul className={styles.list}>
      {tiers.map((tier) => {
        const quantity = selection[tier.id] ?? 0
        const ticketName = t(tier.nameKey)
        const isAtMin = quantity <= MIN_TICKET_QUANTITY
        const isAtMax = quantity >= tier.maxQuantity

        return (
          <li key={tier.id} className={styles.card}>
            <div className={styles.details}>
              <h3 className={styles.name}>{ticketName}</h3>
              <p className={styles.description}>{t(tier.descriptionKey)}</p>
              <p className={styles.price}>{formatCurrency(tier.priceAmd)}</p>
            </div>

            <div className={styles.actions}>
              {quantity > 0 ? (
                <div className={styles.quantityControl}>
                  <button
                    type="button"
                    className={styles.quantityButton}
                    aria-label={t('tickets.decreaseQuantity', { ticket: ticketName })}
                    disabled={isAtMin}
                    onClick={() => onQuantityChange(tier.id, quantity - 1)}
                  >
                    −
                  </button>
                  <span className={styles.quantityValue} aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className={styles.quantityButton}
                    aria-label={t('tickets.increaseQuantity', { ticket: ticketName })}
                    disabled={isAtMax}
                    onClick={() => onQuantityChange(tier.id, quantity + 1)}
                  >
                    +
                  </button>
                </div>
              ) : (
                <Button type="default" onClick={() => onQuantityChange(tier.id, 1)}>
                  {t('tickets.add')}
                </Button>
              )}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
