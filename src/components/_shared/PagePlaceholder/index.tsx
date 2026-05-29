import { useTranslation } from 'react-i18next'
import type { PagePlaceholderProps } from './types'
import styles from './styles.module.css'

function isTranslationProps(
  props: PagePlaceholderProps,
): props is Extract<PagePlaceholderProps, { titleKey: string }> {
  return 'titleKey' in props
}

export function PagePlaceholder(props: PagePlaceholderProps) {
  const namespace = isTranslationProps(props) ? (props.namespace ?? 'common') : 'common'
  const { t } = useTranslation(namespace)
  const { t: tCommon } = useTranslation('common')

  if (!isTranslationProps(props)) {
    const { eyebrow, title, description } = props

    return (
      <section className={styles.page}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </section>
    )
  }

  const { eyebrowKey, titleKey, descriptionKey } = props
  const eyebrow = eyebrowKey ? t(eyebrowKey) : tCommon('brand')

  return (
    <section className={styles.page}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{t(titleKey)}</h1>
      <p className={styles.description}>{t(descriptionKey)}</p>
    </section>
  )
}
