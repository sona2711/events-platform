import { useMemo } from 'react'
import { Empty, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { EventsCard } from '@/components/_shared/EventsCard'
import { EVENTS_CARD_DATA } from '@/components/EventsCard/consts'
import { MOCK_CATEGORY_EVENTS } from '@/pages/categoriesPage/mockEvents'
import { selectFavoriteEventIds } from '@/store/favorites'
import { useAppSelector } from '@/store/hooks'
import styles from './styles.module.css'

const { Title } = Typography

const ALL_SAVED_EVENT_CARD_DATA = [...EVENTS_CARD_DATA, ...MOCK_CATEGORY_EVENTS]

export const UserSavedEventsPanel = () => {
  const { t } = useTranslation('profile')
  const favoriteEventIds = useAppSelector(selectFavoriteEventIds)

  const favoriteEvents = useMemo(
    () => ALL_SAVED_EVENT_CARD_DATA.filter((event) => favoriteEventIds.includes(event.id)),
    [favoriteEventIds],
  )

  return (
    <section className={styles.panel} aria-labelledby="profile-saved-title">
      <Title className={styles.title} id="profile-saved-title" level={2}>
        {t('sections.saved.title')}
      </Title>

      {favoriteEvents.length > 0 ? (
        <ul className={styles.grid}>
          {favoriteEvents.map((event) => (
            <li key={event.id}>
              <EventsCard event={event} size="compact" />
            </li>
          ))}
        </ul>
      ) : (
        <Empty className={styles.emptyState} description={t('sections.saved.description')} />
      )}
    </section>
  )
}
