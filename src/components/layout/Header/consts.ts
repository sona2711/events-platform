type NavLinkItem = {
  readonly labelKey: 'nav.allEvents' | 'nav.exploreEvents' | 'nav.categories'
  readonly to: '/' | '/explore-events' | '/categories'
  readonly alwaysUnderlined?: boolean
}

export const NAV_LINKS: readonly NavLinkItem[] = [
  { labelKey: 'nav.allEvents', to: '/' },
  { labelKey: 'nav.exploreEvents', to: '/explore-events' },
  { labelKey: 'nav.categories', to: '/categories' },
] as const

export const AUTH_LINKS = [
  { labelKey: 'auth.login', to: '/login', variant: 'plain' },
  { labelKey: 'auth.signUp', to: '/sign-up', variant: 'filled' },
] as const
