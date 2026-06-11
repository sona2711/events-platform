import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import wineImg from '@/assets/images/wine.webp'
import {
  COUNTDOWN_INTERVAL_MS,
  COUNTDOWN_UNITS,
  WINE_FEST_CTA_PATH,
  WINE_FEST_TARGET,
} from './consts'
import styles from './styles.module.css'

const { Title, Text, Paragraph } = Typography

const getTimeLeft = () => {
  const diff = WINE_FEST_TARGET.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, mins: 0 }
  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff % 864e5) / 36e5),
    mins: Math.floor((diff % 36e5) / 6e4),
  }
}

export const WineFestHero = () => {
  const { t } = useTranslation('home')
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), COUNTDOWN_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')
  const values = [timeLeft.days, timeLeft.hours, timeLeft.mins]

  return (
    <section className={styles.section} aria-labelledby="wine-fest-title">
      <div className={styles.layout}>
        <div className={styles.content}>
          <Text className={styles.badge}>{t('wineFest.badge')}</Text>

          <Title className={styles.title} id="wine-fest-title" level={2}>
            {t('wineFest.title')}
          </Title>

          <Paragraph className={styles.description}>{t('wineFest.description')}</Paragraph>

          <div className={styles.countdown} aria-label={t('wineFest.countdownAria')}>
            {COUNTDOWN_UNITS.map((unit, index) => (
              <div key={unit} className={styles.unit}>
                <span className={styles.number}>{pad(values[index])}</span>
                <span className={styles.unitLabel}>{t(`wineFest.${unit}`)}</span>
              </div>
            ))}
          </div>

          <Link to={WINE_FEST_CTA_PATH} className={styles.btn}>
            {t('wineFest.cta')}
          </Link>
        </div>

        <div className={styles.imageFrame}>
          <img
            src={wineImg}
            alt={t('wineFest.imageAlt')}
            className={styles.wineImg}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}
