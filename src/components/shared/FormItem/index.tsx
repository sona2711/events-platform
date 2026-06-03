import { Form } from 'antd'
import type { FormItemProps } from 'antd'
import styles from './styles.module.css'

export function FormItem({ className, ...props }: FormItemProps) {
  const mergedClassName = className ? `${styles.formItem} ${className}` : styles.formItem

  return <Form.Item className={mergedClassName} {...props} />
}
