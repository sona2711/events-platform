import { type ReactNode, useEffect } from 'react'
import { setUser } from '@/store/authSlice'
import { useAppDispatch } from '@/store/hooks'
import type { AuthUser } from '@/types'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    let unsubscribe: (() => void) | undefined

    void (async () => {
      const [{ onAuthStateChanged }, { getFirebaseAuth }] = await Promise.all([
        import('firebase/auth'),
        import('@/lib/firebase'),
      ])

      const auth = await getFirebaseAuth()

      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
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
    })()

    return () => {
      unsubscribe?.()
    }
  }, [dispatch])

  return <>{children}</>
}
