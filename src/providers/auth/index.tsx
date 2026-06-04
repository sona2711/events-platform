import { type ReactNode, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { setUser } from '@/store/authSlice'
import { useAppDispatch } from '@/store/hooks'
import type { AuthUser } from '@/types'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        }
        dispatch(setUser(user))
      } else {
        dispatch(setUser(null))
      }
    })

    return unsubscribe
  }, [dispatch])

  return <>{children}</>
}
