import type { SelectOption } from './types'

export const CATEGORY_OPTIONS: SelectOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Music', value: 'music' },
  { label: 'Tech', value: 'tech' },
  { label: 'Arts', value: 'arts' },
  { label: 'Sports', value: 'sports' },
]

export const EVENT_OPTIONS: SelectOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Yerevan Jazz Fest', value: 'yerevan-jazz-fest' },
  { label: 'Armenia IT Forum', value: 'armenia-it-forum' },
  { label: 'Cascade Wine Days', value: 'cascade-wine-days' },
]

export const STATUS_OPTIONS: SelectOption[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Pending', value: 'pending' },
  { label: 'Cancelled', value: 'cancelled' },
]

export const SEARCH_PLACEHOLDER = 'Search by name or email...'

export const FILTER_BAR_DEFAULT_VALUES = {
  category: 'all',
  event: 'all',
  status: 'all',
  search: '',
} as const
