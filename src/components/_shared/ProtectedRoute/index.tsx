import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Loader } from '@/components/_shared/Loader'
import { useAppSelector } from '@/store/hooks'
import styles from './styles.module.css'

export function ProtectedRoute() {
  const location = useLocation()
  const { user, initializing } = useAppSelector((state) => state.auth)

  if (initializing) {
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
