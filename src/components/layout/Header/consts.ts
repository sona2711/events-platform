export const NAV_LINKS = [
  { labelKey: 'nav.allEvents', to: '/' },
  { labelKey: 'nav.categories', to: '/categories', underlined: true },
] as const

export const AUTH_LINKS = [
  { labelKey: 'auth.login', to: '/login', variant: 'plain' },
  { labelKey: 'auth.signUp', to: '/sign-up', variant: 'filled' },
] as const
