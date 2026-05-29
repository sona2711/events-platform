import styles from './styles.module.css'
import { TICKER_TEXT } from './consts'

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background} aria-hidden="true" />
      <div className={styles.content}>
        <h1 className={styles.title}>
          Experience the <span className={styles.pulseWord}>Pulse</span> of Yerevan
        </h1>

        <p className={styles.description}>
          Discover curated cultural experiences, underground techno nights, and tech summits in the
          heart of Armenia.
        </p>

        <div className={styles.actions}>
          <button className={styles.btnPrimary} type="button">
            Start Exploring ↗
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
