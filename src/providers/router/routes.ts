import { createElement, lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'

const MainPage = lazy(() =>
  import('@/pages/mainPage').then((module) => ({ default: module.MainPage })),
)

const ExploreEventsPage = lazy(() =>
  import('@/pages/explore-events-in-yerevan').then((module) => ({
    default: module.ExploreEventsPage,
  })),
)

const CategoriesPage = lazy(() =>
  import('@/pages/categoriesPage').then((module) => ({
    default: module.CategoriesPage,
  })),
)

const LoginPage = lazy(() =>
  import('@/pages/LoginPage').then((module) => ({ default: module.LoginPage })),
)

const SignUpPage = lazy(() =>
  import('@/pages/SignUpPage').then((module) => ({ default: module.SignUpPage })),
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

const NotFoundPage = lazy(() =>
  import('@/pages/404page').then((module) => ({ default: module.NotFoundPage })),
)

export const mainPageRoute: RouteObject = {
  index: true,
  element: createElement(MainPage),
}

export const exploreEventsPageRoute: RouteObject = {
  path: 'explore-events-in-yerevan',
  element: createElement(ExploreEventsPage),
}

export const categoriesPageRoute: RouteObject = {
  path: 'categories',
  element: createElement(CategoriesPage),
}

export const loginPageRoute: RouteObject = {
  path: 'login',
  element: createElement(LoginPage),
}

export const signUpPageRoute: RouteObject = {
  path: 'sign-up',
  element: createElement(SignUpPage),
}

export const adminRedirectRoute: RouteObject = {
  path: 'admin',
  element: createElement(Navigate, { to: '/admin/registrations', replace: true }),
}

export const adminPageRoute: RouteObject = {
  path: 'admin/registrations',
  element: createElement(AdminPage),
}

export const adminEventsRoute: RouteObject = {
  path: 'admin/events',
  element: createElement(AdminComingSoonPage),
}

export const adminFinancesRoute: RouteObject = {
  path: 'admin/finances',
  element: createElement(AdminComingSoonPage),
}

export const adminUsersRoute: RouteObject = {
  path: 'admin/users',
  element: createElement(AdminComingSoonPage),
}

export const adminSettingsRoute: RouteObject = {
  path: 'admin/settings',
  element: createElement(AdminComingSoonPage),
}

export const passwordRecoveryPageRoute: RouteObject = {
  path: 'password-recovery',
  element: createElement(PasswordRecoveryPage),
}

export const userProfilePageRoute: RouteObject = {
  path: 'profile',
  element: createElement(UserProfilePage),
}

export const notFoundPageRoute: RouteObject = {
  path: '*',
  element: createElement(NotFoundPage),
}

export const appRoutes: RouteObject[] = [
  {
    element: createElement(AppLayout),
    children: [
      mainPageRoute,
      exploreEventsPageRoute,
      categoriesPageRoute,
      loginPageRoute,
      signUpPageRoute,
      passwordRecoveryPageRoute,
      userProfilePageRoute,
    ],
  },
  adminRedirectRoute,
  adminPageRoute,
  adminEventsRoute,
  adminFinancesRoute,
  adminUsersRoute,
  adminSettingsRoute,
  notFoundPageRoute,
]
