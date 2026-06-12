import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import buttonStyles from '@/components/_shared/TemplateButtons/styles.module.css'
import { getDaysUntilEvent, hasReminder } from './utils'
import type { UpcomingEventAlertProps } from './types'
import styles from './styles.module.css'

export const UpcomingEventAlert = ({ booking, onSetReminder }: UpcomingEventAlertProps) => {
  const { t } = useTranslation('profile')
  const [reminderSet, setReminderSet] = useState(false)

  useEffect(() => {
    if (booking) {
      setReminderSet(hasReminder(booking.id))
    } else {
      setReminderSet(false)
    }
  }, [booking])

  const getDescription = () => {
    if (!booking) {
      return t('alert.description')
    }

    const days = getDaysUntilEvent(booking.startsAt)

    if (days === 0) {
      return t('alert.startsToday', { title: booking.title })
    }

    if (days === 1) {
      return t('alert.startsTomorrow', { title: booking.title })
    }

    return t('alert.dynamicDescription', { title: booking.title, count: days })
  }

  const handleSetReminder = () => {
    if (!booking || reminderSet) {
      return
    }

    onSetReminder?.(booking.id)
    setReminderSet(true)
  }

  return (
    <section className={styles.card} aria-labelledby="upcoming-event-alert-title">
      <h2 className={styles.title} id="upcoming-event-alert-title">
        {t('alert.title')}
      </h2>
      <p className={styles.description}>{getDescription()}</p>
      <Button
        type={reminderSet ? 'default' : 'primary'}
        className={
          reminderSet
            ? `${buttonStyles.secondaryButton} ${buttonStyles.cardPrimaryButton} ${buttonStyles.fullWidthButton}`
            : `${buttonStyles.primaryButton} ${buttonStyles.cardPrimaryButton} ${buttonStyles.fullWidthButton}`
        }
        block
        disabled={!booking || reminderSet}
        onClick={handleSetReminder}
      >
        {reminderSet ? t('alert.actionReminderSet') : t('alert.action')}
      </Button>
    </section>
  )
}
