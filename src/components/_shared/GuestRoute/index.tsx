import { Navigate, Outlet, useLocation, type Location } from 'react-router-dom'
import { Loader } from '@/components/_shared/Loader'
import { useAppSelector } from '@/store/hooks'
import { ADMIN_POST_AUTH_REDIRECT_PATH, POST_AUTH_REDIRECT_PATH } from './consts'
import styles from './styles.module.css'

interface GuestRouteLocationState {
  from?: Location
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
    if (user.isAdmin) {
      return <Navigate to={ADMIN_POST_AUTH_REDIRECT_PATH} replace />
    }

    const state = location.state as GuestRouteLocationState | null

    if (state?.from) {
      return (
        <Navigate
          to={{
            pathname: state.from.pathname,
            search: state.from.search,
            hash: state.from.hash,
          }}
          state={state.from.state}
          replace
        />
      )
    }

    return <Navigate to={POST_AUTH_REDIRECT_PATH} replace />
  }

  return <Outlet />
}
