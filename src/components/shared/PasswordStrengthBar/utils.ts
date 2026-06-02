export type StrengthLevel = 'weak' | 'fair' | 'good' | 'strong'

export interface PasswordStrength {
  level: StrengthLevel
  label: string
  score: number
}

export function getStrength(password: string): PasswordStrength {
  if (!password) return { level: 'weak', label: '', score: 0 }

  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { level: 'weak', label: 'Weak security strength', score: 1 }
  if (score === 2) return { level: 'fair', label: 'Fair security strength', score: 2 }
  if (score === 3) return { level: 'good', label: 'Good security strength', score: 3 }
  return { level: 'strong', label: 'Strong security strength', score: 4 }
}
