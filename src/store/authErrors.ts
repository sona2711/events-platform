import type { FirebaseError } from 'firebase/app'

export const AUTH_ERROR_MESSAGES = {
  emailAlreadyInUse: 'An account with this email already exists.',
  invalidCredential: 'Invalid email or password.',
  googleSignInFailed: 'Google sign-in failed. Please try again.',
  loginFailed: 'Sign in failed. Please try again.',
  registrationFailed: 'Registration failed. Please try again.',
  passwordResetFailed: 'Could not send reset email. Please try again.',
  logoutFailed: 'Logout failed. Please try again.',
  unexpected: 'Something went wrong. Please try again.',
} as const

const isFirebaseAuthError = (error: unknown): error is FirebaseError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as FirebaseError).code === 'string'
  )
}

export const getAuthErrorMessage = (error: unknown): string | null => {
  if (!isFirebaseAuthError(error)) {
    return error instanceof Error ? error.message : AUTH_ERROR_MESSAGES.unexpected
  }

  switch (error.code) {
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return null
    case 'auth/email-already-in-use':
      return AUTH_ERROR_MESSAGES.emailAlreadyInUse
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/invalid-login-credentials':
      return AUTH_ERROR_MESSAGES.invalidCredential
    case 'auth/popup-blocked':
      return AUTH_ERROR_MESSAGES.googleSignInFailed
    default:
      return AUTH_ERROR_MESSAGES.unexpected
  }
}

export const isEmailExistsAuthError = (message: string | null | undefined): boolean =>
  message === AUTH_ERROR_MESSAGES.emailAlreadyInUse

export const toAuthRejectValue = (error: unknown, fallback: string): string | null => {
  const message = getAuthErrorMessage(error)
  if (message === null) {
    return null
  }

  return message || fallback
}
