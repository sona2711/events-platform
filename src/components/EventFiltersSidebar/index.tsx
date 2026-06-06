import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { CATEGORIES, LOCATIONS, MAX_PRICE, MIN_PRICE, PRICE_STEP } from './consts'
import type { EventFiltersSidebarProps } from './types'
import styles from './styles.module.css'

const formatPrice = (value: number): string => {
  if (value >= MAX_PRICE) return '100,000+ AMD'
  return `${value.toLocaleString()} AMD`
}

export const EventFiltersSidebar = ({
  filters,
  onFiltersChange,
  onApply,
  onReset,
  className,
}: EventFiltersSidebarProps) => {
  const id = useId()
  const trackRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const locationInputRef = useRef<HTMLInputElement>(null)

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
    onFiltersChange({ ...filters, priceMin: value })
  }

  const handlePriceMaxChange = (raw: number) => {
    const value = Math.max(raw, filters.priceMin + PRICE_STEP)
    onFiltersChange({ ...filters, priceMax: value })
  }

  const handleCategoryToggle = (category: string) => {
    if (category === 'All') {
      onFiltersChange({ ...filters, categories: ['All'] })
      return
    }

    const isActive = filters.categories.includes(category)
    onFiltersChange({
      ...filters,
      categories: isActive ? ['All'] : [category],
    })
  }

  const openLocationDropdown = useCallback(() => {
    setLocationQuery('')
    setLocationOpen(true)
    locationInputRef.current?.focus()
  }, [])

  const handleLocationFocus = () => {
    setLocationQuery('')
    setLocationOpen(true)
  }

  const handleLocationSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationQuery(e.target.value)
    setLocationOpen(true)
  }

  const handleLocationWrapperMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === locationInputRef.current) {
      return
    }

    e.preventDefault()
    openLocationDropdown()
  }

  const handleLocationToggle = () => {
    if (locationOpen) {
      setLocationOpen(false)
      locationInputRef.current?.blur()
      return
    }

    openLocationDropdown()
  }

  const handleLocationSelect = (loc: string) => {
    const nextLocation = loc === '' ? '' : filters.location === loc ? '' : loc
    const nextFilters = { ...filters, location: nextLocation }

    onFiltersChange(nextFilters)
    setLocationQuery('')
    setLocationOpen(false)
    onApply(nextFilters)
  }

  const handleReset = () => {
    setLocationQuery('')
    setLocationOpen(false)
    updateSliderFill(MIN_PRICE, MAX_PRICE)
    onReset()
  }

  const filteredLocations = LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(locationQuery.toLowerCase()),
  )

  const locationInputValue = locationOpen ? locationQuery : filters.location

  const minThumbOnTop = filters.priceMin / MAX_PRICE > 0.9

  const sidebarClass = [styles.sidebar, className].filter(Boolean).join(' ')
  const dateId = `${id}-date`
  const locationId = `${id}-location`

  return (
    <aside className={sidebarClass} aria-label="Event filters">
      <section className={styles.section}>
        <label htmlFor={dateId} className={styles.sectionTitle}>
          Select Date
        </label>
        <input
          id={dateId}
          type="date"
          className={styles.dateInput}
          value={filters.date}
          onChange={(e) => onFiltersChange({ ...filters, date: e.target.value })}
        />
      </section>

      <section className={styles.section}>
        <p className={styles.sectionTitle}>Price Range (AMD)</p>
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
        <div className={styles.priceLabels}>
          <span>{formatPrice(filters.priceMin)}</span>
          <span>{formatPrice(filters.priceMax)}</span>
        </div>
      </section>

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
            onMouseDown={handleLocationWrapperMouseDown}
          >
            <input
              ref={locationInputRef}
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
            <button
              type="button"
              className={styles.locationChevronButton}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={handleLocationToggle}
              aria-label={locationOpen ? 'Close location list' : 'Open location list'}
            >
              {locationOpen ? (
                <UpOutlined className={styles.locationChevronIcon} aria-hidden="true" />
              ) : (
                <DownOutlined className={styles.locationChevronIcon} aria-hidden="true" />
              )}
            </button>
          </div>

          {locationOpen && (
            <ul
              id={`${id}-location-list`}
              className={styles.locationList}
              role="listbox"
              aria-label="Available venues"
            >
              {!locationQuery && (
                <li
                  role="option"
                  aria-selected={filters.location === ''}
                  className={
                    filters.location === ''
                      ? `${styles.locationItem} ${styles.locationItemActive}`
                      : styles.locationItem
                  }
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleLocationSelect('')}
                >
                  {filters.location === '' && (
                    <span className={styles.locationCheck} aria-hidden="true" />
                  )}
                  All locations
                </li>
              )}
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

      <div className={styles.actions}>
        <Button
          htmlType="button"
          variant="outlined"
          color="primary"
          className={styles.resetButton}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          htmlType="button"
          variant="solid"
          color="primary"
          className={styles.applyButton}
          onClick={() => onApply()}
        >
          Apply Filters
        </Button>
      </div>
    </aside>
  )
}
