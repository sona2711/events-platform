import type { ChangeEvent, FormEvent } from 'react'
import { useRef, useState } from 'react'
import { showNotification } from '@/providers/notifications/utils'
import { EMAIL_PATTERN, SUBSCRIBE_COPY } from './consts'
import styles from './styles.module.css'
import { saveSubscriptionEmail } from './utils'

export function SubscribeBanner() {
  const emailInputRef = useRef<HTMLInputElement>(null)
  const [emailError, setEmailError] = useState('')

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (emailError && EMAIL_PATTERN.test(event.target.value.trim())) {
      setEmailError('')
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedEmail = emailInputRef.current?.value.trim().toLowerCase() ?? ''

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setEmailError(SUBSCRIBE_COPY.invalidEmailMessage)
      showNotification({
        title: SUBSCRIBE_COPY.invalidEmailTitle,
        message: SUBSCRIBE_COPY.invalidEmailMessage,
        variant: 'error',
      })
      return
    }

    try {
      await saveSubscriptionEmail(normalizedEmail)

      if (emailInputRef.current) {
        emailInputRef.current.value = ''
      }

      setEmailError('')
      showNotification({
        title: SUBSCRIBE_COPY.successTitle,
        message: SUBSCRIBE_COPY.successMessage,
        variant: 'success',
      })
    } catch {
      showNotification({
        title: SUBSCRIBE_COPY.saveErrorTitle,
        message: SUBSCRIBE_COPY.saveErrorMessage,
        variant: 'error',
      })
    }
  }

  return (
    <section className={styles.section} aria-labelledby="subscribe-banner-title">
      <div className={styles.banner}>
        <div className={styles.content}>
          <h2 className={styles.title} id="subscribe-banner-title">
            {SUBSCRIBE_COPY.titleStart}
            <br />
            {SUBSCRIBE_COPY.titleMiddle}{' '}
            <span className={styles.accent}>{SUBSCRIBE_COPY.titleAccent}</span>
          </h2>
          <p className={styles.description}>{SUBSCRIBE_COPY.description}</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <input
              ref={emailInputRef}
              className={emailError ? `${styles.input} ${styles.inputError}` : styles.input}
              type="email"
              name="email"
              placeholder={SUBSCRIBE_COPY.emailPlaceholder}
              aria-label="Email address"
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? 'subscribe-email-error' : undefined}
              onChange={handleEmailChange}
            />
            {emailError ? (
              <p className={styles.errorMessage} id="subscribe-email-error">
                {emailError}
              </p>
            ) : null}
          </div>
          <button className={styles.button} type="submit">
            {SUBSCRIBE_COPY.buttonLabel}
          </button>
        </form>
      </div>
    </section>
  )
}
