import { SearchOutlined } from '@ant-design/icons'
import { Button, DatePicker, Input, Select } from 'antd'
import type { Dayjs } from 'dayjs'
import { CATEGORY_OPTIONS, EVENT_OPTIONS, SEARCH_PLACEHOLDER, STATUS_OPTIONS } from './consts'
import styles from './styles.module.css'
import type { RegistrationsFilterBarProps } from './types'

const { RangePicker } = DatePicker

export const RegistrationsFilterBar = ({
  filters,
  onFiltersChange,
  onReset,
}: RegistrationsFilterBarProps) => {
  const handleDateRangeChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      onFiltersChange({ dateRange: [dates[0], dates[1]] })
    } else {
      onFiltersChange({ dateRange: null })
    }
  }

  return (
    <section className={styles.filterBar} aria-label="Registrations filters">
      <div className={styles.filtersGroup}>
        <Select
          className={styles.filterSelect}
          value={filters.category}
          onChange={(value) => onFiltersChange({ category: value })}
          options={CATEGORY_OPTIONS}
          labelRender={({ label }) => `Category: ${label}`}
          aria-label="Filter by category"
        />

        <Select
          className={styles.filterSelect}
          value={filters.event}
          onChange={(value) => onFiltersChange({ event: value })}
          options={EVENT_OPTIONS}
          labelRender={({ label }) => `Event: ${label}`}
          aria-label="Filter by event"
        />

        <Select
          className={styles.filterSelect}
          value={filters.status}
          onChange={(value) => onFiltersChange({ status: value })}
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
        onClick={onReset}
        type="default"
        aria-label="Reset all filters"
      >
        Reset
      </Button>

      <Input
        className={styles.searchInput}
        value={filters.search}
        onChange={(e) => onFiltersChange({ search: e.target.value })}
        prefix={<SearchOutlined />}
        placeholder={SEARCH_PLACEHOLDER}
        aria-label="Search registrations by name or email"
      />
    </section>
  )
}
