import type { SVGProps } from 'react'

export const DumbbellIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden {...props}>
    <rect x="2" y="9" width="3" height="6" rx="1" />
    <rect x="19" y="9" width="3" height="6" rx="1" />
    <rect x="6" y="11" width="12" height="2" rx="1" />
  </svg>
)

export const FoodDrinkIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden>
    <path
      d="M6 3v8M8 3v5M10 3v8M6 11v10M10 11v10M18 3v18M16 3v6c0 2 2 3 2 3s2-1 2-3V3"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
