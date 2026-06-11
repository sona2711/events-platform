import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import type { EventDetailBackButtonProps } from './types'
import styles from './styles.module.css'

export const EventDetailBackButton = ({ onBack }: EventDetailBackButtonProps) => (
  <Button type="link" className={styles.backButton} onClick={onBack} icon={<ArrowLeftOutlined />}>
    Back
  </Button>
)
