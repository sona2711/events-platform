import type { AuthUser } from '@/types'
import defaultAvatar from '@/assets/images/avatar.jpg'

export const getUserDisplayName = (user: AuthUser): string => {
  const trimmedName = user.displayName?.trim()
  if (trimmedName) return trimmedName

  const emailLocalPart = user.email?.split('@')[0]?.trim()
  if (emailLocalPart) return emailLocalPart

  return 'User'
}

export const getUserAvatarUrl = (user: AuthUser): string => user.photoURL?.trim() || defaultAvatar
