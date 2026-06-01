import { useRef } from 'react'
import {
  BookOutlined,
  CalendarOutlined,
  EditOutlined,
  MessageOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Avatar } from 'antd'
import { useTranslation } from 'react-i18next'
import type { ProfileNavItem } from '@/pages/userProfile/types'
import type { UserProfileSidebarProps } from './types'
import styles from './styles.module.css'

const NAV_ICONS: Record<ProfileNavItem['id'], typeof CalendarOutlined> = {
  bookings: CalendarOutlined,
  saved: BookOutlined,
  feedback: MessageOutlined,
  settings: SettingOutlined,
}

export const UserProfileSidebar = ({
  profile,
  navItems,
  onNavItemClick,
  onAvatarImageSelect,
}: UserProfileSidebarProps) => {
  const { t } = useTranslation('profile')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleEditPhotoClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onAvatarImageSelect?.(file)
    }
    event.target.value = ''
  }

  return (
    <aside className={styles.card} aria-label={t('sidebar.aria.navigation')}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className={styles.fileInput}
        onChange={handleFileChange}
        tabIndex={-1}
        aria-hidden
      />
      <div className={styles.avatarWrapper}>
        <Avatar
          size={96}
          src={profile.avatarUrl}
          alt={profile.fullName}
          className={styles.avatar}
        />
        <button
          type="button"
          className={styles.editButton}
          aria-label={t('sidebar.aria.editPhoto')}
          onClick={handleEditPhotoClick}
        >
          <EditOutlined />
        </button>
      </div>

      <h2 className={styles.name}>{profile.fullName}</h2>
      <p className={styles.location}>{profile.location}</p>

      <nav className={styles.nav} aria-label={t('sidebar.aria.accountSections')}>
        {navItems.map((item) => {
          const Icon = NAV_ICONS[item.id]

          return (
            <button
              key={item.id}
              type="button"
              className={
                item.isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem
              }
              aria-label={t(`nav.${item.id}`)}
              aria-current={item.isActive ? 'page' : undefined}
              onClick={() => onNavItemClick?.(item.id)}
            >
              <Icon className={styles.navIcon} aria-hidden />
              <span className={styles.navLabel}>{t(`nav.${item.id}`)}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
