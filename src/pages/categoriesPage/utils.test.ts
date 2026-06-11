import {
  filterCategoryEvents,
  getCategoryEventCounts,
  getCategoryLabelFromSearchParam,
  withTabCategoryFilter,
} from './utils'
import { DEFAULT_FILTERS } from './consts'
import type { CategoryEvent } from './types'

const events: CategoryEvent[] = [
  {
    id: 'opera-event',
    imageUrl: 'test.jpg',
    categoryLabel: 'MUSIC',
    title: 'Classical Night',
    location: 'Opera House',
    date: 'Oct 12, 2026',
    priceLabel: '2,000 AMD',
    category: 'Music',
    priceAmd: 2_000,
    dateIso: '2026-10-12',
  },
  {
    id: 'cascade-event',
    imageUrl: 'test.jpg',
    categoryLabel: 'ART',
    title: 'Art Walk',
    location: 'Cascade Complex',
    date: 'Nov 01, 2026',
    priceLabel: '1,500 AMD',
    category: 'Arts',
    priceAmd: 1_500,
    dateIso: '2026-11-01',
  },
]

describe('withTabCategoryFilter', () => {
  it('applies tab category without mutating the sidebar filter object', () => {
    const sidebarFilters = { ...DEFAULT_FILTERS, categories: ['Arts'] }

    const effectiveFilters = withTabCategoryFilter(sidebarFilters, 'Music')

    expect(sidebarFilters.categories).toEqual(['Arts'])
    expect(effectiveFilters.categories).toEqual(['Music'])
  })
})

describe('filterCategoryEvents', () => {
  it('filters events by location', () => {
    const filtered = filterCategoryEvents(events, {
      ...DEFAULT_FILTERS,
      location: 'Opera House',
    })

    expect(filtered).toHaveLength(1)
    expect(filtered[0]?.location).toBe('Opera House')
  })
})

describe('getCategoryEventCounts', () => {
  it('returns counts grouped by category label', () => {
    expect(getCategoryEventCounts(events)).toEqual({
      Music: 1,
      Arts: 1,
    })
  })
})

describe('getCategoryLabelFromSearchParam', () => {
  it('maps valid tab ids to category labels', () => {
    expect(getCategoryLabelFromSearchParam('music')).toBe('Music')
    expect(getCategoryLabelFromSearchParam('food-drink')).toBe('Food & Drink')
  })

  it('returns null for missing or invalid params', () => {
    expect(getCategoryLabelFromSearchParam(null)).toBeNull()
    expect(getCategoryLabelFromSearchParam('invalid')).toBeNull()
  })
})
