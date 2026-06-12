import { ThemeScope } from '@/components/_shared/ThemeScope'
import { AdminHeader } from '@/components/layout/AdminHeader'
import { AdminSidebar } from '@/components/layout/AdminSidebar'
import type { AdminLayoutProps } from './types'
import styles from './styles.module.css'

export const AdminLayout = ({ title, notificationCount, children }: AdminLayoutProps) => {
  return (
    <div className={styles.layout}>
      <AdminSidebar />

      <ThemeScope className={styles.content}>
        <AdminHeader title={title} notificationCount={notificationCount} />
        <main className={styles.main}>{children}</main>
      </ThemeScope>
    </div>
  )
}
