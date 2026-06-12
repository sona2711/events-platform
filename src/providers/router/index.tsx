import { Suspense } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { Loader } from '@/components/_shared/Loader'
import { ScrollToTop } from './ScrollToTop'
import { appRoutes } from './routes'

const AppRoutes = () => useRoutes(appRoutes)

const routeLoadingFallback = <Loader />

export const AppRouter = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Suspense fallback={routeLoadingFallback}>
      <AppRoutes />
    </Suspense>
  </BrowserRouter>
)
