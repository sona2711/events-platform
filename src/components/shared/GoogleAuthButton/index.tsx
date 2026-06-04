import { Button } from 'antd'
import styles from './styles.module.css'

interface GoogleAuthButtonProps {
  loading?: boolean
  onClick: () => void
}

export function GoogleAuthButton({ loading = false, onClick }: GoogleAuthButtonProps) {
  return (
    <Button
      block
      size="large"
      loading={loading}
      onClick={onClick}
      className={styles.button}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className={styles.googleIcon}
          aria-hidden="true"
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.14 0 5.95 1.08 8.17 2.86l6.1-6.1C34.46 3.19 29.52 1 24 1 14.82 1 7.07 6.48 3.65 14.22l7.1 5.52C12.46 13.48 17.77 9.5 24 9.5z"
          />
          <path
            fill="#4285F4"
            d="M46.5 24.5c0-1.57-.14-3.09-.4-4.55H24v8.6h12.7c-.55 2.95-2.2 5.45-4.68 7.13l7.18 5.58C43.46 37.3 46.5 31.36 46.5 24.5z"
          />
          <path
            fill="#FBBC05"
            d="M10.75 28.26A14.6 14.6 0 0 1 9.5 24c0-1.48.25-2.91.69-4.26l-7.1-5.52A23.93 23.93 0 0 0 0 24c0 3.87.93 7.53 2.56 10.76l8.19-6.5z"
          />
          <path
            fill="#34A853"
            d="M24 47c5.52 0 10.16-1.83 13.54-4.97l-7.18-5.58C28.6 37.77 26.42 38.5 24 38.5c-6.2 0-11.49-3.96-13.25-9.24l-8.19 6.5C6.09 42.56 14.45 47 24 47z"
          />
        </svg>
      }
    >
      Continue with Google
    </Button>
  )
}
