import { type ReactNode } from 'react'
import { Card } from 'antd'
import styles from './styles.module.css'

interface AuthCardProps {
  children: ReactNode
}

export function AuthCard({ children }: AuthCardProps) {
  return <Card className={styles.card}>{children}</Card>
}
