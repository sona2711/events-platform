export type CategoryAccent = 'pink' | 'blue' | 'orange' | 'lime' | 'purple'

const CATEGORY_ACCENT_MAP: Record<string, CategoryAccent> = {
  Music: 'pink',
  MUSIC: 'pink',
  JAZZ: 'pink',
  PARTY: 'pink',

  Technology: 'blue',
  TECHNOLOGY: 'blue',
  Tech: 'blue',
  TECH: 'blue',
  Education: 'blue',
  EDUCATION: 'blue',
  BUSINESS: 'blue',

  Festival: 'orange',
  FESTIVAL: 'orange',
  TASTING: 'orange',
  MARKET: 'orange',
  'Food & Drink': 'orange',
  'FOOD & DRINK': 'orange',

  Adventure: 'lime',
  ADVENTURE: 'lime',
  OUTDOORS: 'lime',
  Retreat: 'lime',
  RETREAT: 'lime',
  HEALTH: 'lime',

  Art: 'purple',
  ART: 'purple',
  Classical: 'purple',
  CLASSICAL: 'purple',
  NIGHTLIFE: 'purple',
}

const toTitleCaseLabel = (label: string): string =>
  label
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export const getCategoryAccent = (categoryLabel: string): CategoryAccent => {
  const trimmed = categoryLabel.trim()

  return CATEGORY_ACCENT_MAP[trimmed] ?? CATEGORY_ACCENT_MAP[toTitleCaseLabel(trimmed)] ?? 'blue'
}
