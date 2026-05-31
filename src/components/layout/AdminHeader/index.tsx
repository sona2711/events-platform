import { BellOutlined, QuestionCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { Badge, Input } from 'antd'
import type { AdminHeaderProps } from './types'
import styles from './styles.module.css'

export const AdminHeader = ({ title, notificationCount = 0 }: AdminHeaderProps) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.actions}>
        <Input
          className={styles.searchInput}
          placeholder="Global search..."
          prefix={<SearchOutlined />}
        />

        <Badge count={notificationCount} offset={[-6, 8]}>
          <button type="button" className={styles.iconButton} aria-label="Notifications">
            <BellOutlined />
          </button>
        </Badge>

        <button type="button" className={styles.iconButton} aria-label="Help">
          <QuestionCircleOutlined />
        </button>
      </div>
    </header>
  )
}
