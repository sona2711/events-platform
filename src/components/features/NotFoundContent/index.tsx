import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { NOT_FOUND_TICKER_TEXT } from './consts'
import buttonStyles from '@/components/_shared/TemplateButtons/styles.module.css'
import styles from './styles.module.css'

export const NotFoundContent = () => {
  const { t } = useTranslation('notFound')

  return (
    <section className={styles.hero}>
      <div className={styles.background} aria-hidden="true" />
      <span className={styles.bgText} aria-hidden="true">
        {t('eyebrow')}
      </span>
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.srOnly}>{t('eyebrow')} </span>
          {t('title')}
        </h1>

        <p className={styles.description}>{t('description')}</p>

        <div className={styles.actions}>
          <Link className={buttonStyles.largeLink} to="/" replace>
            <span>{t('homeLink')}</span>
            <svg
              className={styles.ctaIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4.5 15.5L15.5 4.5M15.5 4.5H8M15.5 4.5V12"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          <span className={styles.tickerText}>{NOT_FOUND_TICKER_TEXT}</span>
          <span aria-hidden="true" className={styles.tickerText}>
            {NOT_FOUND_TICKER_TEXT}
          </span>
        </div>
      </div>
    </section>
  )
}
