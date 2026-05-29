import { Outlet } from 'react-router-dom'
import { NotificationBanner } from '@/components/_shared/NotificationBanner'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import styles from './styles.module.css'

export function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <NotificationBanner />
      <Footer />
    </div>
  )
}
