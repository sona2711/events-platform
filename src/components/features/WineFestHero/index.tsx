import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import wineImg from '@/assets/images/wine.jpg'
import rectangleStain from '@/assets/images/Rectangle 1.png'
import styles from './styles.module.css'

const TARGET = new Date('2026-06-10T16:00:00')

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, mins: 0 }
  return {
    days: Math.floor(diff / 864e5),
    hours: Math.floor((diff % 864e5) / 36e5),
    mins: Math.floor((diff % 36e5) / 6e4),
  }
}

const UNITS = ['DAYS', 'HOURS', 'MINS'] as const

export function WineFestHero() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')
  const values = [timeLeft.days, timeLeft.hours, timeLeft.mins]

  return (
    <section className={styles.section}>
      <div className={styles.layout}>
        <div className={styles.left}>
          <h2 className={styles.title}>
            <span className={styles.titleLine}>Armenia</span>
            <span className={styles.titleLine}>Wine Fest</span>
            <span className={styles.titleLine}>2026</span>
          </h2>

          <div className={styles.countdown}>
            {UNITS.map((label, i) => (
              <div key={label} className={styles.unit}>
                <span className={styles.number}>{pad(values[i])}</span>
                <span className={styles.unitLabel}>{label}</span>
              </div>
            ))}
          </div>

          <Link to="/login" className={styles.btn}>
            Get Tickets
          </Link>
        </div>

        <div className={styles.right}>
          <div className={styles.imageFrame}>
            <img src={wineImg} alt="Armenia Wine Fest 2026" className={styles.wineImg} />
            <img src={rectangleStain} alt="" aria-hidden="true" className={styles.stain} />
          </div>
        </div>
      </div>
    </section>
  )
}
