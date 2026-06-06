import { getUserAvatarUrl, getUserDisplayName } from '@/components/layout/Header/utils'
import type { AuthUser } from '@/types'
import type { ProfileState } from './profileTypes'

export type AuthProfileIdentity = Pick<ProfileState, 'id' | 'fullName' | 'email' | 'avatarUrl'>

export const mapAuthUserToProfileIdentity = (user: AuthUser): AuthProfileIdentity => ({
  id: user.uid,
  fullName: getUserDisplayName(user),
  email: user.email ?? '',
  avatarUrl: getUserAvatarUrl(user),
})

export const shouldHydrateProfileFromAuth = (profileId: string, authUid: string): boolean =>
  profileId !== authUid
