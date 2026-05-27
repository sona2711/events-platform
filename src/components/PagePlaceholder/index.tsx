import type { PagePlaceholderProps } from './types'
import styles from './styles.module.css'

export function PagePlaceholder({
  eyebrow = 'Yerevan Pulsar',
  title,
  description,
}: PagePlaceholderProps) {
  return (
    <section className={styles.page}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </section>
  )
}
