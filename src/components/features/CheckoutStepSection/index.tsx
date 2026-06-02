import type { CheckoutStepSectionProps } from './types'
import styles from './styles.module.css'

export const CheckoutStepSection = ({
  stepNumber,
  title,
  ariaLabel,
  children,
}: CheckoutStepSectionProps) => (
  <section className={styles.section} aria-label={ariaLabel}>
    <div className={styles.header}>
      <span className={styles.stepBadge} aria-hidden>
        {stepNumber}
      </span>
      <h2 className={styles.title}>{title}</h2>
    </div>
    <div className={styles.content}>{children}</div>
  </section>
)
