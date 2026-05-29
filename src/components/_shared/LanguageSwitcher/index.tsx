import { Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/i18n'
import styles from './styles.module.css'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation('common')

  const options = SUPPORTED_LANGUAGES.map((code) => ({
    value: code,
    label: t(`languages.${code}`),
  }))

  const handleChange = (value: SupportedLanguage) => {
    void i18n.changeLanguage(value)
  }

  return (
    <Select
      className={styles.select}
      value={i18n.language as SupportedLanguage}
      options={options}
      onChange={handleChange}
      aria-label={t('languages.label')}
    />
  )
}
