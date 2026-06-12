import type { ChangeEvent, FormEvent } from 'react'
import { useRef, useState } from 'react'
import { Button, Flex, Input, Tag, Typography } from 'antd'
import type { InputRef } from 'antd'
import { useTranslation } from 'react-i18next'
import { showNotification } from '@/providers/notifications/utils'
import { EMAIL_PATTERN } from './consts'
import buttonStyles from '@/components/_shared/TemplateButtons/styles.module.css'
import styles from './styles.module.css'
import { saveSubscriptionEmail } from './utils'

const { Title, Text, Paragraph } = Typography

export const SubscribeBanner = () => {
  const { t } = useTranslation('home')
  const emailInputRef = useRef<InputRef>(null)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextEmail = event.target.value
    setEmail(nextEmail)

    if (emailError && EMAIL_PATTERN.test(nextEmail.trim())) {
      setEmailError('')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setEmailError(t('subscribe.invalidEmailMessage'))
      showNotification({
        title: t('subscribe.invalidEmailTitle'),
        message: t('subscribe.invalidEmailMessage'),
        variant: 'error',
      })
      return
    }

    try {
      await saveSubscriptionEmail(normalizedEmail)

      setEmail('')
      setEmailError('')
      showNotification({
        title: t('subscribe.successTitle'),
        message: t('subscribe.successMessage'),
        variant: 'success',
      })
    } catch {
      showNotification({
        title: t('subscribe.saveErrorTitle'),
        message: t('subscribe.saveErrorMessage'),
        variant: 'error',
      })
    }
  }

  const benefits = t('subscribe.benefits', { returnObjects: true }) as string[]

  return (
    <section className={styles.section} aria-labelledby="subscribe-banner-title">
      <div className={styles.banner}>
        <div className={styles.content}>
          <Text className={styles.eyebrow}>{t('subscribe.eyebrow')}</Text>

          <Title className={styles.title} id="subscribe-banner-title" level={2}>
            {t('subscribe.titleStart')}
            <br />
            {t('subscribe.titleMiddle')}{' '}
            <span className={styles.accent}>{t('subscribe.titleAccent')}</span>
          </Title>

          <Paragraph className={styles.description}>{t('subscribe.description')}</Paragraph>

          <Flex className={styles.benefits} gap={8} wrap="wrap">
            {benefits.map((benefit) => (
              <Tag key={benefit} className={styles.benefitTag}>
                {benefit}
              </Tag>
            ))}
          </Flex>
        </div>

        <div className={styles.formPanel}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <Input
                ref={emailInputRef}
                value={email}
                className={emailError ? `${styles.input} ${styles.inputError}` : styles.input}
                type="email"
                name="email"
                placeholder={t('subscribe.emailPlaceholder')}
                aria-label={t('subscribe.emailAria')}
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? 'subscribe-email-error' : undefined}
                onChange={handleEmailChange}
                size="large"
              />
              {emailError ? (
                <Text className={styles.errorMessage} id="subscribe-email-error" type="danger">
                  {emailError}
                </Text>
              ) : null}
            </div>
            <Button
              className={`${buttonStyles.primaryButton} ${buttonStyles.largeButton} ${buttonStyles.fullWidthButton}`}
              htmlType="submit"
              size="large"
              type="primary"
            >
              {t('subscribe.buttonLabel')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
