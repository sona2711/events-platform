import { Link } from 'react-router-dom'
import { Flex, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { HomeFeatureCard } from '@/components/features/HomeFeatureCard'
import {
  CATEGORY_CHIPS,
  HERO_FEATURED_EVENT,
  HERO_SECONDARY_EVENTS,
} from '@/components/features/homepage/homeContent'
import styles from './styles.module.css'

const { Title, Text, Paragraph } = Typography

export const Hero = () => {
  const { t } = useTranslation('home')

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glowOrbPink} aria-hidden="true" />
      <div className={styles.glowOrbBlue} aria-hidden="true" />
      <div className={styles.layout}>
        <div className={styles.content}>
          <Text className={styles.eyebrow}>{t('hero.eyebrow')}</Text>

          <Title className={styles.title} id="hero-title" level={1}>
            <span className={styles.titleLine}>
              {t('hero.titleLine1')}{' '}
              <span className={styles.pulseWord}>{t('hero.titleAccent')}</span>
            </span>
            <span className={styles.titleLine}>{t('hero.titleLine2')}</span>
          </Title>

          <Paragraph className={styles.description}>{t('hero.description')}</Paragraph>

          <Flex
            className={styles.categoryChips}
            aria-label={t('hero.categoryChipsAria')}
            gap={10}
            wrap="wrap"
          >
            {CATEGORY_CHIPS.map((chip) => (
              <Link
                key={chip.slug}
                className={`${styles.chip} ${styles[`chip${chip.accent.charAt(0).toUpperCase() + chip.accent.slice(1)}`]}`}
                to="/categories"
              >
                {chip.label}
              </Link>
            ))}
          </Flex>

          <Flex className={styles.actions} gap={12} wrap="wrap">
            <Link className={styles.btnPrimary} to="/categories">
              <span className={styles.btnPrimaryLabel}>{t('hero.primaryCta')}</span>
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
            </Link>

            <Link className={styles.btnSecondary} to="/categories">
              {t('hero.secondaryCta')}
            </Link>
          </Flex>
        </div>

        <div className={styles.featuredGrid}>
          <HomeFeatureCard event={HERO_FEATURED_EVENT} size="featured" />
          <div className={styles.secondaryCards}>
            {HERO_SECONDARY_EVENTS.map((event) => (
              <HomeFeatureCard key={event.id} event={event} size="secondary" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
