import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftOutlined, CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons'
import type { EventDetail } from './types'
import styles from './styles.module.css'

type FetchStatus = 'loading' | 'ready' | 'not-found' | 'error'

export function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const [event, setEvent] = useState<EventDetail | null>(null)
  const [status, setStatus] = useState<FetchStatus>('loading')

  useEffect(() => {
    if (!eventId) return

    setStatus('loading')

    fetch(`/api/events/${eventId}`)
      .then((res) => {
        if (res.status === 404) {
          setStatus('not-found')
          return null
        }
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json() as Promise<EventDetail>
      })
      .then((data) => {
        if (data) {
          setEvent(data)
          setStatus('ready')
        }
      })
      .catch(() => setStatus('error'))
  }, [eventId])

  if (status === 'loading') {
    return (
      <div className={styles.center}>
        <div className={styles.spinner} aria-label="Loading event" />
      </div>
    )
  }

  if (status === 'not-found') {
    return (
      <div className={styles.center}>
        <p className={styles.stateMessage}>Event not found.</p>
        <Link to="/" className={styles.backLink}>
          Back to home
        </Link>
      </div>
    )
  }

  if (status === 'error' || !event) {
    return (
      <div className={styles.center}>
        <p className={styles.stateMessage}>Something went wrong. Please try again.</p>
        <button className={styles.backLink} onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    )
  }

  const isFree = event.price === 'Free'

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>
          <ArrowLeftOutlined aria-hidden />
          Back
        </button>

        <div className={styles.imageWrapper}>
          <img src={event.imageUrl} alt={event.title} className={styles.image} />
          <span className={styles.category}>{event.category}</span>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>{event.title}</h1>

          <div className={styles.meta}>
            <p className={styles.metaItem}>
              <EnvironmentOutlined className={styles.metaIcon} aria-hidden />
              {event.location}
            </p>
            <p className={styles.metaItem}>
              <CalendarOutlined className={styles.metaIcon} aria-hidden />
              {event.date}
            </p>
          </div>

          <p className={styles.description}>{event.description}</p>

          <div className={styles.footer}>
            <span className={isFree ? styles.priceFree : styles.price}>{event.price}</span>
            <Link to={`/checkout/${event.id}`} className={styles.bookButton}>
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
