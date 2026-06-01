import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input, Select } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import {
  CATEGORY_OPTIONS,
  EVENT_OPTIONS,
  FILTER_BAR_DEFAULT_VALUES,
  SEARCH_PLACEHOLDER,
  STATUS_OPTIONS,
} from './consts'
import styles from './styles.module.css'
import type { RegistrationsFilterValues } from './types'

const { RangePicker } = DatePicker

const DEFAULT_DATE_RANGE: [dayjs.Dayjs, dayjs.Dayjs] = [dayjs('2026-10-01'), dayjs('2026-10-31')]

export const RegistrationsFilterBar = () => {
  const [filters, setFilters] = useState<RegistrationsFilterValues>({
    ...FILTER_BAR_DEFAULT_VALUES,
    dateRange: DEFAULT_DATE_RANGE,
  })

  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({ ...prev, category: value }))
  }

  const handleEventChange = (value: string) => {
    setFilters((prev) => ({ ...prev, event: value }))
  }

  const handleStatusChange = (value: string) => {
    setFilters((prev) => ({ ...prev, status: value }))
  }

  const handleDateRangeChange = (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setFilters((prev) => ({ ...prev, dateRange: [dates[0]!, dates[1]!] }))
    } else {
      setFilters((prev) => ({ ...prev, dateRange: null }))
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }))
  }

  const handleReset = () => {
    setFilters({
      ...FILTER_BAR_DEFAULT_VALUES,
      dateRange: DEFAULT_DATE_RANGE,
    })
  }

  return (
    <section className={styles.filterBar} aria-label="Registrations filters">
      <div className={styles.filtersGroup}>
        <Select
          className={styles.filterSelect}
          value={filters.category}
          onChange={handleCategoryChange}
          options={CATEGORY_OPTIONS}
          labelRender={({ label }) => `Category: ${label}`}
          aria-label="Filter by category"
        />

        <Select
          className={styles.filterSelect}
          value={filters.event}
          onChange={handleEventChange}
          options={EVENT_OPTIONS}
          labelRender={({ label }) => `Event: ${label}`}
          aria-label="Filter by event"
        />

        <Select
          className={styles.filterSelect}
          value={filters.status}
          onChange={handleStatusChange}
          options={STATUS_OPTIONS}
          labelRender={({ label }) => `Status: ${label}`}
          aria-label="Filter by status"
        />

        <RangePicker
          className={styles.dateRangePicker}
          value={filters.dateRange}
          onChange={handleDateRangeChange}
          format="MMM DD, YYYY"
          separator="-"
          aria-label="Filter by date range"
        />
      </div>

      <Button
        className={styles.resetButton}
        onClick={handleReset}
        type="default"
        aria-label="Reset all filters"
      >
        Reset
      </Button>

      <Input
        className={styles.searchInput}
        value={filters.search}
        onChange={handleSearchChange}
        prefix={<SearchOutlined />}
        placeholder={SEARCH_PLACEHOLDER}
        aria-label="Search registrations by name or email"
      />
    </section>
  )
}
