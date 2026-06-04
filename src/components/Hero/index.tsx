import styles from './styles.module.css'
import { TICKER_TEXT } from './consts'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>
            Experience the <span className={styles.pulseWord}>Pulse</span>
          </span>
          <span className={styles.titleLine}>of Yerevan</span>
        </h1>

        <p className={styles.description}>
          <span className={styles.descriptionLine}>
            Discover curated cultural experiences, underground techno nights,
          </span>
          <span className={styles.descriptionLine}>and tech summits in the heart of Armenia.</span>
        </p>

        <div className={styles.actions}>
          <button className={styles.btnPrimary} type="button">
            <span className={styles.btnPrimaryLabel}>Start Exploring</span>
            <svg
              className={styles.btnPrimaryIcon}
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
          </button>

          <button className={styles.btnSecondary} type="button">
            Watch Pulse Reel
          </button>
        </div>
      </div>

      <div className={styles.ticker}>
        <div className={styles.tickerTrack}>
          <span className={styles.tickerText}>{TICKER_TEXT}</span>
          <span aria-hidden="true" className={styles.tickerText}>
            {TICKER_TEXT}
          </span>
        </div>
      </div>
    </section>
  )
}
