import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd'
import { AuthCard } from '@/components/shared/AuthCard'
import { AuthDivider } from '@/components/shared/AuthDivider'
import { FormItem } from '@/components/shared/FormItem'
import { GoogleAuthButton } from '@/components/shared/GoogleAuthButton'
import { PasswordStrengthBar } from '@/components/shared/PasswordStrengthBar'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { clearError, loginWithGoogle, registerWithEmail } from '@/store/authSlice'
import type { SignUpFormValues } from '@/types'
import styles from './styles.module.css'

const { Title, Text } = Typography

export default function SignUpPage() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)
  const [password, setPassword] = useState('')

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])

  const handleRegister = async (values: SignUpFormValues) => {
    await dispatch(registerWithEmail({ email: values.email, password: values.password }))
  }

  const handleGoogleSignUp = async () => {
    await dispatch(loginWithGoogle())
  }

  return (
    <div className={styles.page}>
      <AuthCard>
        <Text className={styles.step}>STEP 1 OF 3</Text>
        <Title level={4} className={styles.title}>
          Create your account
        </Title>

        <GoogleAuthButton loading={auth.loading} onClick={handleGoogleSignUp} />

        <AuthDivider />

        {auth.error && (
          <Alert message={auth.error} type="error" showIcon closable className={styles.alert} />
        )}

        <Form layout="vertical" onFinish={handleRegister} requiredMark={false}>
          <Row gutter={12}>
            <Col span={12}>
              <FormItem
                label="First name"
                name="firstName"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input size="large" placeholder="John" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="Last name"
                name="lastName"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input size="large" placeholder="Doe" />
              </FormItem>
            </Col>
          </Row>

          <FormItem
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input size="large" placeholder="name@company.com" />
          </FormItem>

          <FormItem
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter a password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Min 8 characters"
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormItem>

          <PasswordStrengthBar password={password} />

          <FormItem
            label="Confirm password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match'))
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Repeat password" />
          </FormItem>

          <FormItem
            name="agreeToTerms"
            valuePropName="checked"
            rules={[
              {
                validator(_, value) {
                  if (value) return Promise.resolve()
                  return Promise.reject(new Error('You must agree to the terms'))
                },
              },
            ]}
          >
            <Checkbox>
              I agree to the{' '}
              <a href="#" className={styles.link}>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className={styles.link}>
                Privacy Policy
              </a>
            </Checkbox>
          </FormItem>

          <FormItem className={styles.submitItem}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block={true}
              loading={auth.loading}
              className={styles.submitButton}
            >
              Create account
            </Button>
          </FormItem>
        </Form>

        <Text type="secondary" className={styles.footer}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>
            Sign in
          </Link>
        </Text>
      </AuthCard>
    </div>
  )
}
