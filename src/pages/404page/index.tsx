import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './styles.module.css'

export function NotFoundPage() {
  const { t } = useTranslation('notFound')

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <p className={styles.eyebrow}>{t('eyebrow')}</p>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.description}>{t('description')}</p>
        <Link className={styles.homeLink} to="/" replace>
          {t('homeLink')}
        </Link>
      </div>
    </section>
  )
}
