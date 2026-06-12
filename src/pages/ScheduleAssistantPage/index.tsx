import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { ScheduleAssistantChat } from '@/components/features/ScheduleAssistantChat'
import styles from './styles.module.css'

export const ScheduleAssistantPage = () => {
  const { t } = useTranslation('scheduleAssistant')

  return (
    <section className={styles.page}>
      <header className={styles.header}>
        <Typography.Title level={2}>{t('pageTitle')}</Typography.Title>
        <Typography.Paragraph type="secondary">{t('pageDescription')}</Typography.Paragraph>
      </header>

      <ScheduleAssistantChat />
    </section>
  )
}
