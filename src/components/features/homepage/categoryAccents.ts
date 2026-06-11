export type CategoryAccent = 'pink' | 'blue' | 'orange' | 'lime' | 'purple'

const CATEGORY_ACCENT_MAP: Record<string, CategoryAccent> = {
  Music: 'pink',
  Technology: 'blue',
  Tech: 'blue',
  Festival: 'orange',
  Adventure: 'lime',
  Art: 'purple',
  Classical: 'purple',
  Retreat: 'lime',
  Education: 'blue',
  'Food & Drink': 'orange',
}

export const getCategoryAccent = (categoryLabel: string): CategoryAccent =>
  CATEGORY_ACCENT_MAP[categoryLabel] ?? 'blue'
