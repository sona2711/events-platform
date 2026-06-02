import { Link, NavLink } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components/_shared/LanguageSwitcher'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { logout } from '@/store/authSlice'
import { AUTH_LINKS, NAV_LINKS } from './consts'
import styles from './styles.module.css'
import { getUserAvatarUrl, getUserDisplayName } from './utils'

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink

export function Header() {
  const { t } = useTranslation('common')
  const dispatch = useAppDispatch()
  const { user, loading } = useAppSelector((state) => state.auth)

  const handleLogout = () => {
    void dispatch(logout())
  }

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
              className={getNavLinkClassName}
              to={link.to}
              end={link.to === '/'}
            >
              {t(link.labelKey)}
              {user && link.to === '/categories' ? (
                <DownOutlined className={styles.categoriesIcon} aria-hidden />
              ) : null}
            </NavLink>
          ))}
        </div>

        <div className={styles.authLinks}>
          <LanguageSwitcher />
          {user ? (
            <>
              <div className={styles.userBlock}>
                <img
                  className={styles.avatar}
                  src={getUserAvatarUrl(user)}
                  alt=""
                  width={40}
                  height={40}
                />
                <span className={styles.userName}>{getUserDisplayName(user)}</span>
              </div>
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
              >
                {t(link.labelKey)}
              </NavLink>
            ))
          )}
        </div>
      </nav>
    </header>
  )
}
