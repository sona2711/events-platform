import { useMemo } from 'react'
import { Typography } from 'antd'
import { getStrength } from './utils'
import styles from './styles.module.css'

interface PasswordStrengthBarProps {
  password: string
}

export function PasswordStrengthBar({ password }: PasswordStrengthBarProps) {
  const strength = useMemo(() => getStrength(password), [password])

  if (!password) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.bars}>
        {[1, 2, 3, 4].map((segment) => (
          <div
            key={segment}
            className={`${styles.bar} ${strength.score >= segment ? styles[strength.level] : styles.empty}`}
          />
        ))}
      </div>
      <Typography.Text className={styles.label}>{strength.label}</Typography.Text>
    </div>
  )
}
