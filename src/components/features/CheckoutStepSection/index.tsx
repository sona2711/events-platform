import { CheckOutlined } from '@ant-design/icons'
import { Avatar, Flex, Typography } from 'antd'
import type { CheckoutStepSectionProps } from './types'
import styles from './styles.module.css'

export const CheckoutStepSection = ({
  stepNumber,
  title,
  ariaLabel,
  status,
  children,
}: CheckoutStepSectionProps) => (
  <section className={`${styles.section} ${styles[status]}`} aria-label={ariaLabel}>
    <Flex align="center" gap={12} className={styles.header}>
      <Avatar shape="square" className={styles.stepBadge} aria-hidden>
        {status === 'completed' ? <CheckOutlined /> : stepNumber}
      </Avatar>
      <Typography.Title level={4} className={styles.title}>
        {title}
      </Typography.Title>
    </Flex>
    <Flex vertical gap={16} className={styles.content}>
      {children}
    </Flex>
  </section>
)
