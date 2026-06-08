import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { hideNotification, showNotification } from '@/providers/notifications/utils'
import { MailOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { AuthCard } from '@/components/shared/AuthCard'
import { AuthDivider } from '@/components/shared/AuthDivider'
import { FormItem } from '@/components/shared/FormItem'
import { GoogleAuthButton } from '@/components/shared/GoogleAuthButton'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearError, loginWithEmail, loginWithGoogle } from '@/store/authSlice'
import type { LoginFormValues } from '@/types'
import { LOGIN_NOTIFICATION_COPY } from './consts'
import styles from './styles.module.css'

const { Title, Text } = Typography

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!auth.error) return

    showNotification({
      title: LOGIN_NOTIFICATION_COPY.errorTitle,
      message: auth.error,
      variant: 'error',
    })
  }, [auth.error])

  useEffect(() => {
    return () => {
      dispatch(clearError())
      hideNotification()
    }
  }, [dispatch])

  const handleLogin = async (values: LoginFormValues) => {
    await dispatch(loginWithEmail({ email: values.email, password: values.password }))
  }

  const handleGoogleLogin = async () => {
    await dispatch(loginWithGoogle())
  }

  return (
    <div className={styles.page}>
      <AuthCard>
        <Title level={3} className={styles.brand}>
          Yerevan Pulsar
        </Title>
        <Title level={4} className={styles.title}>
          Welcome back
        </Title>
        <Text className={styles.subtitle}>Sign in to your account</Text>

        <GoogleAuthButton loading={auth.loading} onClick={handleGoogleLogin} />

        <AuthDivider />

        <Form layout="vertical" onFinish={handleLogin} requiredMark={false}>
          <FormItem
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input size="large" placeholder="alex@example.com" suffix={<MailOutlined />} />
          </FormItem>

          <FormItem
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </FormItem>

          <div className={styles.row}>
            <FormItem name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </FormItem>
            <Link to="/password-recovery" className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>

          <FormItem className={styles.submitItem}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block={true}
              loading={auth.loading}
              className={styles.submitButton}
            >
              Sign in
            </Button>
          </FormItem>
        </Form>

        <Text className={styles.footer}>
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" className={styles.link}>
            Sign up
          </Link>
        </Text>
      </AuthCard>
    </div>
  )
}
