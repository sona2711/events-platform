import { DownloadOutlined, EditOutlined, StopOutlined } from '@ant-design/icons'
import { REGISTRATIONS_DATA, STATUS_CLASS_BY_VALUE } from './consts'
import styles from './styles.module.css'

export const RegistrationsTable = () => {
  return (
    <section className={styles.tableSection} aria-label="Registrations table">
      <div className={styles.tableHeader}>
        <h2 className={styles.tableTitle}>
          Total Registrations <span className={styles.tableTitleCount}>(248)</span>
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
                  id="select-all-registrations"
                  className={styles.rowCheckbox}
                  type="checkbox"
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
            {REGISTRATIONS_DATA.map((registration, index) => {
              const isLast = index === REGISTRATIONS_DATA.length - 1
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
    </section>
  )
}
