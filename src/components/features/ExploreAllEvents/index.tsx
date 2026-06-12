import { useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { EventsCard } from '@/components/_shared/EventsCard'
import { HomeSidebarCard } from '@/components/features/HomeSidebarCard'
import { useEventBookingModal } from '@/hooks/useEventBookingModal'
import { TRENDING_EVENTS, WEEKEND_EVENTS } from '@/components/features/homepage/homeContent'
import { MOCK_CATEGORY_EVENTS } from '@/pages/categoriesPage/mockEvents'
import { getCatalogCategoryItems } from '@/pages/categoriesPage/utils'
import { EXPLORE_EVENT_BY_ID, EXPLORE_EVENTS_CARD_DATA } from './consts'
import styles from './styles.module.css'

const { Title, Text, Paragraph } = Typography

const CATEGORY_TILE_ACCENTS = [
  'accentPink',
  'accentBlue',
  'accentOrange',
  'accentPurple',
  'accentLime',
  'accentCyan',
] as const

export const ExploreAllEvents = () => {
  const { t } = useTranslation('home')
  const resolveEvent = useCallback((eventId: string) => EXPLORE_EVENT_BY_ID.get(eventId), [])
  const { handleBook, bookingModal } = useEventBookingModal({ resolveEvent })

  const mainEvents = EXPLORE_EVENTS_CARD_DATA.slice(0, 4)
  const gridEvents = EXPLORE_EVENTS_CARD_DATA.slice(4)
  const catalogCategories = useMemo(() => getCatalogCategoryItems(MOCK_CATEGORY_EVENTS), [])

  return (
    <>
      <section className={styles.section} aria-labelledby="explore-events-title">
        <div className={styles.glowOrb} aria-hidden="true" />
        <div className={styles.layout}>
          <div className={styles.mainColumn}>
            <div className={styles.sectionHeader}>
              <Text className={styles.eyebrow}>{t('explore.eyebrow')}</Text>
              <Title className={styles.title} id="explore-events-title" level={2}>
                {t('explore.title')}
              </Title>
              <Paragraph className={styles.subtitle}>{t('explore.subtitle')}</Paragraph>
            </div>

            <div className={styles.featuredGrid}>
              {mainEvents.map((event) => (
                <EventsCard key={event.id} event={event} onBook={handleBook} />
              ))}
            </div>

            {gridEvents.length > 0 ? (
              <div className={styles.compactGrid}>
                {gridEvents.map((event) => (
                  <EventsCard key={event.id} event={event} onBook={handleBook} />
                ))}
              </div>
            ) : null}

            <div className={styles.seeMoreWrapper}>
              <Link className={styles.seeMoreBtn} to="/explore-events">
                {t('explore.seeMore')}
              </Link>
            </div>
          </div>

          <aside className={styles.sidebar} aria-label={t('explore.sidebarAria')}>
            <div className={`${styles.sidebarModule} ${styles.trendingModule}`}>
              <Title className={styles.moduleTitle} level={3}>
                {t('explore.trending')}
              </Title>
              <div className={styles.sidebarList}>
                {TRENDING_EVENTS.map((event) => (
                  <HomeSidebarCard key={event.id} event={event} variant="trending" />
                ))}
              </div>
            </div>

            <div className={`${styles.sidebarModule} ${styles.weekendModule}`}>
              <Title className={styles.moduleTitle} level={3}>
                {t('explore.weekend')}
              </Title>
              <div className={styles.sidebarList}>
                {WEEKEND_EVENTS.map((event) => (
                  <HomeSidebarCard key={event.id} event={event} variant="weekend" />
                ))}
              </div>
            </div>

            <div className={`${styles.sidebarModule} ${styles.categoriesModule}`}>
              <Title className={styles.moduleTitle} level={3}>
                {t('explore.categories')}
              </Title>
              <div className={styles.categoryGrid}>
                {catalogCategories.map((category, index) => (
                  <Link
                    key={category.id}
                    className={`${styles.categoryTile} ${styles[CATEGORY_TILE_ACCENTS[index % CATEGORY_TILE_ACCENTS.length]]}`}
                    to={`/categories?category=${category.id}`}
                  >
                    <span className={styles.categoryLabel}>{category.label}</span>
                    <span className={styles.categoryCount}>{category.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {bookingModal}
    </>
  )
}
