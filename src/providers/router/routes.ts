import { createElement, lazy, type ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { AdminRoute } from '@/components/_shared/AdminRoute'
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

const AdminComingSoonPage = lazy(() =>
  import('@/pages/adminComingSoonPage').then((module) => ({
    default: module.AdminComingSoonPage,
  })),
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

const CheckoutPage = lazy(() =>
  import('@/pages/CheckoutPage').then((module) => ({
    default: module.CheckoutPage,
  })),
)

const EventDetailPage = lazy(() =>
  import('@/pages/EventDetailPage').then((module) => ({
    default: module.EventDetailPage,
  })),
)

const NotFoundPage = lazy(() =>
  import('@/pages/404page').then((module) => ({ default: module.NotFoundPage })),
)

const ScheduleAssistantPage = lazy(() =>
  import('@/pages/ScheduleAssistantPage').then((module) => ({
    default: module.ScheduleAssistantPage,
  })),
)

export const appRoutes: RouteObject[] = [
  {
    element: createElement(AppLayout),
    children: [
      { index: true, element: createElement(MainPage) },
      {
        path: 'explore-events',
        element: createElement(Navigate, { to: '/categories', replace: true }),
      },
      { path: 'categories', element: createElement(CategoriesPage) },
      { path: 'schedule-assistant', element: createElement(ScheduleAssistantPage) },
      { path: 'event/:eventId', element: createElement(EventDetailPage) },
      {
        element: createElement(ProtectedRoute),
        children: [
          { path: 'profile', element: createElement(UserProfilePage) },
          { path: 'checkout/:eventId', element: createElement(CheckoutPage) },
        ],
      },
      {
        path: '*',
        element: createElement(NotFoundPage),
        handle: { hideFooter: true },
      },
    ],
  },
  {
    element: createElement(GuestRoute),
    children: [
      { path: 'login', element: createElement(LazyLoginPage) },
      { path: 'sign-up', element: createElement(LazySignUpPage) },
      { path: 'password-recovery', element: createElement(PasswordRecoveryPage) },
    ],
  },
  {
    element: createElement(AdminRoute),
    children: [
      {
        path: 'admin',
        element: createElement(Navigate, { to: '/admin/registrations', replace: true }),
      },
      { path: 'admin/registrations', element: createElement(AdminPage) },
      { path: 'admin/events', element: createElement(AdminComingSoonPage) },
      { path: 'admin/finances', element: createElement(AdminComingSoonPage) },
      { path: 'admin/users', element: createElement(AdminComingSoonPage) },
      { path: 'admin/settings', element: createElement(AdminComingSoonPage) },
    ],
  },
]
