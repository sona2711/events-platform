import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LineChartOutlined,
} from '@ant-design/icons'
import { STAT_CARDS } from './consts'
import styles from './styles.module.css'
import type { StatCardVariant } from './types'

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

export const RegistrationStatsCards = () => {
  return (
    <div className={styles.grid} role="list" aria-label="Registration statistics">
      {STAT_CARDS.map((card) => (
        <article key={card.id} className={styles.card} role="listitem">
          <span className={styles.label}>{card.label}</span>
          <div className={styles.valueRow}>
            <span className={styles.value}>{card.value}</span>
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
