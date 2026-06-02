import type { ProfileNavItem, UserProfile } from '@/pages/userProfile/types'

export type UserProfileSidebarProps = {
  profile: UserProfile
  navItems: ProfileNavItem[]
  onNavItemClick?: (itemId: ProfileNavItem['id']) => void
  onAvatarImageSelect?: (file: File) => void
}
