import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Input, Typography } from 'antd'
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { hideNotification, showNotification } from '@/providers/notifications/utils'
import { AuthCard } from '@/components/shared/AuthCard'
import { FormItem } from '@/components/shared/FormItem'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearError, sendPasswordReset } from '@/store/authSlice'
import type { PasswordRecoveryFormValues } from '@/types'
import { PASSWORD_RECOVERY_NOTIFICATION_COPY } from './consts'
import styles from './styles.module.css'

const { Title, Text } = Typography

export function PasswordRecoveryPage() {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.auth)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    if (!error) return

    showNotification({
      title: PASSWORD_RECOVERY_NOTIFICATION_COPY.errorTitle,
      message: error,
      variant: 'error',
    })
  }, [error])

  useEffect(() => {
    if (!emailSent) return

    showNotification({
      title: PASSWORD_RECOVERY_NOTIFICATION_COPY.successTitle,
      message: PASSWORD_RECOVERY_NOTIFICATION_COPY.successMessage,
      variant: 'success',
    })
  }, [emailSent])

  useEffect(() => {
    return () => {
      dispatch(clearError())
      hideNotification()
    }
  }, [dispatch])

  const handleSubmit = async (values: PasswordRecoveryFormValues) => {
    const result = await dispatch(sendPasswordReset(values.email))
    if (sendPasswordReset.fulfilled.match(result)) {
      setEmailSent(true)
    }
  }

  return (
    <div className={styles.page}>
      <AuthCard>
        <div className={styles.iconWrapper}>
          <ReloadOutlined className={styles.icon} />
        </div>

        <Title level={4} className={styles.title}>
          Forgot your password?
        </Title>
        <Text className={styles.subtitle}>
          Enter your email and we&apos;ll send a reset link to your inbox.
        </Text>

        <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          <FormItem
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input size="large" placeholder="you@example.com" />
          </FormItem>

          <FormItem className={styles.submitItem}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              disabled={emailSent}
              className={styles.submitButton}
            >
              Send reset link
            </Button>
          </FormItem>
        </Form>

        <Link to="/login" className={styles.backLink}>
          <ArrowLeftOutlined />
          Back to login
        </Link>
      </AuthCard>
    </div>
  )
}
