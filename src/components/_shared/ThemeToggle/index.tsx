import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/providers/theme'
import styles from './styles.module.css'

export const ThemeToggle = () => {
  const { t } = useTranslation('common')
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      type="text"
      className={styles.toggle}
      icon={isDark ? <SunOutlined aria-hidden /> : <MoonOutlined aria-hidden />}
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
      aria-pressed={isDark}
    />
  )
}
