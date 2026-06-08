import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { MIN_TICKET_QUANTITY } from '@/pages/CheckoutPage/consts'
import { formatCheckoutAmount } from '@/pages/CheckoutPage/utils'
import type { CheckoutTicketSelectorProps } from './types'
import styles from './styles.module.css'

export const CheckoutTicketSelector = ({
  tiers,
  selection,
  onQuantityChange,
}: CheckoutTicketSelectorProps) => {
  const { t } = useTranslation('checkout')

  return (
    <Flex vertical gap={16} className={styles.list}>
      {tiers.map((tier) => {
        const quantity = selection[tier.id] ?? 0
        const ticketName = tier.name
        const isAtMin = quantity <= MIN_TICKET_QUANTITY
        const isAtMax = quantity >= tier.maxQuantity

        return (
          <Card key={tier.id} className={styles.card} variant="outlined">
            <Flex align="center" justify="space-between" gap={16} className={styles.cardInner}>
              <Flex vertical gap={6} className={styles.details}>
                <Typography.Title level={5} className={styles.name}>
                  {ticketName}
                </Typography.Title>
                <Typography.Text type="secondary" className={styles.description}>
                  {tier.description}
                </Typography.Text>
                <Typography.Text strong className={styles.price}>
                  {formatCheckoutAmount(tier.priceAmd, t('summary.free'))}
                </Typography.Text>
              </Flex>

              <Flex align="center" className={styles.actions}>
                {quantity > 0 ? (
                  <Flex align="center" className={styles.quantityControl}>
                    <Button
                      type="text"
                      icon={<MinusOutlined aria-hidden />}
                      aria-label={t('tickets.decreaseQuantity', { ticket: ticketName })}
                      disabled={isAtMin}
                      className={styles.quantityButton}
                      onClick={() => onQuantityChange(tier.id, quantity - 1)}
                    />
                    <Typography.Text strong className={styles.quantityValue} aria-live="polite">
                      {quantity}
                    </Typography.Text>
                    <Button
                      type="text"
                      icon={<PlusOutlined aria-hidden />}
                      aria-label={t('tickets.increaseQuantity', { ticket: ticketName })}
                      disabled={isAtMax}
                      className={styles.quantityButton}
                      onClick={() => onQuantityChange(tier.id, quantity + 1)}
                    />
                  </Flex>
                ) : (
                  <Button type="default" onClick={() => onQuantityChange(tier.id, 1)}>
                    {t('tickets.add')}
                  </Button>
                )}
              </Flex>
            </Flex>
          </Card>
        )
      })}
    </Flex>
  )
}
