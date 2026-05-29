import { Spin } from 'antd'
import styles from './styles.module.css'

export function Loader() {
  return <Spin className={styles.spinner} size="large" />
}
