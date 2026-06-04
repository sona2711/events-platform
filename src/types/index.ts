export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

export interface AuthState {
  user: AuthUser | null
  loading: boolean
  initializing: boolean
  error: string | null
}

export interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

export interface SignUpFormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export interface PasswordRecoveryFormValues {
  email: string
}
