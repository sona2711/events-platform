import { InfoCircleOutlined } from '@ant-design/icons'
import { Flex, Typography } from 'antd'
import { EventInfoIconMap } from './icons'
import type { EventDetailInfoCardProps } from './types'
import styles from './styles.module.css'

export const EventDetailInfoCard = ({ items }: EventDetailInfoCardProps) => (
  <section className={styles.card} aria-label="Event info">
    <Flex align="center" gap={8} className={styles.headingRow}>
      <InfoCircleOutlined className={styles.headingIcon} aria-hidden />
      <Typography.Text className={styles.heading}>Event info</Typography.Text>
    </Flex>

    <Flex vertical gap={16} className={styles.list}>
      {items.map((item) => {
        const Icon = EventInfoIconMap[item.icon]

        return (
          <Flex key={item.id} align="center" gap={12} className={styles.item}>
            <span className={styles.itemIcon}>
              <Icon />
            </span>
            <Typography.Text className={styles.itemLabel}>{item.label}</Typography.Text>
          </Flex>
        )
      })}
    </Flex>
  </section>
)
