import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import { RegistrationStatsCards } from '@/components/features/RegistrationStatsCards'
import { RegistrationsFilterBar } from '@/components/features/RegistrationsFilterBar'
import type { RegistrationsFilterValues } from '@/components/features/RegistrationsFilterBar/types'
import { RegistrationsTable } from '@/components/features/RegistrationsTable'
import { REGISTRATIONS_DATA } from '@/components/features/RegistrationsTable/consts'
import type {
  RegistrationItem,
  RegistrationStatus,
} from '@/components/features/RegistrationsTable/types'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { applyFilters } from './utils'

const DEFAULT_DATE_RANGE: [dayjs.Dayjs, dayjs.Dayjs] = [dayjs('2026-10-01'), dayjs('2026-10-31')]

const INITIAL_FILTERS: RegistrationsFilterValues = {
  category: 'all',
  event: 'all',
  status: 'all',
  dateRange: DEFAULT_DATE_RANGE,
  search: '',
}

export const AdminPage = () => {
  const [data, setData] = useState<RegistrationItem[]>(REGISTRATIONS_DATA)
  const [filters, setFilters] = useState<RegistrationsFilterValues>(INITIAL_FILTERS)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const filteredData = useMemo(() => applyFilters(data, filters), [data, filters])

  const stats = useMemo(
    () => ({
      total: data.length,
      active: data.filter((r) => r.status === 'Active').length,
      cancelled: data.filter((r) => r.status === 'Cancelled').length,
      pending: data.filter((r) => r.status === 'Pending').length,
    }),
    [data],
  )

  const handleFiltersChange = (patch: Partial<RegistrationsFilterValues>) => {
    setFilters((prev) => ({ ...prev, ...patch }))
  }

  const handleFiltersReset = () => {
    setFilters(INITIAL_FILTERS)
  }

  const handleUpdateItem = (updated: RegistrationItem) => {
    setData((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
  }

  const handleCancelItem = (id: string) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'Cancelled' as RegistrationStatus } : item,
      ),
    )
  }

  const handleCancelSelected = () => {
    setData((prev) =>
      prev.map((item) =>
        selectedIds.has(item.id) ? { ...item, status: 'Cancelled' as RegistrationStatus } : item,
      ),
    )
    setSelectedIds(new Set())
    toast.success('Selected registrations cancelled')
  }

  return (
    <AdminLayout title="Registrations" notificationCount={3}>
      <RegistrationStatsCards
        total={stats.total}
        active={stats.active}
        cancelled={stats.cancelled}
        pending={stats.pending}
      />
      <RegistrationsFilterBar
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleFiltersReset}
      />
      <RegistrationsTable
        data={filteredData}
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
        onCancelSelected={handleCancelSelected}
        onUpdateItem={handleUpdateItem}
        onCancelItem={handleCancelItem}
      />
    </AdminLayout>
  )
}
