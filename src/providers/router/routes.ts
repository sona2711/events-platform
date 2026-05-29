import { createElement, lazy, type ComponentType } from 'react'
import type { RouteObject } from 'react-router-dom'
import { GuestRoute } from '@/components/_shared/GuestRoute'
import { ProtectedRoute } from '@/components/_shared/ProtectedRoute'
import { AppLayout } from '@/components/layout/AppLayout'

const MainPage = lazy(() =>
  import('@/pages/mainPage').then((module) => ({ default: module.MainPage })),
)

const CategoriesPage = lazy(() =>
  import('@/pages/categoriesPage').then((module) => ({
    default: module.CategoriesPage,
  })),
)

const LazyLoginPage = lazy(() => import('@/pages/LoginPage') as Promise<{ default: ComponentType }>)

const LazySignUpPage = lazy(
  () => import('@/pages/SignUpPage') as Promise<{ default: ComponentType }>,
)

const AdminPage = lazy(() =>
  import('@/pages/adminPage').then((module) => ({ default: module.AdminPage })),
)

const PasswordRecoveryPage = lazy(() =>
  import('@/pages/passwordRecovery').then((module) => ({
    default: module.PasswordRecoveryPage,
  })),
)

const UserProfilePage = lazy(() =>
  import('@/pages/userProfile').then((module) => ({
    default: module.UserProfilePage,
  })),
)

const NotFoundPage = lazy(() =>
  import('@/pages/404page').then((module) => ({ default: module.NotFoundPage })),
)

export const appRoutes: RouteObject[] = [
  {
    element: createElement(AppLayout),
    children: [
      { index: true, element: createElement(MainPage) },
      { path: 'categories', element: createElement(CategoriesPage) },
      {
        element: createElement(GuestRoute),
        children: [
          { path: 'login', element: createElement(LazyLoginPage) },
          { path: 'sign-up', element: createElement(LazySignUpPage) },
          { path: 'password-recovery', element: createElement(PasswordRecoveryPage) },
        ],
      },
      {
        element: createElement(ProtectedRoute),
        children: [
          { path: 'admin', element: createElement(AdminPage) },
          { path: 'profile', element: createElement(UserProfilePage) },
        ],
      },
      { path: '*', element: createElement(NotFoundPage) },
    ],
  },
]
