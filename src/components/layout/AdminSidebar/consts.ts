import {
  AppstoreOutlined,
  CalendarOutlined,
  DollarOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
import adminProfileAvatar from '@/assets/images/admin-profile.png'
import type { AdminNavLink } from './types'

export const ADMIN_PROFILE_AVATAR_SRC = adminProfileAvatar

export const ADMIN_NAV_LINKS: AdminNavLink[] = [
  { labelKey: 'adminNav.dashboard', to: '/admin', Icon: AppstoreOutlined, end: true },
  { labelKey: 'adminNav.events', to: '/admin/events', Icon: CalendarOutlined },
  { labelKey: 'adminNav.registrations', to: '/admin/registrations', Icon: TeamOutlined },
  { labelKey: 'adminNav.finances', to: '/admin/finances', Icon: DollarOutlined },
  { labelKey: 'adminNav.users', to: '/admin/users', Icon: UserOutlined },
  { labelKey: 'adminNav.settings', to: '/admin/settings', Icon: SettingOutlined },
]
