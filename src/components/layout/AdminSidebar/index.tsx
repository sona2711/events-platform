import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Avatar, Button } from 'antd'
import { CloseOutlined, LogoutOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons'
import { ADMIN_NAV_LINKS, ADMIN_PROFILE_AVATAR_SRC } from './consts'
import styles from './styles.module.css'

export const AdminSidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t } = useTranslation('common')

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.activeNavLink}` : styles.navLink

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <Button
        className={
          mobileOpen ? `${styles.mobileToggle} ${styles.mobileToggleHidden}` : styles.mobileToggle
        }
        icon={<MenuOutlined />}
        onClick={() => setMobileOpen(true)}
        aria-label={t('adminSidebar.toggleMenu')}
        type="text"
      />

      {mobileOpen && <div className={styles.overlay} onClick={closeMobile} aria-hidden="true" />}

      <aside className={mobileOpen ? `${styles.sidebar} ${styles.sidebarOpen}` : styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div>
            <p className={styles.brand}>{t('brand')}</p>
            <p className={styles.subtitle}>{t('adminSidebar.subtitle')}</p>
          </div>
          {mobileOpen && (
            <Button
              className={styles.mobileClose}
              icon={<CloseOutlined />}
              onClick={closeMobile}
              aria-label={t('adminSidebar.closeMenu')}
              type="text"
            />
          )}
        </div>

        <nav className={styles.nav} aria-label={t('aria.adminNav')}>
          {ADMIN_NAV_LINKS.map(({ labelKey, to, Icon, end }) => (
            <NavLink key={to} to={to} className={getNavLinkClass} end={end}>
              <span className={styles.navIcon} aria-hidden="true">
                <Icon />
              </span>
              <span>{t(labelKey)}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Button className={styles.createEventBtn} icon={<PlusOutlined />} block>
            {t('adminNav.createEvent')}
          </Button>

          <div className={styles.avatarRow}>
            <Avatar
              size={36}
              className={styles.avatar}
              src={ADMIN_PROFILE_AVATAR_SRC}
              alt={t('adminSidebar.adminName')}
            />
            <span className={styles.adminName}>{t('adminSidebar.adminName')}</span>
          </div>

          <Button className={styles.logoutBtn} icon={<LogoutOutlined />} type="text" block>
            {t('adminNav.logout')}
          </Button>
        </div>
      </aside>
    </>
  )
}
