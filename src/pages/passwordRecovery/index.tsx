import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Form, Input, Typography } from 'antd'
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { AuthCard } from '@/components/shared/AuthCard'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearError, sendPasswordReset } from '@/store/authSlice'
import type { PasswordRecoveryFormValues } from '@/types'
import styles from './styles.module.css'

const { Title, Text } = Typography

export function PasswordRecoveryPage() {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.auth)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    return () => {
      dispatch(clearError())
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
        <Text type="secondary" className={styles.subtitle}>
          Enter your email and we&apos;ll send a reset link to your inbox.
        </Text>

        {error && <Alert message={error} type="error" showIcon closable className={styles.alert} />}

        {emailSent && (
          <Alert
            message="Email sent!"
            description="Check your inbox for further instructions."
            type="success"
            showIcon
            className={styles.alert}
          />
        )}

        <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input size="large" placeholder="you@example.com" />
          </Form.Item>

          <Form.Item className={styles.submitItem}>
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
          </Form.Item>
        </Form>

        <Link to="/login" className={styles.backLink}>
          <ArrowLeftOutlined />
          Back to login
        </Link>
      </AuthCard>
    </div>
  )
}
