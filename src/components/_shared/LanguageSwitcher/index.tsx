import { useTranslation } from 'react-i18next'
import armeniaFlag from 'circle-flags/flags/am.svg'
import ukFlag from 'circle-flags/flags/uk.svg'
import russiaFlag from 'circle-flags/flags/ru.svg'
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/i18n'
import styles from './styles.module.css'

const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  en: ukFlag,
  hy: armeniaFlag,
  ru: russiaFlag,
}

const resolveCurrentLanguage = (language: string): SupportedLanguage => {
  const normalized = language.split('-')[0] as SupportedLanguage
  return SUPPORTED_LANGUAGES.includes(normalized) ? normalized : DEFAULT_LANGUAGE
}

const getNextLanguage = (current: SupportedLanguage): SupportedLanguage => {
  const currentIndex = SUPPORTED_LANGUAGES.indexOf(current)
  const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length
  return SUPPORTED_LANGUAGES[nextIndex]
}

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation('common')
  const currentLanguage = resolveCurrentLanguage(i18n.language)
  const nextLanguage = getNextLanguage(currentLanguage)

  const handleClick = () => {
    void i18n.changeLanguage(nextLanguage)
  }

  const currentLanguageLabel = t(`languages.${currentLanguage}`)
  const nextLanguageLabel = t(`languages.${nextLanguage}`)

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      aria-label={`${t('languages.label')}: ${currentLanguageLabel}. ${nextLanguageLabel}`}
      title={`${currentLanguageLabel} to ${nextLanguageLabel}`}
    >
      <img
        className={styles.flag}
        src={LANGUAGE_FLAGS[currentLanguage]}
        alt=""
        aria-hidden="true"
      />
    </button>
  )
}
