import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import styles from './styles.module.css'

export function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
