import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Loader } from '@/components/_shared/Loader'
import { useAppSelector } from '@/store/hooks'
import styles from './styles.module.css'

interface GuestRouteLocationState {
  from?: { pathname: string }
}

export function GuestRoute() {
  const location = useLocation()
  const { user, initializing } = useAppSelector((state) => state.auth)

  if (initializing) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    )
  }

  if (user) {
    const state = location.state as GuestRouteLocationState | null
    const redirectTo = state?.from?.pathname ?? '/'
    return <Navigate to={redirectTo} replace />
  }

  return <Outlet />
}
