import { useEffect, useState } from 'react'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/_shared/LanguageSwitcher'
import { ThemeToggle } from '@/components/_shared/ThemeToggle'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logout, selectAuthLoading, selectAuthUser } from '@/store/authSlice'
import { selectProfile } from '@/store/profile'
import { AUTH_LINKS, NAV_LINKS } from './consts'
import styles from './styles.module.css'
import { getUserAvatarUrl, getUserDisplayName } from './utils'

const getNavLinkClassName =
  (alwaysUnderlined?: boolean) =>
  ({ isActive }: { isActive: boolean }) =>
    isActive || alwaysUnderlined ? `${styles.navLink} ${styles.underlinedNavLink}` : styles.navLink

export function Header() {
  const { t } = useTranslation('common')
  const { pathname } = useLocation()
  const showThemeToggle = pathname !== '/'
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectAuthUser)
  const profile = useAppSelector(selectProfile)
  const loading = useAppSelector(selectAuthLoading)

  const displayName = profile.fullName.trim() || (user ? getUserDisplayName(user) : '')
  const avatarUrl = profile.avatarUrl || (user ? getUserAvatarUrl(user) : '')

  const handleLogout = () => {
    void dispatch(logout())
  }
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  useEffect(() => {
    if (!mobileOpen) {
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header className={styles.header}>
      {mobileOpen && <div className={styles.overlay} onClick={closeMobile} aria-hidden="true" />}

      <nav
        className={mobileOpen ? `${styles.navBar} ${styles.navBarOpen}` : styles.navBar}
        aria-label={t('aria.primaryNav')}
      >
        <div className={styles.navRow}>
          <Link className={styles.brand} to="/" onClick={closeMobile}>
            {t('brand')}
          </Link>

          <Button
            className={styles.menuToggle}
            icon={mobileOpen ? <CloseOutlined /> : <MenuOutlined />}
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t('header.closeMenu') : t('header.toggleMenu')}
            type="text"
          />
        </div>

        <div className={mobileOpen ? `${styles.navPanel} ${styles.navPanelOpen}` : styles.navPanel}>
          <div className={styles.primaryLinks}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                className={getNavLinkClassName(link.alwaysUnderlined)}
                to={link.to}
                end={link.to === '/'}
                onClick={closeMobile}
              >
                {t(link.labelKey)}
              </NavLink>
            ))}
          </div>

          <div className={styles.authLinks}>
            {showThemeToggle ? <ThemeToggle /> : null}
            <LanguageSwitcher />
            {user ? (
              <>
                <Link
                  className={styles.userBlock}
                  to="/profile"
                  onClick={closeMobile}
                  aria-label={t('header.openProfile', { name: displayName })}
                >
                  <img className={styles.avatar} src={avatarUrl} alt="" width={40} height={40} />
                  <span className={styles.userName}>{displayName}</span>
                </Link>
                <button
                  type="button"
                  className={styles.logoutButton}
                  onClick={handleLogout}
                  disabled={loading}
                >
                  {t('auth.logout')}
                </button>
              </>
            ) : (
              AUTH_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  className={
                    link.variant === 'filled'
                      ? `${styles.authLink} ${styles.authLinkFilled}`
                      : styles.authLink
                  }
                  to={link.to}
                  onClick={closeMobile}
                >
                  {t(link.labelKey)}
                </NavLink>
              ))
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
