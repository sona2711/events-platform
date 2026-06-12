import type { User } from 'firebase/auth'
import type { AuthUser } from '@/types'
import { checkIsAdmin } from './admins'

export async function createAuthUser(firebaseUser: User): Promise<AuthUser> {
  const isAdmin = await checkIsAdmin(firebaseUser.uid)

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    isAdmin,
  }
}
