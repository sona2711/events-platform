import { Link, NavLink } from 'react-router-dom'
import { AUTH_LINKS, NAV_LINKS } from './consts'
import styles from './styles.module.css'

const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
  isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink

export function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navBar} aria-label="Primary navigation">
        <Link className={styles.brand} to="/">
          Yerevan Pulsar
        </Link>

        <div className={styles.primaryLinks}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              className={getNavLinkClassName}
              to={link.to}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className={styles.authLinks}>
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
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
