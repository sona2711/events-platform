import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/_shared/LanguageSwitcher'
import { AUTH_LINKS, NAV_LINKS } from './consts'
import styles from './styles.module.css'

const getNavLinkClassName =
  (underlined: boolean) =>
  ({ isActive }: { isActive: boolean }) => {
    const classes = [styles.navLink]

    if (isActive || underlined) {
      classes.push(styles.underlinedNavLink)
    }

    return classes.join(' ')
  }

export function Header() {
  const { t } = useTranslation('common')

  return (
    <header className={styles.header}>
      <nav className={styles.navBar} aria-label={t('aria.primaryNav')}>
        <Link className={styles.brand} to="/">
          {t('brand')}
        </Link>

        <div className={styles.primaryLinks}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              className={getNavLinkClassName('underlined' in link && link.underlined)}
              to={link.to}
              end={link.to === '/'}
            >
              {t(link.labelKey)}
            </NavLink>
          ))}
        </div>

        <div className={styles.authLinks}>
          <LanguageSwitcher />
          {AUTH_LINKS.map((link) => (
            <NavLink
              key={link.to}
              className={
                link.variant === 'filled'
                  ? `${styles.authLink} ${styles.authLinkFilled}`
                  : styles.authLink
              }
              to={link.to}
            >
              {t(link.labelKey)}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
