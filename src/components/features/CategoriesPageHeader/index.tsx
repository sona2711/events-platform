import { useTranslation } from 'react-i18next'
import styles from './styles.module.css'

export const CategoriesPageHeader = () => {
  const { t } = useTranslation('categories')

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{t('title')}</h1>
      <p className={styles.description}>{t('description')}</p>
    </header>
  )
}
