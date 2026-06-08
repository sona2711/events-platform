import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Loader } from '@/components/_shared/Loader'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import styles from './styles.module.css'

const routeLoadingFallback = <Loader />

export function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={routeLoadingFallback}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
