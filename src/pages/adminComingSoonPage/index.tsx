import { AdminLayout } from '@/components/layout/AdminLayout'
import styles from './styles.module.css'

export const AdminComingSoonPage = () => {
  return (
    <AdminLayout title="Coming Soon">
      <section className={styles.placeholderPanel}>
        <h2 className={styles.placeholderTitle}>Coming Soon</h2>
        <p className={styles.placeholderText}>This admin section is under development.</p>
      </section>
    </AdminLayout>
  )
}
