import { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Modal, Pagination, Select } from 'antd'
import { DownloadOutlined, EditOutlined, StopOutlined } from '@ant-design/icons'
import buttonStyles from '@/components/_shared/TemplateButtons/styles.module.css'
import { PAGE_SIZE, STATUS_CLASS_BY_VALUE } from './consts'
import { buildInitials, exportToCsv } from './utils'
import styles from './styles.module.css'
import type { EditFormValues, RegistrationItem, RegistrationsTableProps } from './types'

const CATEGORY_OPTIONS = [
  { label: 'Music', value: 'MUSIC' },
  { label: 'Tech', value: 'TECH' },
  { label: 'Arts', value: 'ARTS' },
]

const STATUS_OPTIONS = [
  { label: 'Active', value: 'Active' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Cancelled', value: 'Cancelled' },
]

export const RegistrationsTable = ({
  data,
  selectedIds,
  onSelectedIdsChange,
  onCancelSelected,
  onUpdateItem,
  onCancelItem,
}: RegistrationsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [editingItem, setEditingItem] = useState<RegistrationItem | null>(null)
  const selectAllRef = useRef<HTMLInputElement>(null)
  const [form] = Form.useForm<EditFormValues>()

  const totalCount = data.length
  const pageData = data.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const pageStart = totalCount === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const pageEnd = Math.min(currentPage * PAGE_SIZE, totalCount)

  const allPageIds = pageData.map((r) => r.id)
  const allPageSelected = allPageIds.length > 0 && allPageIds.every((id) => selectedIds.has(id))
  const somePageSelected = allPageIds.some((id) => selectedIds.has(id)) && !allPageSelected
  const hasSelection = selectedIds.size > 0

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = somePageSelected
    }
  }, [somePageSelected])

  // Reset to page 1 when data changes (e.g. after filtering)
  useEffect(() => {
    setCurrentPage(1)
  }, [data])

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = new Set(selectedIds)
    if (e.target.checked) {
      allPageIds.forEach((id) => next.add(id))
    } else {
      allPageIds.forEach((id) => next.delete(id))
    }
    onSelectedIdsChange(next)
  }

  const handleSelectRow = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = new Set(selectedIds)
    if (e.target.checked) {
      next.add(id)
    } else {
      next.delete(id)
    }
    onSelectedIdsChange(next)
  }

  const handleExportCsv = () => {
    exportToCsv(data, 'registrations.csv')
  }

  const handleEditOpen = (item: RegistrationItem) => {
    setEditingItem(item)
    form.setFieldsValue({
      fullName: item.fullName,
      email: item.email,
      category: item.category,
      status: item.status,
    })
  }

  const handleEditSave = () => {
    form.validateFields().then((values) => {
      if (editingItem) {
        onUpdateItem({
          ...editingItem,
          ...values,
          initials: buildInitials(values.fullName),
        })
        setEditingItem(null)
      }
    })
  }

  const handleEditModalClose = () => {
    setEditingItem(null)
    form.resetFields()
  }

  const handleCancelItemClick = (item: RegistrationItem) => {
    Modal.confirm({
      title: 'Cancel Registration',
      content: 'Are you sure you want to cancel this registration?',
      okText: 'Yes, Cancel',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onCancelItem(item.id)
      },
    })
  }

  return (
    <>
      <section className={styles.tableSection} aria-label="Registrations table">
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>
            Total Registrations <span className={styles.tableTitleCount}>({totalCount})</span>
          </h2>
          <Button
            className={`${buttonStyles.secondaryButton} ${buttonStyles.compactButton} ${styles.exportButton}`}
            type="default"
            onClick={handleExportCsv}
            icon={<DownloadOutlined className={styles.exportIcon} aria-hidden="true" />}
          >
            Export to CSV
          </Button>
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
                    Select all registrations on this page
                  </label>
                  <input
                    ref={selectAllRef}
                    id="select-all-registrations"
                    className={styles.rowCheckbox}
                    type="checkbox"
                    checked={allPageSelected}
                    onChange={handleSelectAll}
                    aria-label="Select all registrations on this page"
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
                          aria-label={`Edit registration for ${registration.fullName}`}
                          onClick={() => handleEditOpen(registration)}
                        >
                          <EditOutlined />
                        </button>
                        <button
                          className={`${styles.actionButton} ${styles.actionButtonDanger} ${
                            registration.status === 'Cancelled' ? styles.actionButtonCancelled : ''
                          }`}
                          type="button"
                          aria-label={`Cancel registration for ${registration.fullName}`}
                          disabled={registration.status === 'Cancelled'}
                          onClick={() => handleCancelItemClick(registration)}
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
            <Button
              className={styles.cancelButton}
              shape="round"
              danger
              disabled={!hasSelection}
              onClick={onCancelSelected}
            >
              Cancel Selected
            </Button>
          </div>
          <div className={styles.footerRight}>
            <span className={styles.showingText}>
              Showing {pageStart}–{pageEnd} of {totalCount}
            </span>
            <Pagination
              current={currentPage}
              total={totalCount}
              pageSize={PAGE_SIZE}
              onChange={setCurrentPage}
              showSizeChanger={false}
            />
          </div>
        </div>
      </section>

      <Modal
        title="Edit Registration"
        open={editingItem !== null}
        onOk={handleEditSave}
        onCancel={handleEditModalClose}
        okText="Save Changes"
        cancelText="Cancel"
        destroyOnHidden
      >
        <Form form={form} layout="vertical" name="edit-registration">
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: 'Full name is required' }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Enter a valid email address' },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Category is required' }]}
          >
            <Select options={CATEGORY_OPTIONS} placeholder="Select category" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Status is required' }]}
          >
            <Select options={STATUS_OPTIONS} placeholder="Select status" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
