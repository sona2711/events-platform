import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LineChartOutlined,
} from '@ant-design/icons'
import { STAT_CARD_META } from './consts'
import styles from './styles.module.css'
import type { RegistrationStatsCardsProps, StatCardVariant } from './types'

const ICON_BY_VARIANT: Record<StatCardVariant, React.ReactElement> = {
  total: <LineChartOutlined />,
  active: <CheckCircleOutlined />,
  cancelled: <CloseCircleOutlined />,
  pending: <ClockCircleOutlined />,
}

const ICON_CLASS_BY_VARIANT: Record<StatCardVariant, string> = {
  total: styles.iconTotal,
  active: styles.iconActive,
  cancelled: styles.iconCancelled,
  pending: styles.iconPending,
}

export const RegistrationStatsCards = ({
  total,
  active,
  cancelled,
  pending,
}: RegistrationStatsCardsProps) => {
  const statValues: Record<StatCardVariant, number> = { total, active, cancelled, pending }

  return (
    <div className={styles.grid} role="list" aria-label="Registration statistics">
      {STAT_CARD_META.map((card) => (
        <article key={card.id} className={styles.card} role="listitem">
          <span className={styles.label}>{card.label}</span>
          <div className={styles.valueRow}>
            <span className={styles.value}>{statValues[card.id].toLocaleString()}</span>
            <div
              className={`${styles.iconWrapper} ${ICON_CLASS_BY_VARIANT[card.id]}`}
              aria-hidden="true"
            >
              {ICON_BY_VARIANT[card.id]}
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
