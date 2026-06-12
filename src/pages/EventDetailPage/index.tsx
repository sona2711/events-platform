import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { EventDetailAbout } from '@/components/features/EventDetailAbout'
import { EventDetailBackButton } from '@/components/features/EventDetailBackButton'
import { EventDetailHero } from '@/components/features/EventDetailHero'
import { EventDetailInfoCard } from '@/components/features/EventDetailInfoCard'
import { EventDetailLayout } from '@/components/features/EventDetailLayout'
import { EventDetailLocation } from '@/components/features/EventDetailLocation'
import { EventDetailOrganizer } from '@/components/features/EventDetailOrganizer'
import { EventDetailTags } from '@/components/features/EventDetailTags'
import { EventDetailTicketCard } from '@/components/features/EventDetailTicketCard'
import { fetchEventById } from '@/mock-api/resolveEventById'
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

    let cancelled = false

    setEvent(null)
    setStatus('loading')

    fetchEventById(eventId).then((data) => {
      if (cancelled) return

      if (!data) {
        setStatus('not-found')
        return
      }

      setEvent(data)
      setStatus('ready')
    })

    return () => {
      cancelled = true
    }
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

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <EventDetailBackButton onBack={() => navigate(-1)} />
        <EventDetailHero event={event} />
        <EventDetailLayout
          main={
            <>
              <EventDetailOrganizer organizer={event.organizer} eventTitle={event.title} />
              <EventDetailAbout description={event.description} highlights={event.highlights} />
              <EventDetailLocation location={event.locationDetails} />
              <EventDetailTags tags={event.tags} />
            </>
          }
          sidebar={
            <>
              <EventDetailTicketCard
                eventId={event.id}
                ticket={event.ticket}
                contactPhone={event.contactPhone}
              />
              <EventDetailInfoCard items={event.eventInfo} />
            </>
          }
        />
      </div>
    </main>
  )
}
