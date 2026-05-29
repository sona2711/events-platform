import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { CATEGORIES, LOCATIONS, MAX_PRICE, MIN_PRICE, PRICE_STEP } from './consts'
import type { EventFiltersSidebarProps, FilterState } from './types'
import styles from './styles.module.css'

const DEFAULT_FILTERS: FilterState = {
  date: '',
  priceMin: MIN_PRICE,
  priceMax: MAX_PRICE,
  categories: ['All'],
  location: '',
}

function formatPrice(value: number): string {
  if (value >= MAX_PRICE) return '100,000+ AMD'
  return `${value.toLocaleString()} AMD`
}

export function EventFiltersSidebar({
  onApply,
  initialFilters,
  className,
}: EventFiltersSidebarProps) {
  const id = useId()
  const trackRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)

  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  })
  const [locationQuery, setLocationQuery] = useState('')
  const [locationOpen, setLocationOpen] = useState(false)

  const updateSliderFill = useCallback((min: number, max: number) => {
    if (!trackRef.current) return
    trackRef.current.style.setProperty('--range-min', `${(min / MAX_PRICE) * 100}%`)
    trackRef.current.style.setProperty('--range-max', `${(max / MAX_PRICE) * 100}%`)
  }, [])

  useEffect(() => {
    updateSliderFill(filters.priceMin, filters.priceMax)
  }, [filters.priceMin, filters.priceMax, updateSliderFill])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePriceMinChange = (raw: number) => {
    const value = Math.min(raw, filters.priceMax - PRICE_STEP)
    setFilters((f) => ({ ...f, priceMin: value }))
  }

  const handlePriceMaxChange = (raw: number) => {
    const value = Math.max(raw, filters.priceMin + PRICE_STEP)
    setFilters((f) => ({ ...f, priceMax: value }))
  }

  const handleCategoryToggle = (category: string) => {
    if (category === 'All') {
      setFilters((f) => ({ ...f, categories: ['All'] }))
      return
    }
    setFilters((f) => {
      const without = f.categories.filter((c) => c !== 'All' && c !== category)
      const isActive = f.categories.includes(category)
      const next = isActive ? without : [...without, category]
      return { ...f, categories: next.length === 0 ? ['All'] : next }
    })
  }

  const handleLocationFocus = () => {
    setLocationQuery('')
    setLocationOpen(true)
  }

  const handleLocationSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationQuery(e.target.value)
    setLocationOpen(true)
  }

  const handleLocationSelect = (loc: string) => {
    setFilters((f) => ({ ...f, location: f.location === loc ? '' : loc }))
    setLocationQuery('')
    setLocationOpen(false)
  }

  const handleApply = () => {
    onApply(filters)
  }

  const handleReset = () => {
    const reset = { ...DEFAULT_FILTERS }
    setFilters(reset)
    setLocationQuery('')
    setLocationOpen(false)
    updateSliderFill(MIN_PRICE, MAX_PRICE)
  }

  const filteredLocations = LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(locationQuery.toLowerCase()),
  )

  const locationInputValue = locationOpen ? locationQuery : filters.location

  // When priceMin is pushed near the top of the range the min thumb should
  // sit above the max thumb so the user can drag it back down.
  const minThumbOnTop = filters.priceMin / MAX_PRICE > 0.9

  const sidebarClass = [styles.sidebar, className].filter(Boolean).join(' ')
  const dateId = `${id}-date`
  const locationId = `${id}-location`

  return (
    <aside className={sidebarClass} aria-label="Event filters">
      {/* ── Date ── */}
      <section className={styles.section}>
        <label htmlFor={dateId} className={styles.sectionTitle}>
          Select Date
        </label>
        <input
          id={dateId}
          type="date"
          className={styles.dateInput}
          value={filters.date}
          onChange={(e) => setFilters((f) => ({ ...f, date: e.target.value }))}
        />
      </section>

      {/* ── Price Range ── */}
      <section className={styles.section}>
        <p className={styles.sectionTitle}>Price Range (AMD)</p>
        <div className={styles.priceDisplay}>
          <span>{formatPrice(filters.priceMin)}</span>
          <span>{formatPrice(filters.priceMax)}</span>
        </div>
        <div className={styles.sliderWrapper} ref={trackRef}>
          <div className={styles.sliderTrack} aria-hidden="true" />
          <input
            type="range"
            className={
              minThumbOnTop
                ? `${styles.rangeInput} ${styles.rangeMin} ${styles.rangeMinTop}`
                : `${styles.rangeInput} ${styles.rangeMin}`
            }
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={PRICE_STEP}
            value={filters.priceMin}
            aria-label="Minimum price"
            onChange={(e) => handlePriceMinChange(Number(e.target.value))}
          />
          <input
            type="range"
            className={`${styles.rangeInput} ${styles.rangeMax}`}
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={PRICE_STEP}
            value={filters.priceMax}
            aria-label="Maximum price"
            onChange={(e) => handlePriceMaxChange(Number(e.target.value))}
          />
        </div>
        <div className={styles.priceLabels} aria-hidden="true">
          <span>0 AMD</span>
          <span>100,000 AMD</span>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className={styles.section}>
        <p className={styles.sectionTitle}>Categories</p>
        <div className={styles.categoryGrid} role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => {
            const isActive = filters.categories.includes(cat)
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={isActive}
                className={
                  isActive
                    ? `${styles.categoryPill} ${styles.categoryPillActive}`
                    : styles.categoryPill
                }
                onClick={() => handleCategoryToggle(cat)}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </section>

      {/* ── Location ── */}
      <section className={styles.section}>
        <label htmlFor={locationId} className={styles.sectionTitle}>
          Location
        </label>
        <div className={styles.locationDropdown} ref={locationRef}>
          <div
            className={
              locationOpen
                ? `${styles.locationInputWrapper} ${styles.locationInputWrapperOpen}`
                : styles.locationInputWrapper
            }
          >
            <input
              id={locationId}
              type="text"
              className={styles.locationInput}
              placeholder={locationOpen ? 'Search venues…' : 'All locations'}
              value={locationInputValue}
              onFocus={handleLocationFocus}
              onChange={handleLocationSearch}
              autoComplete="off"
              aria-haspopup="listbox"
              aria-expanded={locationOpen}
              aria-controls={`${id}-location-list`}
            />
            <span className={styles.locationChevron} aria-hidden="true">
              {locationOpen ? '▲' : '▼'}
            </span>
          </div>

          {locationOpen && (
            <ul
              id={`${id}-location-list`}
              className={styles.locationList}
              role="listbox"
              aria-label="Available venues"
            >
              {filteredLocations.map((loc) => {
                const isSelected = filters.location === loc
                return (
                  <li
                    key={loc}
                    role="option"
                    aria-selected={isSelected}
                    className={
                      isSelected
                        ? `${styles.locationItem} ${styles.locationItemActive}`
                        : styles.locationItem
                    }
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleLocationSelect(loc)}
                  >
                    {isSelected && <span className={styles.locationCheck} aria-hidden="true" />}
                    {loc}
                  </li>
                )
              })}
              {filteredLocations.length === 0 && (
                <li className={styles.locationNoResults} aria-live="polite">
                  No venues found
                </li>
              )}
            </ul>
          )}
        </div>
      </section>

      {/* ── Actions ── */}
      <div className={styles.actions}>
        <button type="button" className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
        <button type="button" className={styles.applyButton} onClick={handleApply}>
          Apply Filters
        </button>
      </div>
    </aside>
  )
}
