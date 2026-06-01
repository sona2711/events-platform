import { useEffect, useRef, useState } from 'react'
import { Button, Pagination } from 'antd'
import { DownloadOutlined, EditOutlined, StopOutlined } from '@ant-design/icons'
import { REGISTRATIONS_DATA, STATUS_CLASS_BY_VALUE, TOTAL_COUNT, PAGE_SIZE } from './consts'
import styles from './styles.module.css'

export const RegistrationsTable = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const selectAllRef = useRef<HTMLInputElement>(null)

  const allIds = REGISTRATIONS_DATA.map((r) => r.id)
  const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.has(id))
  const someSelected = allIds.some((id) => selectedIds.has(id)) && !allSelected
  const hasSelection = selectedIds.size > 0

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected
    }
  }, [someSelected])

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIds(e.target.checked ? new Set(allIds) : new Set())
  }

  const handleSelectRow = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = new Set(selectedIds)
    if (e.target.checked) {
      next.add(id)
    } else {
      next.delete(id)
    }
    setSelectedIds(next)
  }

  const pageStart = (currentPage - 1) * PAGE_SIZE + 1
  const pageEnd = Math.min(currentPage * PAGE_SIZE, TOTAL_COUNT)
  const pageData = REGISTRATIONS_DATA.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  return (
    <section className={styles.tableSection} aria-label="Registrations table">
      <div className={styles.tableHeader}>
        <h2 className={styles.tableTitle}>
          Total Registrations <span className={styles.tableTitleCount}>({TOTAL_COUNT})</span>
        </h2>
        <button className={styles.exportButton} type="button">
          <DownloadOutlined className={styles.exportIcon} aria-hidden="true" />
          Export to CSV
        </button>
      </div>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <colgroup>
            <col className={styles.colCheckbox} />
            <col className={styles.colUser} />
            <col className={styles.colCategory} />
            <col className={styles.colEvent} />
            <col className={styles.colDate} />
            <col className={styles.colStatus} />
            <col className={styles.colActions} />
          </colgroup>
          <thead>
            <tr>
              <th className={`${styles.tableHeadCell} ${styles.checkboxCell}`}>
                <label className={styles.srOnly} htmlFor="select-all-registrations">
                  Select all registrations
                </label>
                <input
                  ref={selectAllRef}
                  id="select-all-registrations"
                  className={styles.rowCheckbox}
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  aria-label="Select all registrations"
                />
              </th>
              <th className={styles.tableHeadCell}>User</th>
              <th className={styles.tableHeadCell}>Category</th>
              <th className={styles.tableHeadCell}>Event Name</th>
              <th className={styles.tableHeadCell}>Date</th>
              <th className={styles.tableHeadCell}>Status</th>
              <th className={styles.tableHeadCell}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {pageData.map((registration, index) => {
              const isLast = index === pageData.length - 1
              const cellClassName = isLast
                ? `${styles.tableBodyCell} ${styles.lastRowCell}`
                : styles.tableBodyCell

              return (
                <tr key={registration.id}>
                  <td className={`${cellClassName} ${styles.checkboxCell}`}>
                    <label className={styles.srOnly} htmlFor={`registration-${registration.id}`}>
                      Select {registration.fullName}
                    </label>
                    <input
                      id={`registration-${registration.id}`}
                      className={styles.rowCheckbox}
                      type="checkbox"
                      checked={selectedIds.has(registration.id)}
                      onChange={handleSelectRow(registration.id)}
                    />
                  </td>

                  <td className={cellClassName}>
                    <div className={styles.userInfo}>
                      <span className={styles.avatar}>{registration.initials}</span>
                      <div className={styles.userText}>
                        <span className={styles.userName}>{registration.fullName}</span>
                        <span className={styles.userEmail}>{registration.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className={cellClassName}>
                    <span className={styles.categoryBadge}>{registration.category}</span>
                  </td>

                  <td className={cellClassName}>
                    <span className={styles.eventName}>{registration.eventName}</span>
                  </td>

                  <td className={cellClassName}>
                    <span className={styles.dateText}>
                      <span>{registration.dayMonth}</span>
                      <span>{registration.year}</span>
                    </span>
                  </td>

                  <td className={cellClassName}>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[STATUS_CLASS_BY_VALUE[registration.status]]
                      }`}
                    >
                      <span className={styles.statusDot} />
                      {registration.status}
                    </span>
                  </td>

                  <td className={cellClassName}>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionButton}
                        type="button"
                        aria-label="Edit registration"
                      >
                        <EditOutlined />
                      </button>
                      <button
                        className={`${styles.actionButton} ${styles.actionButtonDanger} ${
                          registration.status === 'Cancelled' ? styles.actionButtonCancelled : ''
                        }`}
                        type="button"
                        aria-label="Cancel registration"
                      >
                        <StopOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.tableFooter}>
        <div className={styles.footerLeft}>
          <Button className={styles.cancelButton} shape="round" danger disabled={!hasSelection}>
            Cancel Selected
          </Button>
        </div>
        <div className={styles.footerRight}>
          <span className={styles.showingText}>
            Showing {pageStart}–{pageEnd} of {TOTAL_COUNT}
          </span>
          <Pagination
            current={currentPage}
            total={TOTAL_COUNT}
            pageSize={PAGE_SIZE}
            onChange={setCurrentPage}
            showSizeChanger={false}
          />
        </div>
      </div>
    </section>
  )
}
