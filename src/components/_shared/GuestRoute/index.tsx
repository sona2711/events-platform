import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Loader } from '@/components/_shared/Loader'
import { NotificationBanner } from '@/components/_shared/NotificationBanner'
import { useAppSelector } from '@/store/hooks'
import { POST_AUTH_REDIRECT_PATH } from './consts'
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
    const redirectTo = state?.from?.pathname ?? POST_AUTH_REDIRECT_PATH
    return <Navigate to={redirectTo} replace />
  }

  return (
    <>
      <Outlet />
      <NotificationBanner />
    </>
  )
}
