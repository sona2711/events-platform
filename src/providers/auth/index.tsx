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
        void (async () => {
          if (firebaseUser) {
            const { createAuthUser } = await import('@/lib/authUser')
            const user: AuthUser = await createAuthUser(firebaseUser)
            dispatch(setUser(user))
            return
          }

          dispatch(setUser(null))
        })()
      })
    })()

    return () => {
      unsubscribe?.()
    }
  }, [dispatch])

  return <>{children}</>
}
