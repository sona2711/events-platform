import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Loader } from '@/components/_shared/Loader'
import { ThemeScope } from '@/components/_shared/ThemeScope'
import { Chat } from '@/components/chatBot'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import styles from './styles.module.css'

const routeLoadingFallback = <Loader />

export function AppLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Suspense fallback={routeLoadingFallback}>
          {isHome ? (
            <Outlet />
          ) : (
            <ThemeScope className={styles.themeScope}>
              <Outlet />
            </ThemeScope>
          )}
        </Suspense>
      </main>
      <Footer />
      <Chat />
    </div>
  )
}
